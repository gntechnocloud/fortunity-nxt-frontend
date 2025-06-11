import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card, Tabs } from '@/components/ui';
import { formatCurrency } from '@/utils';

interface EarningsChartProps {
  showBalances: boolean;
}

// Mock data - replace with real data from API
const earningsData = [
  { date: '2024-01', matrix: 0.12, level: 0.08, pool: 0.03 },
  { date: '2024-02', matrix: 0.18, level: 0.12, pool: 0.05 },
  { date: '2024-03', matrix: 0.25, level: 0.15, pool: 0.07 },
  { date: '2024-04', matrix: 0.32, level: 0.20, pool: 0.09 },
  { date: '2024-05', matrix: 0.28, level: 0.18, pool: 0.08 },
  { date: '2024-06', matrix: 0.35, level: 0.22, pool: 0.11 },
];

const CustomTooltip = ({ active, payload, label, showBalances }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {showBalances ? formatCurrency(entry.value) : '••••'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const EarningsChart: React.FC<EarningsChartProps> = ({ showBalances }) => {
  const tabs = [
    {
      id: 'line',
      label: 'Trend',
      content: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              className="text-xs text-gray-600 dark:text-gray-400"
              tickFormatter={(value) => showBalances ? `${value}` : '••'}
            />
            <Tooltip content={<CustomTooltip showBalances={showBalances} />} />
            <Line 
              type="monotone" 
              dataKey="matrix" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Matrix Income"
            />
            <Line 
              type="monotone" 
              dataKey="level" 
              stroke="#10b981" 
              strokeWidth={2}
              name="Level Income"
            />
            <Line 
              type="monotone" 
              dataKey="pool" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="Pool Income"
            />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    {
      id: 'bar',
      label: 'Comparison',
      content: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="date" 
              className="text-xs text-gray-600 dark:text-gray-400"
            />
            <YAxis 
              className="text-xs text-gray-600 dark:text-gray-400"
              tickFormatter={(value) => showBalances ? `${value}` : '••'}
            />
            <Tooltip content={<CustomTooltip showBalances={showBalances} />} />
            <Bar dataKey="matrix" fill="#3b82f6" name="Matrix Income" />
            <Bar dataKey="level" fill="#10b981" name="Level Income" />
            <Bar dataKey="pool" fill="#f59e0b" name="Pool Income" />
          </BarChart>
        </ResponsiveContainer>
      )
    }
  ];

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Earnings Overview
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track your income across different sources
        </p>
      </div>

      <Tabs tabs={tabs} defaultTab="line" />
    </Card>
  );
};