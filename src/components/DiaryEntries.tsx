import React from 'react'
import { List, Typography, Empty, Tag } from 'antd'
import { CalendarOutlined, LockOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Title, Paragraph } = Typography

interface DiaryEntry {
  id: string
  content: string
  timestamp: number
  transactionHash?: string
}

interface DiaryEntriesProps {
  entries: DiaryEntry[]
}

const DiaryEntries: React.FC<DiaryEntriesProps> = ({ entries }) => {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <Title level={4}>No diary entries yet</Title>
              <Paragraph>Start writing your first entry above!</Paragraph>
            </div>
          }
        />
      </div>
    )
  }

  return (
    <div>
      <Title level={3} style={{ color: 'white', marginBottom: '16px' }}>
        Your Diary Entries
      </Title>
      <List
        dataSource={entries}
        renderItem={(entry) => (
          <List.Item>
            <div className="diary-entry">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Title level={4} style={{ margin: 0 }}>
                  Entry #{entry.id}
                </Title>
                <Tag icon={<LockOutlined />} color="green">
                  Immutable
                </Tag>
              </div>
              <div className="date">
                <CalendarOutlined style={{ marginRight: '4px' }} />
                {dayjs(entry.timestamp).format('MMMM D, YYYY [at] h:mm A')}
              </div>
              <div className="content">
                {entry.content}
              </div>
              {entry.transactionHash && (
                <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280' }}>
                  TX: {entry.transactionHash.slice(0, 8)}...{entry.transactionHash.slice(-8)}
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default DiaryEntries
