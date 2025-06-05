import { create } from 'zustand';
import { ethers } from 'ethers';
import { CONTRACT_CONFIG, FNXT_TOKEN_CONFIG, ERROR_MESSAGES/* , SUCCESS_MESSAGES */ } from '@/constants';
import { storage, STORAGE_KEYS } from '@/utils';
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
      if (!window.ethereum) {
        throw new Error('MetaMask not installed');
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = accounts[0];
      const network = await provider.getNetwork();

      // Check if on Core Blockchain
      if (Number(network.chainId) !== CONTRACT_CONFIG.NETWORK.chainId) {
        await get().switchToCore();
      }

      const coreBalance = await provider.getBalance(address);

      set({
        isConnected: true,
        address,
        provider,
        signer,
        coreBalance: ethers.formatEther(coreBalance),
        chainId: Number(network.chainId),
        isLoading: false
      });

      // Load FNXT balance
      await get().loadFNXTBalance();

      // Save connection state
      storage.set(STORAGE_KEYS.walletConnection(), true);

    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : ERROR_MESSAGES.NETWORK_ERROR, 
        isLoading: false 
      });
    }
  },

  switchToCore: async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${CONTRACT_CONFIG.NETWORK.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${CONTRACT_CONFIG.NETWORK.chainId.toString(16)}`,
            chainName: CONTRACT_CONFIG.NETWORK.name,
            rpcUrls: [CONTRACT_CONFIG.NETWORK.rpcUrl],
            blockExplorerUrls: [CONTRACT_CONFIG.NETWORK.blockExplorer],
            nativeCurrency: CONTRACT_CONFIG.NETWORK.nativeCurrency
          }]
        });
      }
    }
  },

  loadFNXTBalance: async () => {
    try {
      const { signer, address } = get();
      if (!signer || !address) {
        set({ fnxtBalance: '0' });
        return;
      }

      const fnxtContract = new ethers.Contract(
        FNXT_TOKEN_CONFIG.address, 
        FNXT_TOKEN_CONFIG.abi, 
        signer
      );
      const balance = await fnxtContract.balanceOf(address);
      set({ fnxtBalance: ethers.formatEther(balance) });
    } catch (error) {
      console.error('Failed to load FNXT balance:', error);
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
      console.error('Failed to load CORE balance:', error);
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
      error: null
    });
    storage.remove(STORAGE_KEYS.walletConnection());
  },

  clearError: () => set({ error: null })
}));