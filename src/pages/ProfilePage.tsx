import React, { useState } from 'react';
import { 
 /*  User, 
  Settings,  */
  Shield, 
 /*  Bell, */
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Edit
} from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  Badge, 
  Tabs,
  Modal
} from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { useWalletStore } from '@/stores/walletStore';
import { useAppStore } from '@/stores/appStore';
import { /* formatAddress, */ formatDate, formatCurrency, copyToClipboard } from '@/utils';
import { CONTRACT_CONFIG } from '@/constants';

export const ProfilePage: React.FC = () => {
  const { userProfile, earnings, referrals } = useUserStore();
  const { address, coreBalance, fnxtBalance } = useWalletStore();
  const { settings, updateSettings } = useAppStore();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBalances, setShowBalances] = useState(true);

  const handleCopyAddress = async () => {
    if (address) {
      await copyToClipboard(address);
    }
  };

  const openBlockExplorer = () => {
    if (address) {
      window.open(`${CONTRACT_CONFIG.NETWORK.blockExplorer}/address/${address}`, '_blank');
    }
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <div className="space-y-6">
          {/* Profile Info */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Profile Information
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowEditModal(true)}
                leftIcon={<Edit className="w-4 h-4" />}
              >
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Wallet Address
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={address || ''}
                    readOnly
                    className="flex-1 font-mono"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyAddress}
                    className="px-3"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openBlockExplorer}
                    className="px-3"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Member Since
                </label>
                <Input
                  value={userProfile?.registeredAt ? formatDate(userProfile.registeredAt, 'MMMM dd, yyyy') : 'N/A'}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Level
                </label>
                <Input
                  value={userProfile?.level?.toString() || '1'}
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <div className="flex items-center space-x-2">
                  <Badge variant={userProfile?.isActive ? 'success' : 'warning'}>
                    {userProfile?.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Wallet Balances */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Wallet Balances
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBalances(!showBalances)}
                leftIcon={showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              >
                {showBalances ? 'Hide' : 'Show'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">CORE Balance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {showBalances ? formatCurrency(coreBalance, 'CORE') : '••••'}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">FNXT Balance</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {showBalances ? formatCurrency(fnxtBalance, 'FNXT') : '••••'}
                </p>
              </div>
            </div>
          </Card>

          {/* Earnings Summary */}
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Earnings Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Earnings</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {showBalances ? formatCurrency(earnings.total) : '••••'}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Matrix Income</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {showBalances ? formatCurrency(earnings.matrix) : '••••'}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Level Income</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {showBalances ? formatCurrency(earnings.level) : '••••'}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pool Income</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {showBalances ? formatCurrency(earnings.pool) : '••••'}
                </p>
              </div>
            </div>
          </Card>

          {/* Team Summary */}
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Team Summary
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Direct Referrals</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {referrals.direct}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Team</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {referrals.total}
                </p>
              </div>

              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Members</p>
                <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {referrals.activeReferrals}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div className="space-y-6">
          {/* App Settings */}
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Application Settings
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Notifications
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receive notifications for transactions and earnings
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => updateSettings({ notifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Auto Refresh
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Automatically refresh data every 30 seconds
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.autoRefresh}
                    onChange={(e) => updateSettings({ autoRefresh: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Refresh Interval (seconds)
                </label>
                <select
                  value={settings.refreshInterval / 1000}
                  onChange={(e) => updateSettings({ refreshInterval: parseInt(e.target.value) * 1000 })}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  disabled={!settings.autoRefresh}
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Security & Privacy
              </h3>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Security Notice
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                      Always verify transaction details before confirming. Never share your private keys or seed phrase.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Connected Network
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {CONTRACT_CONFIG.NETWORK.name}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Profile & Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your account and application preferences
          </p>
        </div>
      </div>

      {/* Content */}
      <Tabs tabs={tabs} defaultTab="profile" />

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Profile information is managed by your wallet connection. 
            Connect a different wallet to change your profile.
          </p>

          <div className="flex justify-end">
            <Button onClick={() => setShowEditModal(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};