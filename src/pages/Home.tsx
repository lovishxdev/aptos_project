import React, { useState, useEffect } from 'react'
import { Button, Typography, Space, Spin } from 'antd'
import { WalletOutlined, BookOutlined } from '@ant-design/icons'
import WalletConnect from '../components/WalletConnect'
import DiaryForm from '../components/DiaryForm'
import DiaryEntries from '../components/DiaryEntries'
import { useWallet } from '../hooks/useWallet'
import { useDiary } from '../hooks/useDiary'

const { Title, Paragraph } = Typography

const Home: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnected } = useWallet()
  const { entries, loading, addEntry, fetchEntries, initializeDiary } = useDiary()
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (isConnected && account) {
      // Check if diary is initialized and fetch entries
      const checkInitialization = async () => {
        try {
          await fetchEntries()
          setIsInitialized(true)
        } catch (error) {
          console.error('Error checking diary initialization:', error)
        }
      }
      checkInitialization()
    }
  }, [isConnected, account, fetchEntries])

  const handleInitializeDiary = async () => {
    setIsLoading(true)
    try {
      await initializeDiary()
      setIsInitialized(true)
    } catch (error) {
      console.error('Error initializing diary:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddEntry = async (content: string) => {
    setIsLoading(true)
    try {
      await addEntry(content)
    } catch (error) {
      console.error('Error adding entry:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="header-title">
        <BookOutlined style={{ marginRight: '12px', fontSize: '2.5rem' }} />
        ChainJournal
      </div>
      <div className="header-subtitle">
        Your immutable daily diary on the Aptos blockchain
      </div>

      {!isConnected ? (
        <WalletConnect onConnect={connectWallet} />
      ) : !isInitialized ? (
        <div className="wallet-connect">
          <Title level={3} style={{ marginBottom: '16px' }}>
            Initialize Your Diary
          </Title>
          <Paragraph style={{ marginBottom: '24px', color: '#6b7280' }}>
            Set up your immutable diary on the Aptos blockchain. This is a one-time setup.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            onClick={handleInitializeDiary}
            loading={isLoading}
            style={{ minWidth: '200px' }}
          >
            {isLoading ? 'Initializing...' : 'Initialize Diary'}
          </Button>
        </div>
      ) : (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={3} style={{ color: 'white', marginBottom: '8px' }}>
              Welcome, {account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}
            </Title>
            <Button 
              onClick={disconnectWallet}
              icon={<WalletOutlined />}
              style={{ marginBottom: '24px' }}
            >
              Disconnect Wallet
            </Button>
          </div>

          <DiaryForm onSubmit={handleAddEntry} loading={isLoading} />

          {loading ? (
            <div className="loading-spinner">
              <Spin size="large" />
            </div>
          ) : (
            <DiaryEntries entries={entries} />
          )}
        </Space>
      )}
    </div>
  )
}

export default Home
