import { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import { getDiamondContract } from "../utils/contract";
import { useWeb3ModalProvider, useWeb3ModalAccount } from "@web3modal/ethers/react";

export function useDiamondContract() {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, chainId } = useWeb3ModalAccount();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    async function initContract() {
      if (!walletProvider || !isConnected || !chainId) return;

      const browserProvider = new ethers.BrowserProvider(walletProvider);
      const signer = await browserProvider.getSigner();
      try {
        const instance = getDiamondContract(chainId, signer);
        setContract(instance);
      } catch (err) {
        console.error("❌ Error loading Diamond contract:", err);
        setContract(null);
      }
    }

    initContract();
  }, [walletProvider, isConnected, chainId]);

  return contract;
}
