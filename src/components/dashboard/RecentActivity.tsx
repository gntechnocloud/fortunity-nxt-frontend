import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Grid3X3, 
  Users,
  MoreHorizontal
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { formatCurrency, formatRelativeTime } from '@/utils';
/* import { useUserStore } from '@/stores/userStore'; */

// Mock data - replace with real data
const recentActivities = [
  {
    id: '1',
    type: 'earnings',
    description: 'Matrix income received',
    amount: '0.025',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    icon: ArrowUpRight,
    color: 'text-success-600'
  },
  {
    id: '2',
    type: 'purchase',
    description: 'Slot 4 purchased',
    amount: '0.08',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: Grid3X3,
    color: 'text-primary-600'
  },
  {
    id: '3',
    type: 'referral',
    description: 'New referral joined',
    amount: null,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    icon: Users,
    color: 'text-warning-600'
  },
  {
    id: '4',
    type: 'earnings',
    description: 'Level income received',
    amount: '0.015',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    icon: ArrowUpRight,
    color: 'text-success-600'
  },
  {
    id: '5',
    type: 'withdrawal',
    description: 'Withdrawal processed',
    amount: '0.5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    icon: ArrowDownLeft,
    color: 'text-danger-600'
  }
];

export const RecentActivity: React.FC = () => {
 /*  const { transactions } = useUserStore(); */

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent Activity
        </h3>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {recentActivities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>

              {activity.amount && (
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    activity.type === 'withdrawal' ? 'text-danger-600' : 'text-success-600'
                  }`}>
                    {activity.type === 'withdrawal' ? '-' : '+'}
                    {formatCurrency(activity.amount)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="ghost" size="sm" className="w-full">
          View All Activity
        </Button>
      </div>
    </Card>
  );
};
export default RecentActivity;
//     },
//     {
//       id: 'grid',
