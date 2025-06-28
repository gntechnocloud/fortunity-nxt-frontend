// src/config/wagmiClient.ts

import { createConfig, http } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

// ✅ Core Testnet Definition
export const coreTestnet = {
  id: 1115,
  name: 'Core Testnet',
  nativeCurrency: {
    name: 'Core',
    symbol: 'tCORE',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.test.btcs.network'],
    },
    public: {
      http: ['https://rpc.test.btcs.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Core Explorer',
      url: 'https://scan.test.btcs.network',
    },
  },
};

// ✅ Ganache (Localhost) Definition
export const ganache = {
  id: 1337, // Ganache default chainId
  name: 'Ganache Local',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Ganache',
      url: '',
    },
  },
};

// ✅ Select Chain Based on ENV
const SELECTED_CHAIN = import.meta.env.VITE_CHAIN === 'ganache' ? ganache : coreTestnet;

// ✅ Create wagmi config
export const wagmiConfig = createConfig({
  connectors: [metaMask()],
  chains: [SELECTED_CHAIN],
  transports: {
    [SELECTED_CHAIN.id]: http(SELECTED_CHAIN.rpcUrls.default.http[0]),
  },
  ssr: false,
});
export default wagmiConfig;