// src/stores/userStore.ts
// -----------------------------------------------------------------------------
// Production build – no backend; reads everything from FortuneNXTDiamond
// -----------------------------------------------------------------------------
import { create } from "zustand";
import { ethers } from "ethers";
import { CONTRACT_CONFIG, SLOT_CONFIG } from "@/constants";
import diamondAbi from "@/abi/FortuneNXTDiamond.json";

import type { UserState, Slot, MatrixNode } from "@/types";

/* ---------- MetaMask provider (lazy) ---------- */
const provider =
  typeof window !== "undefined" && (window as any).ethereum
    ? new ethers.BrowserProvider((window as any).ethereum)
    : undefined;

/* ---------- blank helpers ---------- */
const emptyEarnings = {
  matrix: "0",
  level: "0",
  pool: "0",
  total: "0",
  withdrawn: "0",
  available: "0",
};

/* ---------- Zustand store interface ---------- */
interface UserStore extends UserState {
  loadUser: (address: string) => Promise<void>;
  buySlot: (slot: number, signer: ethers.Signer) => Promise<void>;
  loadMatrix: (address: string) => Promise<void>;
  loadPoolIncome: () => Promise<void>;
  clearError: () => void;

  /* local caches */
  allSlots: Slot[];
  matrixNodes: MatrixNode[];
  calculateFNXT: (usd: number) => string;
}

/* ---------- Store implementation ---------- */
export const useUserStore = create<UserStore>((set, get) => ({
  /* -------- state -------- */
  userProfile: null,
  slots: [],
  earnings: emptyEarnings,
  referrals: {
    direct: 0,
    indirect: 0,
    total: 0,
    activeReferrals: 0,
  },
  transactions: [],      // until backend arrives
  matrixNodes: [],
  matrix: [],            // <- ADD BACK so it satisfies the type
  poolIncome: [],

  isLoading: false,
  error: null,

  /* -------- master slot template -------- */
  allSlots: SLOT_CONFIG.prices.map((core, i) => ({
    id: i + 1,
    price: core.toString(),          // string CORE
    priceCore: parseFloat(core),     // number CORE
    earnings: "0",
    purchased: false,
    isActive: false,
    rebirth: { count: 0 },
  })),

  /* -------- helpers -------- */
  clearError: () => set({ error: null }),
  calculateFNXT: (usd) => (usd / 0.1).toFixed(2), // 10 ¢ rule

  /* ------------------------------------------------------------------
     loadUser – pulls profile & slot prices in one go
  ------------------------------------------------------------------ */
  loadUser: async (addr) => {
    if (!provider) return;
    set({ isLoading: true, error: null });

    try {
      console.log("Calling getUserProfile with:", addr);
      if (!ethers.isAddress(addr)) {
        throw new Error("Invalid wallet address");
      }
      const c = new ethers.Contract(
        CONTRACT_CONFIG.CONTRACT_ADDRESS,
        diamondAbi,
        provider
      );

      /* 1️⃣ profile struct */
      const p = await c.getUserProfile(addr);

      /* 2️⃣ core prices for all 12 slots */
      const pricesCore: bigint[] = await c.getAllSlotPricesInCore();

      /* 3️⃣ merge template ⇢ user slots */
      const activeIds = p.activeSlots.map((n: bigint) => Number(n));
      const merged = get().allSlots.map((s, idx) => ({
        ...s,
        priceCore: Number(ethers.formatEther(pricesCore[idx])),
        purchased: activeIds.includes(s.id),
        isActive: activeIds.includes(s.id),
      }));

      /* 4️⃣ earnings */
      const matrixE = ethers.formatEther(p.matrixEarnings);
      const levelE  = ethers.formatEther(p.levelEarnings);
      const poolE   = ethers.formatEther(p.poolEarnings);
      const totalE  = ethers.formatEther(p.totalEarnings);

      // withdrawn tracking may not exist yet; guard
      const withdrawnWei =
        (p as any).withdrawnEarnings ?? 0n; // bigint or 0
      const withdrawn = ethers.formatEther(withdrawnWei);
      const availableWei =
        BigInt(ethers.parseEther(totalE)) - BigInt(withdrawnWei);
      const available = ethers.formatEther(availableWei);

      set({
        userProfile: {
          wallet: addr,
          referrer: p.referrer,
          joined: new Date(Number(p.joinedAt) * 1000).toISOString(),
          isActive: p.isActive,
          totalInvestmentUsd: Number(totalE) * 10, // rough USD guess
        } as any,
        slots: merged.filter((s) => s.purchased),
        earnings: {
          matrix: matrixE,
          level: levelE,
          pool: poolE,
          total: totalE,
          withdrawn,
          available,
        },
        referrals: {
          direct: Number(p.directReferrals),
          indirect: 0,
          total: Number(p.directReferrals),
          activeReferrals: 0,
        },
        isLoading: false,
      });

      /* preload pool info & matrix */
      get().loadPoolIncome();
      get().loadMatrix(addr);
    } catch (err: any) {
      console.error(err);
      set({ error: err.message, isLoading: false });
    }
  },

  /* ------------------------------------------------------------------
     buySlot – on‑chain only
  ------------------------------------------------------------------ */
  buySlot: async (slot, signer) => {
    set({ isLoading: true });
    try {
      const c = new ethers.Contract(
        CONTRACT_CONFIG.CONTRACT_ADDRESS,
        diamondAbi,
        signer
      );
      const price = await c.getSlotPriceInCore(slot);
      const tx = await c.purchaseSlot(slot, { value: price });
      await tx.wait();

      const addr = await signer.getAddress();
      await get().loadUser(addr); // refresh UI
    } catch (e: any) {
      set({ error: e.message });
    } finally {
      set({ isLoading: false });
    }
  },

  /* ------------------------------------------------------------------
     loadMatrix – gathers nodes for every active slot
  ------------------------------------------------------------------ */
  loadMatrix: async (addr) => {
    if (!provider) return;
    try {
      const c = new ethers.Contract(
        CONTRACT_CONFIG.CONTRACT_ADDRESS,
        diamondAbi,
        provider
      );

      const active = get().slots.map((s) => s.id);
      const nodes: MatrixNode[] = [];

      for (const sId of active) {
        const n = await c.getMatrixNode(addr, sId);
        nodes.push({
          wallet: addr,
          slotId: sId,
          level1: n.level1,
          level2: n.level2,
          earnings: ethers.formatEther(n.earnings),
          isComplete: n.completed,
        } as unknown as MatrixNode);
      }
      set({ matrixNodes: nodes });
    } catch (e) {
      console.error(e);
    }
  },

  /* ------------------------------------------------------------------
     loadPoolIncome – getPoolInfo for all 12 slots
  ------------------------------------------------------------------ */
  loadPoolIncome: async () => {
    if (!provider) return;
    try {
      const c = new ethers.Contract(
        CONTRACT_CONFIG.CONTRACT_ADDRESS,
        diamondAbi,
        provider
      );

      const infos = await Promise.all(
        Array.from({ length: 12 }, (_, i) => c.getPoolInfo(i + 1))
      );

      set({ poolIncome: infos.map(pi => ({
        slotId: 0,           // filler until backend
        poolId: 0,
        amount: ethers.formatEther(pi.balance),
        distributionDate: Number(pi.lastDistributed) * 1000,
        userShare: "0",
      })) as any });         // <- cast to silence TS
    } catch (e) {
      console.error(e);
    }
  },
}));
