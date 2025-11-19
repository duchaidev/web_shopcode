import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'
import { CopyOutlined } from '@ant-design/icons'
import CopyIcon from '../icons/CopyIcon'
import { useNavigate } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'

const ModalOrder = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: any }) => {
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_MESSAGE_ID
  const [form] = Form.useForm()
  const [loading, setLoading] = React.useState(false)
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCopyToClipboard = (textToCopy: any) => {
    // Sử dụng API clipboard để sao chép nội dung vào clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        message.success(`Đã sao chép`)
      })
      .catch((error) => {
        message.error(`Đã xảy ra lỗi khi sao chép`)
      })
  }

  const handleSendOrder = async () => {
    const values = await form.validateFields()
    const newMessage = `Họ tên: ${values.name}\nSố điện thoại: ${values.phone}\nEmail: ${values.email}\nMục đích sử dụng: ${values.purpose}\nMô tả: ${values.description}`
    try {
      setLoading(true)
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: `Tin nhắn mới từ ${values.name}:\n${newMessage}`
      })
      message.success('Đặt hàng thành công')
      setIsModalOpen(false)
    } catch (error) {
      message.error('Gửi yêu cầu có lỗi, vui lòng liên hệ trực tiếp với chúng tôi')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Modal title='Đặt hàng theo yêu cầu' open={isModalOpen} footer={null} width={800} onCancel={handleCancel}>
      <span className='text-red-400 text-[15px]'>
        Vui lòng để lại thông tin chúng tôi sẽ liên hệ với bạn hoặc bạn có thể liên hệ trực tiếp với thông tin:
      </span>
      <div className='flex flex-col py-2 gap-2'>
        <span className='text-[15px] flex gap-[6px] relative w-max'>
          <span className='font-medium'>Hotline/Zalo:</span> 034.333.5657{' '}
          <span
            className='absolute cursor-pointer p-1 -right-7 hover:bg-gray-100 transition-all rounded-md -top-[3px]'
            onClick={() => {
              handleCopyToClipboard('0343335657')
            }}
          >
            <CopyIcon />
          </span>
        </span>
        <span className='text-[15px] flex gap-[6px] relative w-max'>
          <span className='font-medium'>Email:</span> duchaidev@gmail.com
          <span
            className='absolute cursor-pointer p-1 -right-7 hover:bg-gray-100 transition-all rounded-md -top-[3px]'
            onClick={() => {
              handleCopyToClipboard('duchaidev@gmail.com')
            }}
          >
            <CopyIcon />
          </span>
        </span>
        <span className='text-[15px] flex gap-[6px] relative w-max'>
          <span className='font-medium'>Telegram:</span> @duchaidev
          <span
            className='absolute cursor-pointer p-1 -right-7 hover:bg-gray-100 transition-all rounded-md -top-[3px]'
            onClick={() => {
              handleCopyToClipboard('duchaidev')
            }}
          >
            <CopyIcon />
          </span>
        </span>
      </div>
      <div className='mt-2'>
        <Form name='basic' layout='vertical' form={form}>
          <div className='grid grid-cols-2 gap-x-5'>
            <Form.Item
              label='Họ và tên'
              name='name'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên'
                }
              ]}
            >
              <Input placeholder='Nhập họ và tên' />
            </Form.Item>
            <Form.Item
              label='Số điện thoại'
              name='phone'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại'
                },
                {
                  pattern: /^\d+$/,
                  message: 'Số điện thoại không hợp lệ'
                }
              ]}
            >
              <Input placeholder='Nhập số điện thoại' />
            </Form.Item>
            <Form.Item label='Email' name='email' rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
              <Input placeholder='Nhập email' />
            </Form.Item>
            <Form.Item label='Mục đích sử dụng' name='purpose'>
              <Input placeholder='Mục đích bạn sử dụng sản phẩm đó để làm gì' />
            </Form.Item>
          </div>
          <Form.Item label='Mô tả yêu cầu của bạn' name='description'>
            <TextArea placeholder='Nhập mô tả yêu cầu của bạn' style={{ height: 120 }} />
          </Form.Item>
          <div className='flex items-center justify-center gap-3'>
            <Button onClick={handleCancel}>Huỷ</Button>
            <Button type='primary' onClick={handleSendOrder} loading={loading}>
              Gửi
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalOrder
