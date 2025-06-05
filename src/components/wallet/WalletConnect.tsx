import React from 'react';
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react';
import { Button, Badge, Tooltip } from '@/components/ui';
import { useWalletStore } from '@/stores/walletStore';
import { formatAddress, formatCurrency, copyToClipboard } from '@/utils';
import { CONTRACT_CONFIG } from '@/constants';

export const WalletConnect: React.FC = () => {
  const {
    isConnected,
    address,
    coreBalance,
    fnxtBalance,
    isLoading,
    error,
    connectWallet,
    disconnect,
    clearError
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

  if (error) {
    return (
      <div className="flex items-center space-x-2">
        <Badge variant="danger" className="text-xs">
          {error}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearError}
          className="p-1"
        >
          ×
        </Button>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <Button
        onClick={connectWallet}
        isLoading={isLoading}
        leftIcon={<Wallet className="w-4 h-4" />}
        className="bg-primary-600 hover:bg-primary-700"
      >
        {isLoading ? 'Connecting...' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {/* Wallet Info */}
      <div className="hidden md:flex flex-col items-end">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatCurrency(coreBalance, 'CORE')}
          </span>
          <span className="text-xs text-gray-500">|</span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {formatCurrency(fnxtBalance, 'FNXT')}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatAddress(address!)}
          </span>
          <Tooltip content="Copy address">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyAddress}
              className="p-1"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </Tooltip>
          <Tooltip content="View on explorer">
            <Button
              variant="ghost"
              size="sm"
              onClick={openBlockExplorer}
              className="p-1"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-success-500 rounded-full"></div>
        <Badge variant="success" size="sm">
          Connected
        </Badge>
      </div>

      {/* Disconnect Button */}
      <Tooltip content="Disconnect wallet">
        <Button
          variant="outline"
          size="sm"
          onClick={disconnect}
          className="p-2"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </Tooltip>
    </div>
  );
};