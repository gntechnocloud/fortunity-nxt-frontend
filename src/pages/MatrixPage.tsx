import React/* , { useState } */ from 'react';
import { Network, Users, TrendingUp, Eye } from 'lucide-react';
import { Card, Button, Badge, Tabs } from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { formatAddress, formatCurrency } from '@/utils';

// Matrix visualization component
const MatrixVisualization: React.FC<{ level: number }> = ({ level }) => {
  const positions = Array.from({ length: Math.pow(2, level) }, (_, i) => i);

  return (
    <div className="flex flex-col items-center space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Level {level}
      </h3>

      <div className={`grid gap-4 ${level === 1 ? 'grid-cols-2' : level === 2 ? 'grid-cols-4' : 'grid-cols-8'}`}>
        {positions.map((position) => (
          <div
            key={position}
            className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            <Users className="w-6 h-6 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const MatrixPage: React.FC = () => {
  const { matrix/* , userProfile  */} = useUserStore();
 /*  const [selectedLevel, setSelectedLevel] = useState(1); */

  const matrixStats = {
    totalPositions: matrix.length,
    filledPositions: matrix.filter(m => m.downlines.length > 0).length,
    completedMatrices: matrix.filter(m => m.isComplete).length,
    totalEarnings: '0.125' // This should come from actual data
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <div className="text-center">
                <Network className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {matrixStats.totalPositions}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Positions</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <Users className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {matrixStats.filledPositions}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Filled Positions</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-warning-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {matrixStats.completedMatrices}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(matrixStats.totalEarnings)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Matrix Earnings</p>
              </div>
            </Card>
          </div>

          {/* Matrix Levels */}
          <Card>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Matrix Structure
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                2x2 Forced Matrix - Each level doubles the positions
              </p>
            </div>

            <div className="space-y-8">
              {[1, 2, 3].map((level) => (
                <MatrixVisualization key={level} level={level} />
              ))}
            </div>
          </Card>
        </div>
      )
    },
    {
      id: 'positions',
      label: 'My Positions',
      content: (
        <div className="space-y-6">
          {matrix.length > 0 ? (
            <div className="grid gap-6">
              {matrix.map((position, index) => (
                <Card key={index}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Level {position.level} - Position {position.position}
                      </h4>
                      {position.upline && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Upline: {formatAddress(position.upline)}
                        </p>
                      )}
                    </div>
                    <Badge variant={position.isComplete ? 'success' : 'warning'}>
                      {position.isComplete ? 'Complete' : 'Active'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Downlines ({position.downlines.length}/2)
                      </p>
                      <div className="space-y-1">
                        {position.downlines.map((downline, idx) => (
                          <div key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                            {formatAddress(downline)}
                          </div>
                        ))}
                        {position.downlines.length < 2 && (
                          <div className="text-sm text-gray-400 italic">
                            Waiting for referrals...
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Earnings
                      </p>
                      <p className="text-lg font-bold text-success-600">
                        {formatCurrency('0.025')} {/* This should come from actual data */}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-8">
                <Network className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No Matrix Positions
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Purchase your first slot to join the matrix
                </p>
                <Button>Purchase Slot</Button>
              </div>
            </Card>
          )}
        </div>
      )
    },
    {
      id: 'genealogy',
      label: 'Genealogy',
      content: (
        <Card>
          <div className="text-center py-8">
            <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Genealogy Tree
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Visual representation of your matrix genealogy coming soon
            </p>
          </div>
        </Card>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Matrix Network
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage your matrix positions
          </p>
        </div>
      </div>

      {/* Content */}
      <Tabs tabs={tabs} defaultTab="overview" />
    </div>
  );
};
export default MatrixPage;