import React, { useState/* , useEffect */ } from 'react';
import { 
  Grid3X3, 
  /* Filter,  */
  Search,
  TrendingUp,
  Lock,
  Unlock,
  RefreshCw
} from 'lucide-react';
import { 
  Card, 
  Button, 
  Input, 
  Badge, 
  Modal,
  Table,
  Tabs
} from '@/components/ui';
import { useUserStore } from '@/stores/userStore';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency, formatDate } from '@/utils';
import { SLOT_CONFIG } from '@/constants';

export const SlotsPage: React.FC = () => {
  const { slots, purchaseSlot, isLoading } = useUserStore();
  const { signer/* , address */ } = useWalletStore();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'purchased' | 'available'>('all');

  const handlePurchase = async () => {
    if (selectedSlot && signer) {
      try {
        await purchaseSlot(selectedSlot, signer);
        setShowPurchaseModal(false);
        setSelectedSlot(null);
      } catch (error) {
        console.error('Purchase failed:', error);
      }
    }
  };

  const filteredSlots = slots.filter(slot => {
    const matchesSearch = slot.id.toString().includes(searchTerm);
    const matchesFilter = 
      filterStatus === 'all' ||
      (filterStatus === 'purchased' && slot.purchased) ||
      (filterStatus === 'available' && !slot.purchased);

    return matchesSearch && matchesFilter;
  });

  const slotColumns = [
    {
      key: 'id' as keyof typeof slots[0],
      header: 'Slot',
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
      key: 'price' as keyof typeof slots[0],
      header: 'Price',
      render: (value: any) => (
        <span className="font-medium">{formatCurrency(value)}</span>
      )
    },
    {
      key: 'purchased' as keyof typeof slots[0],
      header: 'Status',
      render: (value: any/* , row: any */) => (
        <Badge variant={value ? 'success' : 'default'}>
          {value ? (
            <>
              <Unlock className="w-3 h-3 mr-1" />
              Purchased
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 mr-1" />
              Available
            </>
          )}
        </Badge>
      )
    },
    {
      key: 'earnings' as keyof typeof slots[0],
      header: 'Earnings',
      render: (value: any) => (
        <span className="font-medium text-success-600">
          {formatCurrency(value)}
        </span>
      )
    },
    {
      key: 'purchasedAt' as keyof typeof slots[0],
      header: 'Purchase Date',
      render: (value: any) => (
        value ? formatDate(value, 'MMM dd, yyyy') : '-'
      )
    },
    {
      key: 'actions' as keyof typeof slots[0],
      header: 'Actions',
      render: (/* value: any, */ row: any) => (
        <div className="flex space-x-2">
          {!row.purchased ? (
            <Button
              size="sm"
              onClick={() => {
                setSelectedSlot(row.id);
                setShowPurchaseModal(true);
              }}
            >
              Purchase
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {/* View details */}}
            >
              Details
            </Button>
          )}
        </div>
      )
    }
  ];

  const purchasedSlots = slots.filter(s => s.purchased);
  const availableSlots = slots.filter(s => !s.purchased);
  const totalEarnings = slots.reduce((sum, slot) => sum + parseFloat(slot.earnings), 0);

  const tabs = [
    {
      id: 'grid',
      label: 'Grid View',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSlots.map((slot) => (
            <Card key={slot.id} className="hover:shadow-md transition-shadow">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    #{slot.id}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Slot {slot.id}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Price:</span>
                    <span className="font-medium">{formatCurrency(slot.price)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Earnings:</span>
                    <span className="font-medium text-success-600">{formatCurrency(slot.earnings)}</span>
                  </div>
                </div>

                <Badge 
                  variant={slot.purchased ? 'success' : 'default'} 
                  className="mb-4"
                >
                  {slot.purchased ? 'Purchased' : 'Available'}
                </Badge>

                {!slot.purchased ? (
                  <Button
                    onClick={() => {
                      setSelectedSlot(slot.id);
                      setShowPurchaseModal(true);
                    }}
                    className="w-full"
                  >
                    Purchase
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'table',
      label: 'Table View',
      content: (
        <Table
          data={filteredSlots}
          columns={slotColumns}
          emptyMessage="No slots found"
        />
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Slots Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Purchase and manage your matrix slots
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="text-center">
            <Grid3X3 className="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {purchasedSlots.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Purchased Slots</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <Lock className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {availableSlots.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available Slots</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <TrendingUp className="w-8 h-8 text-success-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatCurrency(totalEarnings.toString())}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <RefreshCw className="w-8 h-8 text-warning-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {slots.filter(s => s.rebirth?.count && s.rebirth.count > 0).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Rebirths</p>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Search slots..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
              className="w-64"
            />

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Slots</option>
              <option value="purchased">Purchased</option>
              <option value="available">Available</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="info">
              {filteredSlots.length} slots
            </Badge>
          </div>
        </div>
      </Card>

      {/* Slots Content */}
      <Card>
        <Tabs tabs={tabs} defaultTab="grid" />
      </Card>

      {/* Purchase Modal */}
      <Modal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        title={`Purchase Slot #${selectedSlot}`}
      >
        {selectedSlot && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  #{selectedSlot}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Slot #{selectedSlot}
              </h3>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">
                {formatCurrency(SLOT_CONFIG.prices[selectedSlot - 1])}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                Income Distribution:
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Matrix Income (60%):</span>
                  <span className="font-medium">
                    {formatCurrency((parseFloat(SLOT_CONFIG.prices[selectedSlot - 1]) * 0.6).toString())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Level Income (30%):</span>
                  <span className="font-medium">
                    {formatCurrency((parseFloat(SLOT_CONFIG.prices[selectedSlot - 1]) * 0.3).toString())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Pool Income (10%):</span>
                  <span className="font-medium">
                    {formatCurrency((parseFloat(SLOT_CONFIG.prices[selectedSlot - 1]) * 0.1).toString())}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPurchaseModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePurchase}
                isLoading={isLoading}
                className="flex-1"
              >
                Confirm Purchase
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};