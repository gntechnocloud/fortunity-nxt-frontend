// Global types for Fortunity NXT
export interface User {
  id: string;
  address: string;
  registeredAt: string;
  sponsor?: string;
  referralLink: string;
  level: number;
  isActive: boolean;
  totalInvestmentUsd: number; // <-- ✅ add this line
}

export interface Slot {
  id: number;
  purchased: boolean;
  purchasedAt?: string;
  earnings: string;
  price: string;
  isActive: boolean;
  priceCore: number; // Price in CORE
  rebirth?: {
    count: number;
    lastRebirthAt?: string;
  };
  
}

export interface Earnings {
  matrix: string;
  level: string;
  pool: string;
  total: string;
  withdrawn: string;
  available: string;
}

export interface Referrals {
  direct: number;
  indirect: number;
  total: number;
  activeReferrals: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'earnings' | 'purchase' | 'rebirth';
  amount: string;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  hash?: string;
  description: string;
  createdAt: string | Date; // ✅ Add this line
}

export interface MatrixPosition {
  level: number;
  position: number;
  upline?: string;
  downlines: string[];
  isComplete: boolean;
}

export interface PoolIncome {
  poolId: number;
  amount: string;
  distributionDate: string;
  participants: number;
  userShare: string;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  provider: any;
  signer: any;
  coreBalance: string;
  fnxtBalance: string;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserState {
  userProfile: User | null;
  slots: Slot[];
  earnings: Earnings;
  referrals: Referrals;
  transactions: Transaction[];
  matrix: MatrixPosition[];
  poolIncome: PoolIncome[];
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface MatrixNode {
  wallet: string;
  level: 1 | 2;
  slotId: number;
}
export interface ActivityLog {
  date: string;
  message: string;
}

export type Theme = 'light' | 'dark';

export interface AppSettings {
  theme: Theme;
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}