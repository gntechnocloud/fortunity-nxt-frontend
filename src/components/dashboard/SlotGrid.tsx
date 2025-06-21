// src/components/dashboard/SlotGrid.tsx
import React, { useState } from 'react';
import { Lock, Unlock, TrendingUp, RefreshCw } from 'lucide-react';
import { Card, Button, Badge, Modal } from '@/components/ui';
import { formatCurrency } from '@/utils';
import { SLOT_CONFIG } from '@/constants';
import { Slot } from '@/types';

interface SlotGridProps {
  slots: Slot[]; // 12 slots — including purchased and unpurchased
  onPurchase: (slotId: number) => Promise<void>;
  isLoading: boolean;
}

export const SlotGrid: React.FC<SlotGridProps> = ({ slots, onPurchase, isLoading }) => {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleSlotClick = (slotId: number) => {
    const slot = slots.find(s => s.id === slotId) || {
      id: slotId,
      purchased: false,
      earnings: '0',
      price: SLOT_CONFIG.prices[index],
      isActive: false,
      rebirth: { count: 0 } // ✅ Add this line
    };;
    if (slot && !slot.purchased) {
      setSelectedSlot(slotId);
      setShowPurchaseModal(true);
    }
  };

  const handlePurchase = async () => {
    if (selectedSlot) {
      try {
        await onPurchase(selectedSlot);
        setShowPurchaseModal(false);
        setSelectedSlot(null);
      } catch (error) {
        console.error('Purchase failed:', error);
      }
    }
  };

  const getSlotStatus = (slot: any) => {
    if (!slot.purchased) return 'locked';
    if (slot.isActive) return 'active';
    return 'inactive';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'warning';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Unlock className="w-4 h-4" />;
      case 'inactive': return <RefreshCw className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Slot Overview
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your matrix slots and earnings
            </p>
          </div>
          <Badge variant="info">
            {slots.filter(s => s.purchased).length}/{slots.length} Active
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: SLOT_CONFIG.totalSlots }, (_, index) => {
            const slotId = index + 1;
            const slot = slots.find(s => s.id === slotId) || {
              id: slotId,
              purchased: false,
              earnings: '0',
              price: SLOT_CONFIG.prices[index],
              isActive: false
            };

            const status = getSlotStatus(slot);
            const price = SLOT_CONFIG.prices[index];

            return (
              <div
                key={slotId}
                onClick={() => handleSlotClick(slotId)}
                className={`
                  relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                  ${status === 'active' 
                    ? 'border-success-200 bg-success-50 dark:border-success-700 dark:bg-success-900/20' 
                    : status === 'inactive'
                    ? 'border-warning-200 bg-warning-50 dark:border-warning-700 dark:bg-warning-900/20'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 hover:border-primary-300'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    #{slotId}
                  </span>
                  <Badge variant={getStatusColor(status)} size="sm">
                    {getStatusIcon(status)}
                  </Badge>
                </div>

                <div className="mb-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Price</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(price)}
                  </p>
                </div>

                <div className="mb-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Earnings</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {formatCurrency(slot.earnings)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium capitalize ${
                    status === 'active' ? 'text-success-600' :
                    status === 'inactive' ? 'text-warning-600' :
                    'text-gray-500'
                  }`}>
                    {status}
                  </span>

                  {slot.purchased && (
                    <TrendingUp className="w-3 h-3 text-success-500" />
                  )}
                </div>

                {slot.rebirth && slot.rebirth.count > 0 && (
                  <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {slot.rebirth.count}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  #{selectedSlot}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Slot #{selectedSlot}
              </h3>
              <p className="text-3xl font-bold text-primary-600 dark:text-primary-400 mt-2">
                {formatCurrency(SLOT_CONFIG.prices[selectedSlot - 1])}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                Expected Returns:
              </h4>
              <div className="space-y-1 text-sm">
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
              <Button variant="outline" onClick={() => setShowPurchaseModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handlePurchase} isLoading={isLoading} className="flex-1">
                Purchase Slot
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
export default SlotGrid;
