import React from 'react';
import { Modal, Button, Card } from '@/components/ui';
import {/*  Wallet, */ Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { useWalletStore } from '@/stores/walletStore';
import { formatAddress, formatCurrency, copyToClipboard } from '@/utils';
import { CONTRACT_CONFIG } from '@/constants';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const {
    isConnected,
    address,
    coreBalance,
    fnxtBalance,
    chainId,
    loadCoreBalance,
    loadFNXTBalance,
    disconnect
  } = useWalletStore();

  const handleCopyAddress = async () => {
    if (address) {
      await copyToClipboard(address);
    }
  };

  const openBlockExplorer = () => {
    if (address) {
      window.open(`${CONTRACT_CONFIG.NETWORK.blockExplorer}/address/${address}`, '_blank');
    }
  };

  const handleRefreshBalances = async () => {
    await Promise.all([loadCoreBalance(), loadFNXTBalance()]);
  };

  const handleDisconnect = () => {
    disconnect();
    onClose();
  };

  if (!isConnected || !address) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Wallet Details" size="md">
      <div className="space-y-6">
        {/* Wallet Address */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Wallet Address
              </h3>
              <p className="text-lg font-mono text-gray-900 dark:text-gray-100 mt-1">
                {formatAddress(address, 8)}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyAddress}
                leftIcon={<Copy className="w-4 h-4" />}
              >
                Copy
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openBlockExplorer}
                leftIcon={<ExternalLink className="w-4 h-4" />}
              >
                Explorer
              </Button>
            </div>
          </div>
        </Card>

        {/* Network Info */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Network
              </h3>
              <p className="text-lg text-gray-900 dark:text-gray-100 mt-1">
                {CONTRACT_CONFIG.NETWORK.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Chain ID: {chainId}
              </p>
            </div>
            <div className="w-3 h-3 bg-success-500 rounded-full"></div>
          </div>
        </Card>

        {/* Balances */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Balances
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefreshBalances}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">CORE</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(coreBalance, 'CORE')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">FNXT</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {formatCurrency(fnxtBalance, 'FNXT')}
              </span>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex space-x-3">
          <Button
            variant="danger"
            onClick={handleDisconnect}
            className="flex-1"
          >
            Disconnect Wallet
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};