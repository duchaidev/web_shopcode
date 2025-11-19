import { Button, Form, message, Modal, Select } from 'antd'
import { SearchProps } from 'antd/es/input'
import { FC, useEffect, useState } from 'react'
import { Input } from 'antd'
import { getCategoryAPI } from '@/repository/CategoryAPI'
import { useAppSelector } from '@/stores'
import { addTechnologyAPI, updateTechnologyAPI } from '@/repository/Technology'

interface FormAddTechnologyProps {
  form: any
  isModalOpen: boolean
  setIsModalOpen: any
  fetchDataTechnology: any
}

const FormAddTechnology: FC<FormAddTechnologyProps> = ({ form, isModalOpen, setIsModalOpen, fetchDataTechnology }) => {
  const [loading, setLoading] = useState(false)
  const { listAllCategory } = useAppSelector((state) => state.category)

  const handleOk = async () => {
    if (loading) return
    await form.validateFields()
    const values = form.getFieldsValue()
    try {
      setLoading(true)
      if (values.id) {
        await updateTechnologyAPI({
          ...values
        })
        message.success('Sửa công nghệ sử dụng thành công')
        form.resetFields()
      } else {
        await addTechnologyAPI({
          ...values
        })
        message.success('Thêm công nghệ sử dụng thành công')
        form.resetFields()
        fetchDataTechnology()
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || 'Có lỗi xảy ra')
      console.log(err)
    } finally {
      setLoading(false)
      setIsModalOpen(false)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <Modal
        title='Thêm công nghệ sử dụng'
        width={800}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key='submit' loading={loading} type='primary' onClick={handleOk}>
            Xác nhận
          </Button>
        ]}
      >
        <Form form={form} layout='vertical'>
          <div className='flex gap-6 w-full'>
            <Form.Item name='id' hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label='Chọn phân loại'
              rules={[{ required: true, message: 'Vui lòng chọn phân loại!' }]}
              className='w-[35%]'
              name='category_id'
            >
              <Select placeholder='Chọn phân loại' options={listAllCategory} />
            </Form.Item>
            <Form.Item
              label='Tên công nghệ sử dụng'
              rules={[{ required: true, message: 'Vui lòng nhập tên công nghệ sử dụng!' }]}
              name='name'
              className='w-[65%]'
            >
              <Input placeholder='Nhập tên công nghệ sử dụng' />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default FormAddTechnology
