import React from 'react'
import { Button, Card, Typography } from 'antd'
import { WalletOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

interface WalletConnectProps {
  onConnect: () => void
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  return (
    <Card className="wallet-connect">
      <WalletOutlined style={{ fontSize: '48px', color: '#6366f1', marginBottom: '16px' }} />
      <Title level={3} style={{ marginBottom: '16px' }}>
        Connect Your Wallet
      </Title>
      <Paragraph style={{ marginBottom: '24px', color: '#6b7280' }}>
        Connect your Aptos wallet to start writing your immutable diary entries on the blockchain.
      </Paragraph>
      <Button 
        type="primary" 
        size="large" 
        onClick={onConnect}
        icon={<WalletOutlined />}
        style={{ minWidth: '200px' }}
      >
        Connect Wallet
      </Button>
    </Card>
  )
}

export default WalletConnect
