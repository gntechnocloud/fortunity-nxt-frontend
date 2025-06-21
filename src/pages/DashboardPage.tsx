import React, { useEffect, useState } from "react";

import { DashboardOverview }   from "@/components/dashboard/DashboardOverview";
import { EarningsChart }       from "@/components/dashboard/EarningsChart";
import { RecentActivity }      from "@/components/dashboard/RecentActivity";
import { ReferralStats }       from "@/components/dashboard/ReferralStats";
import { SlotGrid }            from "@/components/dashboard/SlotGrid";
import SlotsOverview           from "@/components/dashboard/SlotsOverview";
import { MatrixOverview }      from "@/components/dashboard/MatrixOverview";

import { useWalletStore }      from "@/stores/walletStore";
import { useUserStore }        from "@/stores/userStore";
import { fetchUsdPrices }      from "@/utils/priceFeed";

import type { Slot }           from "@/types";

const DashboardPage: React.FC = () => {
  /* ───────────────────────────────── state ──────────────────────────────── */
  const [showBalances, setShowBalances] = useState(true);
  const [usdPrices,     setUsdPrices]   = useState<Record<number, number>>({});

  /* ────────────────────────────── wallet store ─────────────────────────── */
  const { isConnected, address, connectWallet, signer } = useWalletStore();

  /* ─────────────────────────────── user store ──────────────────────────── */
  const {
    /* loaders */
    loadUser,
    loadMatrix,
    loadPoolIncome,
    buySlot,

    /* reactive data */
    slots,
    allSlots,
    userProfile,
    referrals,
    matrixNodes,
    transactions,
    isLoading,
  } = useUserStore();

  /* ─────────────────────────── initial data pull ───────────────────────── */
  useEffect(() => {
    const fetchAll = async () => {
      if (!address) return;
      await Promise.all([
        loadUser(address),   // profile + earnings + slots
        loadMatrix(address), // matrix nodes (level‑1/2)
        loadPoolIncome(),    // pool stats – contract‑wide
      ]).catch(console.error);
    };

    if (isConnected && address) {
      fetchAll();
    } else {
      connectWallet().catch(console.error);
    }
  }, [isConnected, address]);

  /* ─────────────────────────── USD price helper ────────────────────────── */
  useEffect(() => {
    fetchUsdPrices()
      .then(setUsdPrices)
      .catch((err) => console.error("Price‑feed error:", err));
  }, []);

  /* ───────────────────────────── loading guard ─────────────────────────── */
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        Loading dashboard…
      </div>
    );
  }

  /* ─────────────────────────────── render UI ───────────────────────────── */
  return (
    <div className="space-y-6">
      {/* header */}
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

      {/* overview cards */}
      <DashboardOverview
        showBalances={showBalances}
        profile={userProfile}
        slots={slots}
      />

      {/* all 12 slots + USD helper */}
      <SlotsOverview
        allSlots={allSlots as Slot[]}
        activeSlotIds={slots.map((s) => s.id)}
        usdPrices={usdPrices}
      />

      {/* earnings vs referrals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsChart showBalances={showBalances} />
        </div>
        <ReferralStats referrals={referrals} />
      </div>

      {/* matrix snapshot (depth‑2) */}
      <MatrixOverview matrixNodes={matrixNodes} />

      {/* slot cards + recent tx */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SlotGrid
          slots={slots}
          isLoading={isLoading}
          onPurchase={async (slotId) => {
            if (signer) await buySlot(slotId, signer);
          }}
        />
        {/* remove RecentActivity if you have no tx backend yet */}
        <RecentActivity transactions={transactions} />
      </div>
    </div>
  );
};

export default DashboardPage;
// This file is part of the FNXT project.
// It is subject to the license terms in the LICENSE file found in the top-level directory
// of this distribution and at    

