import { useMemo } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { Contract } from 'ethers'
import DiamondABI from '../contracts/FortuneNXTDiamond.json'

// Replace this with your actual deployed Diamond contract address
const DIAMOND_ADDRESS = '0xYourDiamondContractAddressHere'

declare global {
  interface Window {
    ethereum?: any
  }
}

export function useDiamondContract() {
  const { isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()

  return useMemo(() => {
    if (!isConnected || !walletClient || !window.ethereum) return null

    const { ethers } = require('ethers')
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    return new Contract(DIAMOND_ADDRESS, DiamondABI.abi, signer)
  }, [isConnected, walletClient])
}
