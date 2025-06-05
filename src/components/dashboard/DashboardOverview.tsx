import React, { useEffect } from 'react';
import { 
  Coins, 
  Users, 
  TrendingUp, 
  Grid3X3,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react';
import { StatCard, Button, LoadingSpinner } from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency } from '@/utils';
import { EarningsChart } from './EarningsChart';
import { RecentActivity } from './RecentActivity';
import { SlotGrid } from './SlotGrid';
import { ReferralStats } from './ReferralStats';

export const DashboardOverview: React.FC = () => {
  const { address, isConnected } = useWalletStore();
  const { 
    earnings, 
    referrals, 
    slots, 
    isLoading, 
    loadUserData,
    refreshData 
  } = useUserStore();

  const [showBalances, setShowBalances] = React.useState(true);

  useEffect(() => {
    if (isConnected && address) {
      loadUserData(address);
    }
  }, [isConnected, address, loadUserData]);

  const handleRefresh = async () => {
    if (address) {
      await refreshData(address);
    }
  };

  const activeSlots = slots.filter(slot => slot.purchased).length;
  const totalSlots = slots.length;

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <Coins className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome to Fortunity NXT
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Connect your wallet to access your dashboard and start earning.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's your Fortunity NXT overview.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
            leftIcon={showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          >
            {showBalances ? 'Hide' : 'Show'} Balances
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <EarningsChart showBalances={showBalances} />
          <SlotGrid />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <ReferralStats />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};