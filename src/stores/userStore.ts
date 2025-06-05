import { create } from 'zustand';
import { ethers } from 'ethers';
import { API_CONFIG, CONTRACT_CONFIG/* , ERROR_MESSAGES, SUCCESS_MESSAGES */ } from '@/constants';
import { api, getErrorMessage } from '@/utils';
import type { UserState, ApiResponse, Transaction/* , Slot */ } from '@/types';

interface UserStore extends UserState {
  loadUserData: (address: string, token?: string) => Promise<void>;
  purchaseSlot: (slotId: number, signer: ethers.Signer, token?: string) => Promise<void>;
  loadTransactions: (address: string, token?: string) => Promise<void>;
  loadEarnings: (address: string, token?: string) => Promise<void>;
  loadReferrals: (address: string, token?: string) => Promise<void>;
  loadMatrix: (address: string, token?: string) => Promise<void>;
  loadPoolIncome: (address: string, token?: string) => Promise<void>;
  refreshData: (address: string, token?: string) => Promise<void>;
  clearError: () => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  userProfile: null,
  slots: [],
  earnings: {
    matrix: '0',
    level: '0',
    pool: '0',
    total: '0',
    withdrawn: '0',
    available: '0'
  },
  referrals: {
    direct: 0,
    indirect: 0,
    total: 0,
    activeReferrals: 0
  },
  transactions: [],
  matrix: [],
  poolIncome: [],
  isLoading: false,
  error: null,

  loadUserData: async (address: string, token?: string) => {
    set({ isLoading: true, error: null });

    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await api.get<ApiResponse<any>>(
        `${API_CONFIG.baseUrl}/user/${address}`,
        { headers }
      );

      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch user data');
      }

      const { data } = response;

      set({
        userProfile: data.userProfile,
        slots: data.slots || [],
        earnings: data.earnings || get().earnings,
        referrals: data.referrals || get().referrals,
        transactions: data.transactions || [],
        matrix: data.matrix || [],
        poolIncome: data.poolIncome || [],
        isLoading: false
      });

    } catch (error) {
      set({ 
        error: getErrorMessage(error), 
        isLoading: false 
      });
    }
  },

  purchaseSlot: async (slotId: number, signer: ethers.Signer, token?: string) => {
    set({ isLoading: true, error: null });

    try {
      // 1. Call smart contract purchase function
      const contract = new ethers.Contract(CONTRACT_CONFIG.address, CONTRACT_CONFIG.abi, signer);
      const tx = await contract.purchaseSlot(slotId);
      await tx.wait();

      // 2. Update backend DB to sync purchase
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await api.post<ApiResponse<any>>(
        `${API_CONFIG.baseUrl}/user/${get().userProfile?.id}/purchase-slot`,
        { slotId, transactionHash: tx.hash },
        { headers }
      );

      if (!response.success) {
        throw new Error(response.error || 'Failed to update slot purchase in backend');
      }

      // 3. Refresh user data
      if (get().userProfile?.address) {
        await get().loadUserData(get().userProfile!.address, token);
      }

      set({ isLoading: false });

    } catch (error) {
      set({ 
        error: getErrorMessage(error), 
        isLoading: false 
      });
    }
  },

  loadTransactions: async (address: string, token?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await api.get<ApiResponse<Transaction[]>>(
        `${API_CONFIG.baseUrl}/user/${address}/transactions`,
        { headers }
      );

      if (response.success) {
        set({ transactions: response.data });
      }
    } catch (error) {
      console.error('Failed to load transactions:', error);
    }
  },

  loadEarnings: async (address: string, token?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await api.get<ApiResponse<any>>(
        `${API_CONFIG.baseUrl}/user/${address}/earnings`,
        { headers }
      );

      if (response.success) {
        set({ earnings: response.data });
      }
    } catch (error) {
      console.error('Failed to load earnings:', error);
    }
  },

  loadReferrals: async (address: string, token?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await api.get<ApiResponse<any>>(
        `${API_CONFIG.baseUrl}/user/${address}/referrals`,
        { headers }
      );

      if (response.success) {
        set({ referrals: response.data });
      }
    } catch (error) {
      console.error('Failed to load referrals:', error);
    }
  },

  loadMatrix: async (address: string, token?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await api.get<ApiResponse<any>>(
        `${API_CONFIG.baseUrl}/user/${address}/matrix`,
        { headers }
      );

      if (response.success) {
        set({ matrix: response.data });
      }
    } catch (error) {
      console.error('Failed to load matrix:', error);
    }
  },

  loadPoolIncome: async (address: string, token?: string) => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      const response = await api.get<ApiResponse<any>>(
        `${API_CONFIG.baseUrl}/user/${address}/pool-income`,
        { headers }
      );

      if (response.success) {
        set({ poolIncome: response.data });
      }
    } catch (error) {
      console.error('Failed to load pool income:', error);
    }
  },

  refreshData: async (address: string, token?: string) => {
    await Promise.all([
      get().loadUserData(address, token),
      get().loadTransactions(address, token),
      get().loadEarnings(address, token),
      get().loadReferrals(address, token),
      get().loadMatrix(address, token),
      get().loadPoolIncome(address, token)
    ]);
  },

  clearError: () => set({ error: null }),

  clearUserData: () => set({
    userProfile: null,
    slots: [],
    earnings: {
      matrix: '0',
      level: '0',
      pool: '0',
      total: '0',
      withdrawn: '0',
      available: '0'
    },
    referrals: {
      direct: 0,
      indirect: 0,
      total: 0,
      activeReferrals: 0
    },
    transactions: [],
    matrix: [],
    poolIncome: [],
    error: null
  })
}));