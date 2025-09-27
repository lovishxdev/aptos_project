import { useState, useEffect } from 'react'
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

interface Account {
  address: string
  publicKey: string
}

interface UseWalletReturn {
  account: Account | null
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

export const useWallet = (): UseWalletReturn => {
  const [account, setAccount] = useState<Account | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Initialize Aptos client
  const aptosConfig = new AptosConfig({ network: Network.TESTNET })
  const aptos = new Aptos(aptosConfig)

  const connectWallet = async () => {
    try {
      // Check if wallet is available
      if (typeof window !== 'undefined' && (window as any).aptos) {
        const response = await (window as any).aptos.connect()
        
        if (response) {
          const accountData = {
            address: response.address,
            publicKey: response.publicKey
          }
          
          setAccount(accountData)
          setIsConnected(true)
          
          // Store connection state in localStorage
          localStorage.setItem('walletConnected', 'true')
          localStorage.setItem('walletAddress', response.address)
        }
      } else {
        // For development/testing, create a mock account
        const mockAccount = {
          address: '0x1234567890abcdef1234567890abcdef12345678',
          publicKey: 'mock-public-key'
        }
        
        setAccount(mockAccount)
        setIsConnected(true)
        
        localStorage.setItem('walletConnected', 'true')
        localStorage.setItem('walletAddress', mockAccount.address)
        
        console.log('Using mock wallet for development')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
      throw error
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
  }

  // Check for existing connection on mount
  useEffect(() => {
    const isWalletConnected = localStorage.getItem('walletConnected') === 'true'
    const walletAddress = localStorage.getItem('walletAddress')
    
    if (isWalletConnected && walletAddress) {
      // For development, use mock data
      const mockAccount = {
        address: walletAddress,
        publicKey: 'mock-public-key'
      }
      
      setAccount(mockAccount)
      setIsConnected(true)
    }
  }, [])

  return {
    account,
    isConnected,
    connectWallet,
    disconnectWallet
  }
}
