import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import HouseSolidIcon from '../icons/HouseSolidIcon'
import PhoneIcon from '../icons/PhoneIcon'
import EmailIcon from '../icons/EmailIcon'
import OclockIcon from '../icons/OclockIcon'
import TelegramIcon from '../icons/TelegramIcon'
import { ConfigProvider, Input, message, Select } from 'antd'
import { locales } from '@/i18n/i18n'
import { getCookie, setCookie } from '@/ultils/Cookie'
import i18next from 'i18next'
import dayjs from 'dayjs'
import axios from 'axios'

const { Search } = Input

const Footer = () => {
  const [lng, setlng] = useState('')
  const [loading, setLoading] = useState(false)
  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_TOKEN
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_MESSAGE_ID

  const handleLanguageChange = (lng: any) => {
    setlng(lng)
    const expiresAt = dayjs().add(500, 'day').startOf('day')
    setCookie('seasoftservice', lng, expiresAt)
    i18next.changeLanguage(lng)
  }

  useEffect(() => {
    const lang = getCookie('seasoftservice')
    if (lang) {
      setlng(lang)
    }
  }, [])

  const handleSendOrder = async (value: any) => {
    if (!value) {
      message.error('Vui lòng nhập số điện thoại hoặc email')
      return
    }
    const newMessage = `Số điện thoại/Email: ${value}`
    try {
      setLoading(true)
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text: `Tin nhắn mới để lại thông tin email hoặc số điện thoại:\n${newMessage}`
      })
      message.success('Gửi yêu cầu thành công!')
    } catch (error) {
      message.error('Gửi yêu cầu có lỗi, vui lòng liên hệ trực tiếp với chúng tôi')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-12'>
      <div className='bg-[#059473] text-white py-16 px-[10%] flex items-center justify-between'>
        <div className='flex flex-col gap-3'>
          <span className='font-bold text-2xl'>Gửi yêu cầu</span>
          <span className='font-normal text-[15px]'>
            Để lại mail hoặc số điện thoại chúng tôi sẽ liên hệ lại với bạn
          </span>
        </div>
        <div className='w-[500px] buttonSendFooter'>
          <Search
            placeholder='Nhập email hoặc số điện thoại'
            enterButton={<span className='font-semibold'>Gửi yêu cầu</span>}
            size='large'
            loading={loading}
            onSearch={(value) => {
              handleSendOrder(value)
            }}
          />
        </div>
      </div>
      <div className='bg-[#ffffff] h-[350px] border-t px-[10%] py-8 text-black'>
        <div className='grid grid-cols-3 gap-10'>
          <div>
            <div className=' flex items-center  gap-3'>
              <NavLink to={'/'}>
                <img src='/logo.png' className='h-[40px]' alt='logo' />
              </NavLink>
              <span className='font-bold text-xl uppercase'>ShopWeb</span>
            </div>
            <div className='text-[15px] mt-3'>Nơi mua sắm website uy tín, chất lượng, giá rẻ hàng đầu Việt Nam</div>
            <div className='text-[15px] mt-4 flex items-center gap-4'>
              <span className='font-medium'>
                <HouseSolidIcon />
              </span>{' '}
              Lê Thanh Nghị, Hai Bà Trưng, Hà Nội
            </div>
            <div className='text-[15px] mt-4 flex items-center gap-4'>
              <span className='font-medium'>
                <EmailIcon />
              </span>{' '}
              duchaidev@gmail.com
            </div>
            <div className='text-[15px] mt-4 flex items-center gap-4'>
              <span className='font-medium'>
                <PhoneIcon />
              </span>{' '}
              034.333.5657
            </div>
            <div className='text-[15px] mt-4 flex items-center gap-4'>
              <span className='font-medium'>
                <TelegramIcon />
              </span>{' '}
              @duchaidev
            </div>
            <div className='text-[15px] mt-4 flex items-center gap-4'>
              <span className='font-medium'>
                <OclockIcon />
              </span>{' '}
              8:00 - 24:00
            </div>
          </div>
          {/* <div>
            <div className='text-2xl font-bold mb-5'>Thông tin</div>
            <div className='flex flex-col gap-4'>
              <div className='text-[15px] cursor-pointer'>Về chúng tôi</div>
              <div className='text-[15px]'>Số điện thoại: 0909 090 090</div>
              <div className='text-[15px]'>Email: </div>
            </div>
          </div>
          <div>
            <div className='text-2xl font-bold'>Liên hệ</div>
            <div className='text-[15px]'>Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM</div>
            <div className='text-[15px]'>Số điện thoại: 0909 090 090</div>
            <div className='text-[15px]'>Email: </div>
          </div> */}
        </div>
      </div>
      <div className='border-y py-2 px-[10%] flex justify-between items-center font-medium text-gray-500'>
        <span>Copyright © 2024 ShopWeb, a DevHouse company. All rights reserved.</span>
        <Select
          value={lng || 'VI'}
          style={{ width: 120 }}
          onChange={(value) => {
            handleLanguageChange(value)
          }}
          options={Object.entries(locales).map(([code, name]) => ({
            label: name,
            value: code
          }))}
        />
      </div>
    </div>
  )
}

export default Footer
