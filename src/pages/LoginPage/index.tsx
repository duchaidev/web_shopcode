import GoogleIcon from '@/components/icons/GoogleIcon'
import { loginAPI } from '@/repository/AuthAPI'
import { useAppDispatch } from '@/stores'
import { setTokenUser, setUser } from '@/stores/UserSlice'
import { setCookie } from '@/ultils/Cookie'
import { Button, Form, Input, Radio, Spin, Typography, message } from 'antd'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { NavLink, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(false)
  const [form] = Form.useForm()

  const handleLogin = async () => {
    const values = form.getFieldsValue()
    console.log(values)
    setLoading(true)
    try {
      const response: any = await loginAPI(values)
      dispatch(
        setUser({
          ...response?.data?.user
        })
      )
      if (response?.data?.token) {
        const expiresAt = dayjs().add(3, 'day').startOf('day')
        dispatch(setTokenUser(response?.data?.token))
        setCookie('accessToken', response?.data?.token?.accessToken, expiresAt)
        setCookie('refreshToken', response?.data?.token?.refreshToken, expiresAt)
      }

      navigate('/')
      message.success('Đăng nhập thành công')
    } catch (error) {
      console.log(error)
      message.error('Sai email hoặc mật khẩu')
    }
    setLoading(false)
  }
  return (
    <Spin spinning={loading}>
      <div className='flex min-w-[420px] flex-col justify-center items-center py-3 px-5 gap-2'>
        <NavLink to={'/'}>
          <img src='/logo.svg' alt='logo' className='w-12 h-12' />
        </NavLink>
        <Typography.Title level={3}>Đăng nhập</Typography.Title>
        <Form form={form} className='w-full' layout='vertical' onFinish={handleLogin}>
          <Form.Item
            label='Email'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email'
              },
              {
                type: 'email',
                message: 'Email không hợp lệ'
              }
            ]}
            name={'email'}
          >
            <Input placeholder='Vui lòng nhập email' size='large' autoFocus />
          </Form.Item>
          <Form.Item
            label='Mật khẩu'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu'
              },
              {
                min: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự'
              }
            ]}
            name={'password'}
          >
            <Input.Password placeholder='Vui lòng nhập mật khẩu' size='large' />
          </Form.Item>
          <Form.Item>
            <div className='flex items-center justify-center gap-4 flex-col'>
              <Button type='primary' className='w-full' size='large' htmlType='submit'>
                Đăng nhập
              </Button>
              <Button type='default' className='w-full flex gap-3 justify-center items-center' size='large'>
                <GoogleIcon />
                Đăng nhập với Google
              </Button>
            </div>
          </Form.Item>
        </Form>
        <span className='text-sm'>
          Bạn chưa có tài khoản?{' '}
          <NavLink className={'font-semibold'} to={'/dang-ky'}>
            Đăng ký
          </NavLink>
        </span>
      </div>
    </Spin>
  )
}

export default LoginPage
