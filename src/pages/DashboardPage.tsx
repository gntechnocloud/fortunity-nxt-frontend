// src/pages/DashboardPage.tsx

import React, { useEffect, useState } from 'react';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { EarningsChart } from '@/components/dashboard/EarningsChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ReferralStats } from '@/components/dashboard/ReferralStats';
import { SlotGrid } from '@/components/dashboard/SlotGrid';

import { useWalletStore } from '@/stores/walletStore';
import { useUserStore } from '@/stores/userStore';

const DashboardPage: React.FC = () => {
  const [showBalances, setShowBalances] = useState(true);

  const { isConnected, address, connectWallet } = useWalletStore();
  const {
    loadUserData,
    loadEarnings,
    loadReferrals,
    loadMatrix,
    loadTransactions,
    loadPoolIncome,
    slots,
    userProfile
  } = useUserStore();

  useEffect(() => {
    const fetchAllData = async () => {
      if (!address) return;

      await loadUserData(address);
      await loadEarnings(address);
      await loadReferrals(address);
      await loadMatrix(address);
      await loadTransactions(address);
      await loadPoolIncome(address);
    };

    if (isConnected && address) {
      fetchAllData().catch(console.error);
    } else {
      connectWallet().catch(console.error);
    }
  }, [isConnected, address]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          {showBalances ? 'Hide Balances' : 'Show Balances'}
        </button>
      </div>

      <DashboardOverview showBalances={showBalances} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EarningsChart showBalances={showBalances} />
        </div>
        <div>
          <ReferralStats />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SlotGrid /> // ✅ Correct usage
      <RecentActivity />
      </div>
    </div>
  );
};

export default DashboardPage;
