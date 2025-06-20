import { ethers } from "ethers";
import DiamondAbi from "../abi/FortuneNXTDiamond.json";

export function getDiamondContract(chainId: number, signerOrProvider: ethers.Signer | ethers.Provider) {
  const addressMap: Record<number, string> = {
    31337: import.meta.env.VITE_DIAMOND_ADDRESS_31337, // Localhost
    11155111: import.meta.env.VITE_DIAMOND_ADDRESS_11155111, // Sepolia
    // Add more networks here if needed
  };

  const address = addressMap[chainId];
  if (!address) {
    throw new Error(`No Diamond address found for chain ID ${chainId}`);
  }

  return new ethers.Contract(address, DiamondAbi, signerOrProvider);
}
// This function retrieves the Diamond contract instance for a given chain ID and signer/provider.
// It uses a mapping of chain IDs to contract addresses and returns a new ethers.Contract instance.