import GoogleIcon from '@/components/icons/GoogleIcon'
import { Button, Form, Input, Radio, Spin, Typography, message } from 'antd'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './RegisterStyle.scss'
import axios from 'axios'
import { registerAPI } from '@/repository/AuthAPI'

const RegisterPage = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const getImageQR = async (content: any) => {
    const response = await axios.get(`${import.meta.env.VITE_PUBLIC_BANK_V2_API.replace('DUCHAIDEV', content)}`, {
      responseType: 'blob' // Sử dụng responseType là 'blob' để nhận dữ liệu ở dạng Blob
    })

    // Tạo FormData để chứa dữ liệu Blob
    const formData = new FormData()
    formData.append('file', response.data, 'image.png')

    // Gửi dữ liệu Blob lên máy chủ
    const responseUpload: any = await axios.post(`${import.meta.env.VITE_PUBLIC_STORAGE_API}/upload`, formData)
    return responseUpload.data.result[0].url
  }

  function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  function generateString(name: string) {
    const initials = name.match(/\b\w/g) || []
    const sortname = initials.slice(0, 4).join('').toUpperCase() // Lấy ba chữ cái đầu tiên và chuyển thành chữ thường
    const randomNumber = generateRandomNumber(1, 999) // Sinh số ngẫu nhiên từ 100 đến 999

    return sortname + randomNumber
  }

  const handleRegister = async () => {
    const values = form.getFieldsValue()
    if (!values?.fullname) {
      message.error('Vui lòng nhập họ tên')
      return
    }
    if (!values?.email) {
      message.error('Vui lòng nhập Email')
      return
    }
    if (values?.password !== values?.repassword) {
      message.error('Mật khẩu nhập lại không trùng khớp')
      return
    }
    if (values?.password.length < 6) {
      message.error('Mật khẩu phải lớn hơn 6 ký tự')
      return
    }
    try {
      setLoading(true)
      const fullname = generateString(values.fullname)
      let imageQrLink = await getImageQR(fullname)
      await registerAPI({
        full_name: values?.fullname,
        email: values?.email,
        password: values?.password,
        qr_admin: [
          {
            nameAccout: 'Le Duc Hai',
            nameBank: 'Vietcombank',
            numberAccout: '9343335657',
            qrcode: imageQrLink,
            money: 10000,
            content: fullname
          }
        ]
      })
      message.success('Đăng ký thành công')
      navigate('/dang-nhap')
    } catch (error) {
      message.error('Đăng ký thất bại')
    }
    setLoading(false)
  }

  return (
    <Spin spinning={loading}>
      <div className='flex min-w-[420px] flex-col justify-center items-center px-5 py-3 gap-2 register'>
        <NavLink to={'/'}>
          <img src='/logo.svg' alt='logo' className='w-12 h-12' />
        </NavLink>
        <Typography.Title level={3}>Đăng ký</Typography.Title>
        <Form form={form} className='w-full' layout='vertical' onFinish={handleRegister}>
          <Form.Item label='Họ và tên' name={'fullname'}>
            <Input placeholder='Vui lòng nhập họ và tên' size='large' autoFocus />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input placeholder='Vui lòng nhập email' size='large' />
          </Form.Item>
          <Form.Item label='Mật khẩu' name='password'>
            <Input.Password placeholder='Vui lòng nhập mật khẩu' size='large' />
          </Form.Item>
          <Form.Item label='Xác nhận mật khẩu' name='repassword'>
            <Input.Password placeholder='Vui lòng nhập lại mật khẩu' size='large' />
          </Form.Item>
          <Form.Item>
            <div className='flex items-center justify-center gap-4 flex-col'>
              <Button type='primary' className='w-full' size='large' htmlType='submit'>
                Đăng ký
              </Button>
              <Button type='default' className='w-full flex gap-3 justify-center items-center' size='large'>
                <GoogleIcon />
                Đăng ký với Google
              </Button>
            </div>
          </Form.Item>
        </Form>
        <span className='text-sm'>
          Bạn đã có tài khoản?{' '}
          <NavLink className={'font-semibold'} to={'/dang-nhap'}>
            Đăng nhập
          </NavLink>
        </span>
      </div>
    </Spin>
  )
}

export default RegisterPage
