import React, { useState } from 'react'
import { Form, Input, Button, Card, Typography, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Title } = Typography
const { TextArea } = Input

interface DiaryFormProps {
  onSubmit: (content: string) => Promise<void>
  loading: boolean
}

const DiaryForm: React.FC<DiaryFormProps> = ({ onSubmit, loading }) => {
  const [form] = Form.useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: { content: string }) => {
    if (!values.content.trim()) {
      message.error('Please write something in your diary entry!')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(values.content.trim())
      form.resetFields()
      message.success('Diary entry added to blockchain!')
    } catch (error) {
      message.error('Failed to add diary entry. Please try again.')
      console.error('Error submitting diary entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="entry-form">
      <Title level={4} style={{ marginBottom: '16px' }}>
        Write Your Diary Entry
      </Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="content"
          rules={[
            { required: true, message: 'Please write your diary entry!' },
            { min: 10, message: 'Entry must be at least 10 characters long' }
          ]}
        >
          <TextArea
            rows={6}
            placeholder="What happened today? Share your thoughts, experiences, and memories..."
            maxLength={2000}
            showCount
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isSubmitting || loading}
            icon={<PlusOutlined />}
            size="large"
            style={{ minWidth: '150px' }}
          >
            {isSubmitting || loading ? 'Adding to Blockchain...' : 'Add Entry'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default DiaryForm
