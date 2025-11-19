import { useAppSelector } from '@/stores'
import { SEX } from '@/ultils/constant/sex'
import { Button, DatePicker, Form, Image, Input, message, Radio, Select, Upload, UploadFile, UploadProps } from 'antd'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { updateUserAPI } from '@/repository/UserAPI'
import { areObjectsEqual } from '@/ultils/function'
import { UploadOutlined } from '@ant-design/icons'
import './profilePage.scss'

const ProfilePage = () => {
  const [form] = Form.useForm()
  const url = import.meta.env.VITE_PUBLIC_STORAGE_API
  const { user } = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [fileImage, setFileImage] = useState<any[]>([])
  const [file, setFile] = useState<any>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    form.setFieldsValue({
      full_name: user?.full_name,
      email: user?.email,
      phone: user?.phone,
      birthday: user?.birthday ? dayjs(user?.birthday) : null,
      id: user?.id,
      sex: +user?.sex
    })
    setFile(user?.avatar ? [user?.avatar] : [])
    setFileImage([
      {
        url: user?.avatar ? url + user?.avatar : ''
      }
    ])
  }, [user])

  const onFinish = async (values: any) => {
    if (
      areObjectsEqual(
        {
          ...values,
          birthday: values.birthday ? dayjs(values.birthday)?.format('YYYY-MM-DDTHH:mm:ss') : '',
          avatar: file[0] ? file[0] : ''
        },
        {
          full_name: user?.full_name,
          email: user?.email,
          phone: user?.phone,
          birthday: user?.birthday ? dayjs(user?.birthday)?.format('YYYY-MM-DDTHH:mm:ss') : '',
          id: user?.id,
          sex: +user?.sex,
          avatar: user?.avatar
        }
      )
    ) {
      message.warning('Bạn không thay đổi thông tin nào!!!')
      return
    }
    if (user?.id) {
      setLoading(true)
      try {
        await updateUserAPI({
          ...values,
          birthday: values.birthday ? dayjs(values.birthday)?.format('YYYY-MM-DDTHH:mm:ss') : '',
          id: user.id,
          avatar: file[0] || ''
        })
        message.success('Cập nhật thông tin thành công')
      } catch (error) {
        message.error('Cập nhật thông tin thất bại')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleChangeFile: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileImage(newFileList)
    setFile(
      newFileList?.map((item: UploadFile) => {
        const urlWithoutDomain = item.response?.result ? item.response?.result[0]?.url : item.url
        return urlWithoutDomain
      })
    )
  }
  const handlePreview = async () => {
    setPreviewImage(url + file[0])
    setPreviewOpen(true)
  }

  return (
    <div className='p-8 bgMenuProfile rounded-xl'>
      <div className='flex flex-col gap-2 pb-8 text-black border-b border-blue1'>
        <span className='font-bold text-[18px]'>Hồ Sơ Của Tôi</span>
        <span className='text-[14px]'>Quản lí thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className='grid grid-cols-10 mt-6'>
        {/*--------------------------------------Information--------------------------------------*/}
        <div className='col-span-6 border-r border-blue1'>
          <Form
            disabled={loading}
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout='horizontal'
            onFinish={onFinish}
            //   initialValues={{ size: componentSize }}
            //   onValuesChange={onFormLayoutChange}
            //   size={componentSize as SizeType}
          >
            <Form.Item label='Email' name={'email'}>
              <span>{user?.email}</span>
            </Form.Item>
            <Form.Item label='Họ và tên' name={'id'} hidden>
              <Input placeholder='Nhập họ tên' />
            </Form.Item>
            <Form.Item label='Họ và tên' name={'full_name'}>
              <Input placeholder='Nhập họ tên' />
            </Form.Item>
            <Form.Item label='Số điện thoại' name={'phone'}>
              <Input placeholder='Nhập số điện thoại' />
            </Form.Item>
            <Form.Item label='Ngày sinh' name={'birthday'}>
              <DatePicker style={{ width: '100%' }} placeholder='Ngày/tháng/năm' format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item label='Giới tính' name={'sex'}>
              <Radio.Group>
                <Radio value={SEX.MALE}> Nam </Radio>
                <Radio value={SEX.FEMALE}> Nữ </Radio>
                <Radio value={SEX.OTHER}> Khác </Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item className='flex items-center justify-center'>
              <Button type='primary' htmlType='submit' loading={loading}>
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/*--------------------------------------Avatar--------------------------------------*/}
        <div className='flex flex-col items-center justify-center col-span-4 gap-6 customImage'>
          {/* <div className='border w-44 h-44 rounded-lg'>
            <img src={'./avtdefault.jg'} alt='avatar' className='object-cover rounded-lg w-full h-full' />
          </div> */}
          <div>
            <Upload
              accept='image/*'
              fileList={fileImage}
              onChange={handleChangeFile}
              listType='picture-card'
              action={`${url}/upload`}
              onPreview={handlePreview}
            >
              {file?.length == 1 ? null : (
                <div className='flex flex-col gap-1 items-center justify-center'>
                  <UploadOutlined style={{ fontSize: '18px' }} />
                  <span>{file?.length}/1</span>
                </div>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage('')
                }}
                src={previewImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
