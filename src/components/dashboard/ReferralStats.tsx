import React from 'react';
import { Users, UserPlus, Share, Copy } from 'lucide-react';
import { Card, Button, Badge } from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { useWalletStore } from '@/stores/walletStore';
import { copyToClipboard, generateReferralLink } from '@/utils';
import QRCode from 'react-qr-code';
import { Referrals } from '@/types';

 interface ReferralStatsProps {
  referrals: Referrals;
} 


export const ReferralStats: React.FC<ReferralStatsProps> = ({ referrals }) => {
  const { userProfile } = useUserStore();
  const { address } = useWalletStore();

  const referralLink = userProfile?.referralLink || (address ? generateReferralLink(address) : '');

  const handleCopyLink = async () => {
    if (referralLink) {
      await copyToClipboard(referralLink);
    }
  };

  const handleShare = async () => {
    if (navigator.share && referralLink) {
      try {
        await navigator.share({
          title: 'Join Fortunity NXT',
          text: 'Join me on Fortunity NXT and start earning!',
          url: referralLink,
        });
      } catch (error) {
        // Fallback to copy
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Referral Network
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Grow your team and earn more
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Users className="w-6 h-6 text-primary-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {referrals.direct}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Direct</p>
        </div>

        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <UserPlus className="w-6 h-6 text-success-600 mx-auto mb-1" />
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {referrals.indirect}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Indirect</p>
        </div>
      </div>

      {/* Total Team */}
      <div className="text-center mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
          Total Team Size
        </p>
        <p className="text-3xl font-bold text-primary-700 dark:text-primary-300">
          {referrals.total}
        </p>
        <Badge variant="success" size="sm" className="mt-1">
          {referrals.activeReferrals} Active
        </Badge>
      </div>

      {/* Referral Link */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Your Referral Link
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="px-3"
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* QR Code */}
        <div className="text-center">
          <div className="inline-block p-3 bg-white rounded-lg">
            <QRCode
              value={referralLink}
              size={120}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </div>
        </div>

        {/* Share Button */}
        <Button
          onClick={handleShare}
          leftIcon={<Share className="w-4 h-4" />}
          className="w-full"
        >
          Share Referral Link
        </Button>
      </div>
    </Card>
  );
};
export default ReferralStats;