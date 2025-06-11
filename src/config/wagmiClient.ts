import { createConfig, http } from 'wagmi';
import { metaMask } from 'wagmi/connectors';

// Define Core Testnet chain (Sepolia or any other)
// Define Core Testnet chain (Sepolia or any other)
export const coreTestnet = {
  id: 1115, // Replace with correct chainId for Core Testnet
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
// Create wagmi config
export const wagmiConfig = createConfig({
  connectors: [
    metaMask()
  ],
  chains: [coreTestnet],
  transports: {
    [coreTestnet.id]: http(coreTestnet.rpcUrls.default.http[0]),
  },
  ssr: false,
});
