import { addCategoryAPI, updateCategoryAPI } from '@/repository/CategoryAPI'
import { Button, Form, message, Modal, Switch, Upload, UploadFile, UploadProps } from 'antd'
import { SearchProps } from 'antd/es/input'
import React, { FC, useState } from 'react'
import { Input } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

interface FormAddCategoryProps {
  form: any
  setFileUrl: any
  setFileImage: any
  isModalOpen: boolean
  setIsModalOpen: any
  fileUrl: string[]
  fileImage: any[]
  fetchDataCategory: () => void
}

const FormAddCategory: FC<FormAddCategoryProps> = ({
  form,
  setFileUrl,
  setFileImage,
  isModalOpen,
  setIsModalOpen,
  fileUrl,
  fileImage,
  fetchDataCategory
}) => {
  const [loading, setLoading] = useState(false)

  const handleChangeFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileImage(newFileList)
    setFileUrl(
      newFileList?.map((item: UploadFile) => {
        const urlWithoutDomain = item.response?.result ? item.response?.result[0]?.url : item.url
        return urlWithoutDomain
      })
    )
  }

  const handleOk = async () => {
    const values = form.getFieldsValue()
    if (!values.name) {
      message.error('Vui lòng nhập tên phân loại')
      return
    }
    if (!fileUrl[0]) {
      message.error('Vui lòng chọn hình ảnh')
      return
    }
    try {
      setLoading(true)
      if (values.id) {
        await updateCategoryAPI({
          id: values.id,
          name: values.name,
          image: fileUrl[0],
          user_id: 1,
          is_popular: values.is_popular ? 1 : 0
        })
        message.success('Sửa phân loại thành công')
        form.resetFields()
        setFileUrl([])
        setFileImage([])
      } else {
        await addCategoryAPI({
          name: values.name,
          image: fileUrl[0],
          user_id: 1
        })
        message.success('Thêm phân loại thành công')
        form.resetFields()
        setFileUrl([])
        setFileImage([])
      }
      fetchDataCategory()
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
        title='Thêm loại sản phẩm'
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
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Form.Item label='Tên loại' name='name'>
            <Input placeholder='Nhập tên loại sản phẩm' />
          </Form.Item>
          <Form.Item label='Hình ảnh' name='image'>
            <Upload
              accept='image/*'
              fileList={fileImage}
              onChange={handleChangeFile}
              listType='picture-card'
              action={`${import.meta.env.VITE_PUBLIC_STORAGE_API}/upload`}
              showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true
              }}
            >
              {fileUrl?.length >= 1 ? null : (
                <div className='flex flex-col gap-1 items-center justify-center'>
                  <UploadOutlined style={{ fontSize: '18px' }} />
                  <span>{fileUrl?.length}/1</span>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item label='Nổi bật' name='is_popular'>
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default FormAddCategory
