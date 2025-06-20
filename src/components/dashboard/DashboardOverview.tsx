// src/components/dashboard/DashboardOverview.tsx

import React from 'react';
import {
  Coins,
  Users,
  TrendingUp,
  Grid3X3
} from 'lucide-react';

import { StatCard } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { useUserStore } from '@/stores/userStore';

interface DashboardOverviewProps {
  showBalances: boolean;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ showBalances }) => {
  const { earnings, referrals, slots } = useUserStore();

  const activeSlots = slots.filter(slot => slot.purchased).length;
  const totalSlots = slots.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Earnings"
        value={showBalances ? formatCurrency(earnings.total) : '••••'}
        icon={<Coins className="w-6 h-6" />}
        trend={{ value: 12.5, isPositive: true }}
      />
      <StatCard
        title="Active Slots"
        value={`${activeSlots}/${totalSlots}`}
        icon={<Grid3X3 className="w-6 h-6" />}
      />
      <StatCard
        title="Team Size"
        value={referrals.total}
        icon={<Users className="w-6 h-6" />}
        trend={{ value: 8.2, isPositive: true }}
      />
      <StatCard
        title="Matrix Income"
        value={showBalances ? formatCurrency(earnings.matrix) : '••••'}
        icon={<TrendingUp className="w-6 h-6" />}
      />
    </div>
  );
};

export default DashboardOverview;
