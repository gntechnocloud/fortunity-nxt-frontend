import React, { useState } from 'react';
import { 
  Receipt, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  /* Filter, */
  Download,
  ExternalLink/* ,
  Calendar */
} from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  Badge, 
  Table,
  Tabs
} from '@/components/ui';
/* import { useUserStore } from '@/stores/userStore'; */
import { formatAddress, formatDate, formatCurrency } from '@/utils';
import { CONTRACT_CONFIG } from '@/constants';

// Mock transaction data
const mockTransactions = [
  {
    id: 'tx001',
    hash: '0x1234567890abcdef1234567890abcdef12345678',
    type: 'purchase',
    description: 'Slot 3 Purchase',
    amount: '0.04',
    status: 'completed',
    date: new Date('2024-06-01T10:30:00'),
    gasUsed: '21000',
    gasFee: '0.0001'
  },
  {
    id: 'tx002',
    hash: '0x2345678901bcdef12345678901cdef123456789',
    type: 'earnings',
    description: 'Matrix Income',
    amount: '0.025',
    status: 'completed',
    date: new Date('2024-05-30T15:45:00'),
    gasUsed: '0',
    gasFee: '0'
  },
  {
    id: 'tx003',
    hash: '0x3456789012cdef123456789012def1234567890',
    type: 'withdrawal',
    description: 'Withdrawal to Wallet',
    amount: '0.1',
    status: 'pending',
    date: new Date('2024-05-29T09:15:00'),
    gasUsed: '25000',
    gasFee: '0.00015'
  }
];

export const TransactionsPage: React.FC = () => {
  /* const { transactions } = useUserStore(); */
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'purchase' | 'earnings' | 'withdrawal'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [dateRange, setDateRange] = useState<'all' | '7d' | '30d' | '90d'>('all');

  const openBlockExplorer = (hash: string) => {
    window.open(`${CONTRACT_CONFIG.NETWORK.blockExplorer}/tx/${hash}`, '_blank');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase':
        return <ArrowDownLeft className="w-4 h-4 text-danger-600" />;
      case 'earnings':
        return <ArrowUpRight className="w-4 h-4 text-success-600" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-4 h-4 text-warning-600" />;
      default:
        return <Receipt className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'danger';
      default: return 'default';
    }
  };

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = 
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;

    // Date filtering logic would go here
    const matchesDate = true; // Simplified for now

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  const transactionColumns = [
    {
      key: 'type' as keyof typeof mockTransactions[0],
      header: 'Type',
      render: (value: any/* , row: any */) => (
        <div className="flex items-center space-x-2">
          {getTypeIcon(value)}
          <span className="capitalize font-medium">{value}</span>
        </div>
      )
    },
    {
      key: 'description' as keyof typeof mockTransactions[0],
      header: 'Description',
      render: (value: any) => (
        <span className="text-gray-900 dark:text-gray-100">{value}</span>
      )
    },
    {
      key: 'amount' as keyof typeof mockTransactions[0],
      header: 'Amount',
      render: (value: any, row: any) => (
        <span className={`font-medium ${
          row.type === 'earnings' ? 'text-success-600' : 
          row.type === 'withdrawal' ? 'text-warning-600' : 
          'text-danger-600'
        }`}>
          {row.type === 'earnings' ? '+' : '-'}{formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'status' as keyof typeof mockTransactions[0],
      header: 'Status',
      render: (value: any) => (
        <Badge variant={getStatusVariant(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'date' as keyof typeof mockTransactions[0],
      header: 'Date',
      render: (value: any) => (
        <div>
          <div className="text-sm font-medium">
            {formatDate(value, 'MMM dd, yyyy')}
          </div>
          <div className="text-xs text-gray-500">
            {formatDate(value, 'HH:mm')}
          </div>
        </div>
      )
    },
    {
      key: 'hash' as keyof typeof mockTransactions[0],
      header: 'Transaction',
      render: (value: any) => (
        <div className="flex items-center space-x-2">
          <span className="font-mono text-sm">{formatAddress(value)}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => openBlockExplorer(value)}
            className="p-1"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      )
    }
  ];

  const totalEarnings = mockTransactions
    .filter(tx => tx.type === 'earnings' && tx.status === 'completed')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const totalWithdrawals = mockTransactions
    .filter(tx => tx.type === 'withdrawal' && tx.status === 'completed')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const totalPurchases = mockTransactions
    .filter(tx => tx.type === 'purchase' && tx.status === 'completed')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const tabs = [
    {
      id: 'all',
      label: 'All Transactions',
      content: (
        <div className="space-y-6">
          {/* Filters */}
          <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftIcon={<Search className="w-4 h-4" />}
                  className="w-full md:w-64"
                />

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Types</option>
                  <option value="purchase">Purchases</option>
                  <option value="earnings">Earnings</option>
                  <option value="withdrawal">Withdrawals</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>

                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  <option value="all">All Time</option>
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
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
                  {filteredTransactions.length} transactions
                </Badge>
              </div>
            </div>
          </Card>

          {/* Transactions Table */}
          <Card>
            <Table
              data={filteredTransactions}
              columns={transactionColumns}
              emptyMessage="No transactions found"
            />
          </Card>
        </div>
      )
    },
    {
      id: 'summary',
      label: 'Summary',
      content: (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="text-center">
                <ArrowUpRight className="w-8 h-8 text-success-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalEarnings.toString())}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <ArrowDownLeft className="w-8 h-8 text-danger-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalPurchases.toString())}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Purchases</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <ArrowUpRight className="w-8 h-8 text-warning-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(totalWithdrawals.toString())}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Withdrawals</p>
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Recent Transactions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your latest transaction activity
              </p>
            </div>

            <div className="space-y-3">
              {mockTransactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(tx.type)}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {tx.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(tx.date, 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      tx.type === 'earnings' ? 'text-success-600' : 
                      tx.type === 'withdrawal' ? 'text-warning-600' : 
                      'text-danger-600'
                    }`}>
                      {tx.type === 'earnings' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </p>
                    <Badge variant={getStatusVariant(tx.status)} size="sm">
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
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
            Transaction History
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track all your transactions and earnings
          </p>
        </div>
      </div>

      {/* Content */}
      <Tabs tabs={tabs} defaultTab="all" />
    </div>
  );
};
export default TransactionsPage;