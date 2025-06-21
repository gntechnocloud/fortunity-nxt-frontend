import React from 'react';
import {
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  MoreHorizontal,
  HelpCircle
} from 'lucide-react';
import { Card, Button } from '@/components/ui';
import { formatCurrency, formatRelativeTime } from '@/utils';
import { Transaction } from '@/types';

interface RecentActivityProps {
  transactions: Transaction[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return { icon: ArrowUpRight, color: 'text-success-600' };
    case 'withdrawal':
      return { icon: ArrowDownLeft, color: 'text-danger-600' };
    case 'rebirth':
      return { icon: Repeat, color: 'text-warning-600' };
    default:
      return { icon: HelpCircle, color: 'text-gray-500' };
  }
};

export const RecentActivity: React.FC<RecentActivityProps> = ({ transactions }) => {
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
        {transactions.map((tx) => {
          const { icon: Icon, color } = getActivityIcon(tx.type);
          return (
            <div
              key={tx.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {tx.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(new Date(tx.createdAt))} {/* ✅ Fixed here */}
                </p>
              </div>

              {tx.amount && (
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      tx.type === 'withdrawal'
                        ? 'text-danger-600'
                        : 'text-success-600'
                    }`}
                  >
                    {tx.type === 'withdrawal' ? '-' : '+'}
                    {formatCurrency(tx.amount)}
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
