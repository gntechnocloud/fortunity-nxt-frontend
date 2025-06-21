// src/pages/DashboardPage.tsx
import React, { useEffect, useState } from "react";

import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { EarningsChart } from "@/components/dashboard/EarningsChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { ReferralStats } from "@/components/dashboard/ReferralStats";
import { SlotGrid } from "@/components/dashboard/SlotGrid";
import SlotsOverview from "@/components/dashboard/SlotsOverview";
import { MatrixOverview } from "@/components/dashboard/MatrixOverview";

import { useWalletStore } from "@/stores/walletStore";
import { useUserStore } from "@/stores/userStore";
import { fetchUsdPrices } from "@/utils/priceFeed";

import type { Slot } from "@/types";




const DashboardPage: React.FC = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [usdPrices, setUsdPrices] = useState<Record<number, number>>({});
  const { signer } = useWalletStore(); // ✅ get signer from wallet store
  const { isLoading, purchaseSlot } = useUserStore(); // ✅ get functions
  /* ------------------- Stores ------------------- */
  const { isConnected, address, connectWallet } = useWalletStore();
  const {
    loadUserData,
    loadEarnings,
    loadReferrals,
    loadMatrix,
    loadTransactions,
    loadPoolIncome,
    /* data */
    slots,
    allSlots,        // <- ensure userStore exposes the 12‑slot master list
    userProfile,
    referrals,
    matrixNodes,     // <- depth‑2 nodes
    transactions,
  } = useUserStore();

  /* ---------- Fetch blockchain + price data ---------- */
  useEffect(() => {
    const fetchAllData = async () => {
      if (!address) return;

      await Promise.all([
        loadUserData(address),
        loadEarnings(address),
        loadReferrals(address),
        loadMatrix(address),
        loadTransactions(address),
        loadPoolIncome(address),
      ]).catch(console.error);
    };

    if (isConnected && address) {
      fetchAllData();
    } else {
      connectWallet().catch(console.error);
    }
  }, [isConnected, address]);

  // on mount ‑ grab USD prices for slots
  useEffect(() => {
    fetchUsdPrices()
      .then(setUsdPrices)
      .catch((err) => console.error("Price feed error:", err));
  }, []);

  /* ------------------- Loading State ------------------ */
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  /* ------------------- Render ------------------- */
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Dashboard
        </h1>

        <button
          onClick={() => setShowBalances(!showBalances)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          {showBalances ? "Hide Balances" : "Show Balances"}
        </button>
      </div>

      {/* Overview Cards */}
      <DashboardOverview
        showBalances={showBalances}
        profile={userProfile}
        slots={slots} /* active slot IDs */
      />

      {/* Slots Overview (all 12 slots with USD + CORE) */}
      <SlotsOverview
        allSlots={allSlots as Slot[]}      /* metadata for 1‑12 */
        activeSlotIds={slots.map(s => s.id)} // ✅ FIXED: now an array of IDs     /* active slot IDs */
        usdPrices={usdPrices}
      />

      {/* Earnings vs Referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsChart showBalances={showBalances} />
        </div>
        <ReferralStats referrals={referrals} />
      </div>

      {/* Matrix overview (depth 2 only) */}
      <MatrixOverview matrixNodes={matrixNodes} />

      {/* Slot cards & recent tx */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SlotGrid
  slots={slots}
  isLoading={isLoading}
  onPurchase={async (slotId) => {
    if (signer) await purchaseSlot(slotId, signer);
  }}
/>
<RecentActivity transactions={transactions} />
      </div>
    </div>
  );
};

export default DashboardPage;
