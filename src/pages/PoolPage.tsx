import React/* , { useState }  */from 'react';
import { 
  Coins, 
  Calendar, 
  Users,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';
import { 
  Card, 
 /*  Button,  */
  Badge, 
  Table,
  Tabs
} from '@/components/ui';
/* import { useUserStore } from '@/stores/userStore'; */
import { formatCurrency, formatDate } from '@/utils';
import { POOL_DISTRIBUTION_DATES } from '@/constants';

// Mock pool data
const mockPoolData = [
  {
    id: '1',
    poolId: 1,
    distributionDate: new Date('2024-06-05'),
    totalPool: '12.5',
    participants: 156,
    userShare: '0.08',
    status: 'distributed'
  },
  {
    id: '2',
    poolId: 2,
    distributionDate: new Date('2024-06-15'),
    totalPool: '18.3',
    participants: 203,
    userShare: '0.09',
    status: 'distributed'
  },
  {
    id: '3',
    poolId: 3,
    distributionDate: new Date('2024-06-25'),
    totalPool: '15.7',
    participants: 189,
    userShare: '0.083',
    status: 'pending'
  }
];

const upcomingDistributions = [
  {
    date: new Date('2024-07-05'),
    estimatedPool: '20.0',
    estimatedParticipants: 220
  },
  {
    date: new Date('2024-07-15'),
    estimatedPool: '22.5',
    estimatedParticipants: 245
  },
  {
    date: new Date('2024-07-25'),
    estimatedPool: '19.8',
    estimatedParticipants: 210
  }
];

export const PoolPage: React.FC = () => {
/*   const { poolIncome } = useUserStore(); */

  const totalEarnings = mockPoolData
    .filter(pool => pool.status === 'distributed')
    .reduce((sum, pool) => sum + parseFloat(pool.userShare), 0);

  const poolColumns = [
    {
      key: 'poolId' as keyof typeof mockPoolData[0],
      header: 'Pool',
      render: (value: any) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
              #{value}
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'distributionDate' as keyof typeof mockPoolData[0],
      header: 'Distribution Date',
      render: (value: any) => formatDate(value, 'MMM dd, yyyy')
    },
    {
      key: 'totalPool' as keyof typeof mockPoolData[0],
      header: 'Total Pool',
      render: (value: any) => (
        <span className="font-medium">{formatCurrency(value)}</span>
      )
    },
    {
      key: 'participants' as keyof typeof mockPoolData[0],
      header: 'Participants',
      render: (value: any) => (
        <span className="font-medium">{value}</span>
      )
    },
    {
      key: 'userShare' as keyof typeof mockPoolData[0],
      header: 'Your Share',
      render: (value: any) => (
        <span className="font-medium text-success-600">
          {formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'status' as keyof typeof mockPoolData[0],
      header: 'Status',
      render: (value: any) => (
        <Badge variant={value === 'distributed' ? 'success' : 'warning'}>
          {value}
        </Badge>
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
                <Coins className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalEarnings.toString())}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Pool Earnings</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <Award className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {mockPoolData.filter(p => p.status === 'distributed').length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Distributions Received</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <Users className="w-8 h-8 text-warning-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.round(mockPoolData.reduce((sum, p) => sum + p.participants, 0) / mockPoolData.length)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Participants</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency((totalEarnings / mockPoolData.filter(p => p.status === 'distributed').length).toString())}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Per Distribution</p>
              </div>
            </Card>
          </div>

          {/* Pool Distribution Schedule */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Distribution Schedule
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pool income is distributed on the 5th, 15th, and 25th of each month
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {POOL_DISTRIBUTION_DATES.map((date/* , index */) => (
                <div key={date} className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                  <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {date}th
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    of each month
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Upcoming Distributions */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upcoming Distributions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Estimated pool sizes and distribution dates
              </p>
            </div>

            <div className="space-y-3">
              {upcomingDistributions.map((dist, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-warning-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {formatDate(dist.date, 'MMMM dd, yyyy')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {dist.estimatedParticipants} estimated participants
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      ~{formatCurrency(dist.estimatedPool)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Estimated pool
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'history',
      label: 'Distribution History',
      content: (
        <div className="space-y-6">
          <Card>
            <Table
              data={mockPoolData}
              columns={poolColumns}
              emptyMessage="No pool distributions found"
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
            Pool Income
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your pool income distributions and earnings
          </p>
        </div>
      </div>

      {/* Content */}
      <Tabs tabs={tabs} defaultTab="overview" />
    </div>
  );
};