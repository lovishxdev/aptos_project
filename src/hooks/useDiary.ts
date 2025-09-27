import { useState, useCallback } from 'react'
import { Aptos, AptosConfig, Network, Account, Ed25519PrivateKey } from '@aptos-labs/ts-sdk'

interface DiaryEntry {
  id: string
  content: string
  timestamp: number
  transactionHash?: string
}

interface UseDiaryReturn {
  entries: DiaryEntry[]
  loading: boolean
  addEntry: (content: string) => Promise<void>
  fetchEntries: () => Promise<void>
  initializeDiary: () => Promise<void>
}

export const useDiary = (): UseDiaryReturn => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(false)

  // Initialize Aptos client
  const aptosConfig = new AptosConfig({ network: Network.TESTNET })
  const aptos = new Aptos(aptosConfig)

  const initializeDiary = useCallback(async () => {
    try {
      setLoading(true)
      
      // Check if wallet is connected
      if (typeof window !== 'undefined' && (window as any).aptos) {
        const response = await (window as any).aptos.connect()
        if (response) {
          // Initialize the diary contract for the user
          const transaction = await aptos.transaction.build.simple({
            sender: response.address,
            data: {
              function: "0x123::diary::initialize_diary",
              arguments: []
            }
          })
          
          const committedTransaction = await aptos.signAndSubmitTransaction({
            signer: response,
            transaction
          })
          
          console.log('Diary initialized:', committedTransaction.hash)
        }
      } else {
        // For development, simulate initialization
        console.log('Mock diary initialization for development')
      }
    } catch (error) {
      console.error('Error initializing diary:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [aptos])

  const addEntry = useCallback(async (content: string) => {
    try {
      setLoading(true)
      
      if (typeof window !== 'undefined' && (window as any).aptos) {
        const response = await (window as any).aptos.connect()
        if (response) {
          // Add entry to the blockchain
          const transaction = await aptos.transaction.build.simple({
            sender: response.address,
            data: {
              function: "0x123::diary::add_entry",
              arguments: [content]
            }
          })
          
          const committedTransaction = await aptos.signAndSubmitTransaction({
            signer: response,
            transaction
          })
          
          // Create entry object with real transaction hash
          const newEntry: DiaryEntry = {
            id: Date.now().toString(),
            content,
            timestamp: Date.now(),
            transactionHash: committedTransaction.hash
          }
          
          setEntries(prev => [newEntry, ...prev])
          
          // Store in localStorage for persistence
          const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]')
          storedEntries.unshift(newEntry)
          localStorage.setItem('diaryEntries', JSON.stringify(storedEntries))
        }
      } else {
        // For development, simulate adding an entry
        const newEntry: DiaryEntry = {
          id: Date.now().toString(),
          content,
          timestamp: Date.now(),
          transactionHash: `0x${Math.random().toString(16).substr(2, 64)}` // Mock transaction hash
        }
        
        // Simulate blockchain transaction delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        setEntries(prev => [newEntry, ...prev])
        
        // Store in localStorage for persistence
        const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]')
        storedEntries.unshift(newEntry)
        localStorage.setItem('diaryEntries', JSON.stringify(storedEntries))
      }
      
    } catch (error) {
      console.error('Error adding diary entry:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [aptos])

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true)
      
      if (typeof window !== 'undefined' && (window as any).aptos) {
        const response = await (window as any).aptos.connect()
        if (response) {
          // Fetch entries from the blockchain
          const entryCount = await aptos.view({
            payload: {
              function: "0x123::diary::get_entry_count",
              arguments: [response.address]
            }
          })
          
          // For now, we'll use localStorage as a fallback
          // In a full implementation, we'd fetch each entry from the blockchain
          const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]')
          setEntries(storedEntries)
        }
      } else {
        // For development, fetch from localStorage
        const storedEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]')
        setEntries(storedEntries)
      }
      
    } catch (error) {
      console.error('Error fetching diary entries:', error)
    } finally {
      setLoading(false)
    }
  }, [aptos])

  return {
    entries,
    loading,
    addEntry,
    fetchEntries,
    initializeDiary
  }
}
