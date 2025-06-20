import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';

// Utility function to merge Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency values
export function formatCurrency(
  amount: string | number,
  currency: string = 'CORE',
  decimals: number = 4
): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${num.toFixed(decimals)} ${currency}`;
}

// Format large numbers with K, M, B suffixes
export function formatNumber(num: number): string {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
}

// Format wallet address
export function formatAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

// Format date
export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  return format(new Date(date), formatStr);
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

// Calculate percentage
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return (value / total) * 100;
}

// Generate referral link
export function generateReferralLink(address: string, baseUrl: string = window.location.origin): string {
  return `${baseUrl}/register?ref=${address}`;
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle function
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Local storage helpers
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },
};
// ...other exports
// Storage keys for localStorage
export const STORAGE_KEYS = {
  settings: () => 'app-settings',
  theme: () => 'app-theme',
  walletConnection: () => 'wallet-connection',
  userProfile: () => 'user-profile',
  transactions: () => 'user-transactions',
  referrals: () => 'user-referrals',
  slots: () => 'user-slots',
  matrix: () => 'user-matrix',
  pool: () => 'user-pool',
  notifications: () => 'user-notifications' 
  // Add more keys as needed
  // Add other keys here as needed, e.g.:
  // userData: () => 'user-data',
};
// ...other exports

// Navigation items for sidebar/menu
/* export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: 'Home' },
  { name: 'Slots', href: '/slots', icon: 'Grid3X3' },
  { name: 'Matrix', href: '/matrix', icon: 'Network' },
  { name: 'Referrals', href: '/referrals', icon: 'Users' },
  { name: 'Transactions', href: '/transactions', icon: 'Receipt' },
  { name: 'Pool Income', href: '/pool', icon: 'Coins' },
  { name: 'Profile', href: '/profile', icon: 'User' },
]; */

export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Slots', path: '/slots' },
  { name: 'Matrix', path: '/matrix' },
  { name: 'Referrals', path: '/referrals' },
  { name: 'Transactions', path: '/transactions' },
  { name: 'Pool Income', path: '/pool' },
  { name: 'Profile', path: '/profile' },
];

// Constants for the application
// API helpers
export const api = {
  get: async <T>(url: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  post: async <T>(url: string, data?: any, options?: RequestInit): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};

// Error handling
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

// Matrix position calculator
export function calculateMatrixPosition(position: number): { level: number; index: number } {
  let level = 1;
  let totalPositions = 0;
  let positionsInLevel = 2; // Start with 2 positions in level 1

  while (totalPositions + positionsInLevel < position) {
    totalPositions += positionsInLevel;
    level++;
    positionsInLevel *= 2; // Each level doubles the positions
  }

  const index = position - totalPositions - 1;
  return { level, index };
}

// Slot price calculator
export function getSlotPrice(slotId: number): string {
  const basePrice = 0.01;
  return (basePrice * Math.pow(2, slotId - 1)).toFixed(2);
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}