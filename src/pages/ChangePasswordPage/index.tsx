import { updatePasswordAPI } from '@/repository/AuthAPI'
import { useAppSelector } from '@/stores'
import { Button, DatePicker, Form, Input, message, Radio } from 'antd'
import React, { useState } from 'react'

const ChangePasswordPage = () => {
  const [form] = Form.useForm()
  const { user } = useAppSelector((state) => state.user)
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: any) => {
    if (!user?.id) {
      return
    }
    if (!values.password) {
      message.error('Vui lòng nhập mật khẩu cũ')
      return
    }
    if (values.newPassword.length < 6) {
      message.error('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }
    if (!values.newPassword) {
      message.error('Vui lòng nhập mật khẩu mới')
      return
    }
    if (!values.reNewPassword) {
      message.error('Vui lòng nhập lại mật khẩu mới')
      return
    }
    if (values.newPassword !== values.reNewPassword) {
      message.error('Mật khẩu xác nhận không trùng khớp')
      return
    }

    try {
      setLoading(true)
      await updatePasswordAPI({
        oldPassword: values.password,
        newPassword: values.newPassword,
        id: user.id
      })
      message.success('Cập nhật mật khẩu thành công')
    } catch (error) {
      message.error('Cập nhật mật khẩu thất bại')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='bgMenuProfile p-8 rounded-lg'>
      <div className='flex flex-col gap-2 pb-8 text-black border-b border-blue1'>
        <span className='font-bold text-[18px]'>Hồ Sơ Của Tôi</span>
        <span className='text-[14px]'>Quản lí thông tin hồ sơ để bảo mật tài khoản</span>
      </div>
      <div className='grid grid-cols-10 mt-6'>
        {/*--------------------------------------Information--------------------------------------*/}
        <div className='col-span-6 border-r border-blue1'>
          <Form
            labelCol={{ span: 4 }}
            form={form}
            wrapperCol={{ span: 14 }}
            layout='horizontal'
            onFinish={onFinish}
            disabled={loading}
            //   initialValues={{ size: componentSize }}
            //   onValuesChange={onFormLayoutChange}
            //   size={componentSize as SizeType}
          >
            <Form.Item label='Họ và tên' name={'fullname'}>
              <span className='font-semibold'>{user?.full_name}</span>
            </Form.Item>
            <Form.Item label='Email'>
              <p className='flex gap-3'>
                <span className='font-semibold'>{user?.email}</span>
                <span className='!underline text-primary cursor-pointer font-semibold'>Gửi mã</span>
              </p>
            </Form.Item>
            <Form.Item label='Số điện thoại'>
              <span className='font-semibold'>{user?.phone || ''}</span>
            </Form.Item>
            <Form.Item label='Mật khẩu' name={'password'}>
              <Input.Password placeholder='Nhập mật khẩu cũ' />
            </Form.Item>
            <Form.Item label='Mật khẩu mới' name={'newPassword'}>
              <Input.Password placeholder='Nhập mật khẩu mới' />
            </Form.Item>
            <Form.Item label='Mật khẩu mới' name={'reNewPassword'}>
              <Input.Password placeholder='Nhập lại mật khẩu mới' />
            </Form.Item>
            {/* <Form.Item label='Mã xác nhận' name={""}>
              <Input placeholder='Nhập mã xác nhận được gửi về gmail' />
            </Form.Item> */}

            <Form.Item className='flex items-center justify-center'>
              <Button type='primary' htmlType='submit' loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/*--------------------------------------Avatar--------------------------------------*/}
        <div className='flex flex-col items-center justify-center col-span-4 gap-6'>
          <div className='border w-44 h-44 border-blue1'>
            <img
              src={
                'https://images.unsplash.com/photo-1707343848873-d6a834b5f9b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              alt='avatar'
              className='object-cover w-full h-full'
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <button className="py-3 px-6 font-semibold text-blue6 border-blue6 border-[2px]">
              Chọn ảnh
            </button>
            <span className="text-[14px] text-gray1">
              Dung lượng file tối đa 3mb <br /> Định dạng: .JPEG, .PNG
            </span>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage
