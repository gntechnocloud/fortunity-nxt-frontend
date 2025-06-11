// Contract configuration For Mainnet
/* export const CONTRACT_CONFIG = {
  address: process.env.VITE_CONTRACT_ADDRESS || '0x...',
  abi: [], // Will be imported from separate ABI file
  NETWORK: {
    chainId: 1116, // Core Blockchain
    name: 'Core Blockchain',
    rpcUrl: 'https://rpc.coredao.org',
    blockExplorer: 'https://scan.coredao.org',
    nativeCurrency: {
      name: 'CORE',
      symbol: 'CORE',
      decimals: 18,
    },
  },
};
 */
export const CONTRACT_CONFIG = {
  NETWORK: {
    name: 'Core Testnet',
    chainId: 1115, // Core testnet Chain ID
    blockExplorer: 'https://scan.test.btcs.network',
    rpcUrl: 'https://rpc.test.btcs.network',
    nativeCurrency: {
      name: 'Testnet Coin',
      symbol: 'TST',
      decimals: 18,
      address: process.env.VITE_DIAMOND_ADDRESS || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      abi: require('../contracts/FortuneNXTDiamond.json').abi  
    },
   
   // abi: [], // Will be imported from separate ABI file
    // Example ABI import
  
  },
  CONTRACT_ADDRESS: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
  CONTRACT_ABI: require('../contracts/FortuneNXTDiamond.json').abi, // Import ABI from JSON file
  
};
export const FNXT_TOKEN_CONFIG = {
  address: process.env.VITE_FNXT_TOKEN_ADDRESS || '0x...',
  //abi: [], // ERC20 ABI
  decimals: 18,
  symbol: 'FNXT',
  name: 'Fortunity NXT Token',
  abi: require('../contracts/FortunityNXTTOKEN.json').abi, // Import FNXT token ABI from JSON file
};

// API configuration
export const API_CONFIG = {
  baseUrl: process.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  retries: 3,
};

// Slot configuration
export const SLOT_CONFIG = {
  totalSlots: 12,
  prices: [
    '0.01', '0.02', '0.04', '0.08', '0.16', '0.32',
    '0.64', '1.28', '2.56', '5.12', '10.24', '20.48'
  ],
  earnings: {
    matrix: 0.6, // 60%
    level: 0.3,  // 30%
    pool: 0.1,   // 10%
  },
};

// Pool distribution dates
export const POOL_DISTRIBUTION_DATES = [5, 15, 25]; // Days of month

// Matrix configuration
export const MATRIX_CONFIG = {
  width: 2, // 2x2 matrix
  height: 2,
  maxLevels: 12,
};

// Navigation items
export const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: 'Home' },
  { name: 'Slots', href: '/slots', icon: 'Grid3X3' },
  { name: 'Matrix', href: '/matrix', icon: 'Network' },
  { name: 'Referrals', href: '/referrals', icon: 'Users' },
  { name: 'Transactions', href: '/transactions', icon: 'Receipt' },
  { name: 'Pool Income', href: '/pool', icon: 'Coins' },
  { name: 'Profile', href: '/profile', icon: 'User' },
];

// Theme colors
export const THEME_COLORS = {
  primary: '#3b82f6',
  secondary: '#64748b',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#06b6d4',
};

// Local storage keys
export const STORAGE_KEYS = {
  theme: 'fortunity-theme',
  settings: 'fortunity-settings',
  walletConnection: 'fortunity-wallet-connected',
};

// Error messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet first',
  INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
  TRANSACTION_FAILED: 'Transaction failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_SLOT: 'Invalid slot selection',
  SLOT_ALREADY_PURCHASED: 'Slot already purchased',
  UNAUTHORIZED: 'Unauthorized access',
};

// Success messages
export const SUCCESS_MESSAGES = {
  WALLET_CONNECTED: 'Wallet connected successfully',
  TRANSACTION_SUCCESS: 'Transaction completed successfully',
  SLOT_PURCHASED: 'Slot purchased successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
};