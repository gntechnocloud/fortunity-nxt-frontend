import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Share, 
  Copy, 
  Search,
 /*  Filter, */
  Download
} from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  Badge, 
  Table,
  Tabs,
  Modal
} from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { useWalletStore } from '@/stores/walletStore';
import { formatAddress, formatDate, formatCurrency, copyToClipboard, generateReferralLink } from '@/utils';
import QRCode from 'react-qr-code';

// Mock referral data
const mockReferrals = [
  {
    id: '1',
    address: '0x1234567890123456789012345678901234567890',
    level: 1,
    joinDate: new Date('2024-01-15'),
    status: 'active',
    totalEarnings: '0.125',
    slotsOwned: 3
  },
  {
    id: '2',
    address: '0x2345678901234567890123456789012345678901',
    level: 1,
    joinDate: new Date('2024-02-20'),
    status: 'active',
    totalEarnings: '0.089',
    slotsOwned: 2
  },
  {
    id: '3',
    address: '0x3456789012345678901234567890123456789012',
    level: 2,
    joinDate: new Date('2024-03-10'),
    status: 'inactive',
    totalEarnings: '0.045',
    slotsOwned: 1
  }
];

export const ReferralsPage: React.FC = () => {
  const { userProfile, referrals } = useUserStore();
  const { address } = useWalletStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | '1' | '2' | '3+'>('all');
  const [showShareModal, setShowShareModal] = useState(false);

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
        handleCopyLink();
      }
    } else {
      setShowShareModal(true);
    }
  };

  const filteredReferrals = mockReferrals.filter(referral => {
    const matchesSearch = 
      referral.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      referral.id.includes(searchTerm);

    const matchesLevel = 
      filterLevel === 'all' ||
      (filterLevel === '3+' && referral.level >= 3) ||
      referral.level.toString() === filterLevel;

    return matchesSearch && matchesLevel;
  });

  const referralColumns = [
    {
      key: 'address' as keyof typeof mockReferrals[0],
      header: 'Address',
      render: (value: any) => (
        <div className="font-mono text-sm">
          {formatAddress(value)}
        </div>
      )
    },
    {
      key: 'level' as keyof typeof mockReferrals[0],
      header: 'Level',
      render: (value: any) => (
        <Badge variant="info" size="sm">
          Level {value}
        </Badge>
      )
    },
    {
      key: 'joinDate' as keyof typeof mockReferrals[0],
      header: 'Join Date',
      render: (value: any) => formatDate(value, 'MMM dd, yyyy')
    },
    {
      key: 'status' as keyof typeof mockReferrals[0],
      header: 'Status',
      render: (value: any) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      )
    },
    {
      key: 'slotsOwned' as keyof typeof mockReferrals[0],
      header: 'Slots',
      render: (value: any) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'totalEarnings' as keyof typeof mockReferrals[0],
      header: 'Earnings',
      render: (value: any) => (
        <span className="font-medium text-success-600">
          {formatCurrency(value)}
        </span>
      )
    }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <div className="text-center">
                <Users className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {referrals.direct}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Direct Referrals</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <UserPlus className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {referrals.indirect}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Indirect Referrals</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <Users className="w-8 h-8 text-warning-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {referrals.total}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Team</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <Users className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {referrals.activeReferrals}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Members</p>
              </div>
            </Card>
          </div>

          {/* Referral Link */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Your Referral Link
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share this link to invite new members
              </p>
            </div>

            <div className="flex space-x-2 mb-4">
              <Input
                value={referralLink}
                readOnly
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleCopyLink}
                leftIcon={<Copy className="w-4 h-4" />}
              >
                Copy
              </Button>
              <Button
                onClick={handleShare}
                leftIcon={<Share className="w-4 h-4" />}
              >
                Share
              </Button>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-white rounded-lg">
                <QRCode
                  value={referralLink}
                  size={150}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'team',
      label: 'Team Members',
      content: (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search by address or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="w-64"
                />

                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Levels</option>
                  <option value="1">Level 1</option>
                  <option value="2">Level 2</option>
                  <option value="3+">Level 3+</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Export
                </Button>
                <Badge variant="info">
                  {filteredReferrals.length} members
                </Badge>
              </div>
            </div>
          </Card>

          {/* Team Table */}
          <Card>
            <Table
              data={filteredReferrals}
              columns={referralColumns}
              emptyMessage="No team members found"
            />
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
            Referral Network
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your team and track referral earnings
          </p>
        </div>
      </div>

      {/* Content */}
      <Tabs tabs={tabs} defaultTab="overview" />

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Referral Link"
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="inline-block p-4 bg-white rounded-lg mb-4">
              <QRCode
                value={referralLink}
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Scan QR code or copy the link below
            </p>
          </div>

          <div className="flex space-x-2">
            <Input
              value={referralLink}
              readOnly
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleCopyLink}
              leftIcon={<Copy className="w-4 h-4" />}
            >
              Copy
            </Button>
          </div>

          <div className="text-center">
            <Button onClick={() => setShowShareModal(false)} className="w-full">
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};