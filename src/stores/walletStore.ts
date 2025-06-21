import { create } from 'zustand';
import { ethers } from 'ethers';
import {
  CONTRACT_CONFIG,
  ERROR_MESSAGES
} from '@/constants';
import { storage, STORAGE_KEYS } from '@/utils';
import { useUserStore } from './userStore';
import type { WalletState } from '@/types';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletStore extends WalletState {
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  switchToCore: () => Promise<void>;
  loadFNXTBalance: () => Promise<void>;
  loadCoreBalance: () => Promise<void>;
  clearError: () => void;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
  isConnected: false,
  address: null,
  provider: null,
  signer: null,
  coreBalance: '0',
  fnxtBalance: '0',
  chainId: null,
  isLoading: false,
  error: null,

  connectWallet: async () => {
    set({ isLoading: true, error: null });

    try {
      const ethereum = window.ethereum;
      if (!ethereum || !ethereum.request) {
        throw new Error('MetaMask is not installed.');
      }

      const provider = new ethers.BrowserProvider(ethereum);
      const network = await provider.getNetwork();

      if (Number(network.chainId) !== CONTRACT_CONFIG.NETWORK.chainId) {
        await get().switchToCore();
        return;
      }

      const accounts: string[] = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(address);

      set({
        isConnected: true,
        address,
        provider,
        signer,
        coreBalance: ethers.formatEther(balance),
        chainId: Number(network.chainId),
        isLoading: false,
        error: null,
      });

      await get().loadFNXTBalance();
      storage.set(STORAGE_KEYS.walletConnection(), true);
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      set({
        error: error.message || ERROR_MESSAGES.NETWORK_ERROR,
        isLoading: false,
        isConnected: false,
      });
    }
  },

  switchToCore: async () => {
    try {
      const ethereum = window.ethereum;
      if (!ethereum) throw new Error('Ethereum provider not found');

      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${CONTRACT_CONFIG.NETWORK.chainId.toString(16)}`,
          },
        ],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${CONTRACT_CONFIG.NETWORK.chainId.toString(16)}`,
                chainName: CONTRACT_CONFIG.NETWORK.name,
                rpcUrls: [CONTRACT_CONFIG.NETWORK.rpcUrl],
                blockExplorerUrls: [CONTRACT_CONFIG.NETWORK.blockExplorer],
                nativeCurrency: CONTRACT_CONFIG.NETWORK.nativeCurrency,
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add Core network:', addError);
        }
      } else {
        console.error('Failed to switch network:', error);
      }
    }
  },

  loadFNXTBalance: async () => {
    try {
      const { userProfile } = useUserStore.getState();
      const invested = userProfile?.totalInvestmentUsd ?? 0;
      const mockBalance = (invested / 0.1).toFixed(2);
      set({ fnxtBalance: mockBalance });
    } catch (error) {
      console.error('Error loading FNXT balance:', error);
      set({ fnxtBalance: '0' });
    }
  },

  loadCoreBalance: async () => {
    try {
      const { provider, address } = get();
      if (!provider || !address) return;

      const balance = await provider.getBalance(address);
      set({ coreBalance: ethers.formatEther(balance) });
    } catch (error) {
      console.error('Error loading CORE balance:', error);
    }
  },

  disconnect: () => {
    set({
      isConnected: false,
      address: null,
      provider: null,
      signer: null,
      coreBalance: '0',
      fnxtBalance: '0',
      chainId: null,
      error: null,
    });
    storage.remove(STORAGE_KEYS.walletConnection());
  },

  clearError: () => {
    set({ error: null });
  },
}));
// Automatically load balances on mount