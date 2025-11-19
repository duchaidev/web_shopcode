import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/stores'
import { setUser } from '@/stores/UserSlice'
import { Spin } from 'antd'
import dayjs from 'dayjs'
import { deleteCookie, getCookie, setCookie } from '@/ultils/Cookie'
import { refreshTokenAPI } from '@/repository/AuthAPI'

const AuthCheck = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.user)
  const parentRoute = location.pathname.split('/')[1]
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const getUserInfo = async (accessToken: string, refreshToken: string) => {
    try {
      setLoading(true)
      const res: any = await refreshTokenAPI({ accessToken, refreshToken })

      if (res?.data?.user) {
        dispatch(
          setUser({
            ...res?.data?.user
          })
        )
        const expiresAt = dayjs().add(3, 'day').startOf('day')
        setCookie('accessToken', res?.data?.token?.accessToken, expiresAt)
        setCookie('refreshToken', res?.data?.token?.refreshToken, expiresAt)
      }
    } catch (error: any) {
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      // window.location.href = '/login'
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    const refreshToken = getCookie('refreshToken')
    if (accessToken && refreshToken) {
      getUserInfo(accessToken, refreshToken)
    }
  }, [])

  useEffect(() => {
    const accessToken = getCookie('accessToken')
    const refreshToken = getCookie('refreshToken')

    if (parentRoute === 'dang-nhap' && accessToken && refreshToken) {
      navigate('/')
    }
  }, [parentRoute, user])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return null
}

export default AuthCheck
