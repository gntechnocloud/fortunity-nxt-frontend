// Contract Configuration for Fortunity NXT
// Auto-generated from deployment output

export const CONTRACT_CONFIG = {
  // Main Diamond Contract
  DIAMOND_ADDRESS: '0x0165878A594ca255338adfa4d48449f69242Eb8F',

  // Facet Addresses
  FACETS: {
    ADMIN: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    REGISTRATION: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    PURCHASE: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    MATRIX: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
    LEVEL_INCOME: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
    POOL_INCOME: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
  },

  // Network Configuration
  NETWORK: {
    CHAIN_ID: 31337,
    NAME: 'hardhat',
    RPC_URL: 'http://127.0.0.1:8545',
    CURRENCY: 'ETH'
  },

  // System Addresses
  TREASURY_ADDRESS: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  ADMIN_ADDRESS: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',

  // Slot Configuration
  SLOTS: [
    { id: 1, price: '0.01', poolPercent: 10 },
    { id: 2, price: '0.02', poolPercent: 10 },
    { id: 3, price: '0.04', poolPercent: 10 },
    { id: 4, price: '0.08', poolPercent: 10 },
    { id: 5, price: '0.16', poolPercent: 10 },
    { id: 6, price: '0.32', poolPercent: 10 },
    { id: 7, price: '0.64', poolPercent: 10 },
    { id: 8, price: '1.28', poolPercent: 10 },
    { id: 9, price: '2.56', poolPercent: 10 },
    { id: 10, price: '5.12', poolPercent: 10 },
    { id: 11, price: '10.24', poolPercent: 10 },
    { id: 12, price: '20.48', poolPercent: 10 }
  ],

  // System Constants
  CONSTANTS: {
    ADMIN_FEE_PERCENT: 3,
    MATRIX_INCOME_PERCENT: 75,
    LEVEL_INCOME_PERCENT: 25,
    POOL_EXTRA_PERCENT: 25,
    MAX_PAYOUT_PERCENT: 200,
    MAX_PAYOUT_TIME_DAYS: 90,
    POOL_DISTRIBUTION_DAYS: [5, 15, 25]
  },

  // Function Selectors (for direct calls if needed)
  SELECTORS: {
    // AdminFacet
    emergencyWithdraw: '0x5312ea8e',
    getLevelRequirement: '0x358a7fa2',
    getPoolDistributionDays: '0x2086a59a',
    getSlotInfo: '0xbe20f9ac',
    getTreasury: '0x3b19e84a',
    setTreasury: '0xf0f44260',
    updateSlot: '0xcbd7b19e',

    // RegistrationFacet
    register: '0x4420e486',

    // PurchaseFacet
    purchaseSlot: '0x04c60eae',

    // MatrixFacet
    processMatrixPlacement: '0x6686ff1d',

    // LevelIncomeFacet
    processLevelIncome: '0x9fa71d5a',

    // PoolIncomeFacet
    distributePoolIncome: '0x8808504b'
  }
} as const;

export default CONTRACT_CONFIG;
