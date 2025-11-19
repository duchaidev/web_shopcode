import { locales } from '@/i18n/i18n'
import { useAppSelector } from '@/stores'
import { deleteCookie, getCookie, setCookie } from '@/ultils/Cookie'
import i18next, { use } from 'i18next'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import dayjs from 'dayjs'

const PopoverHeaderInfoUser = () => {
  const { t } = useTranslation(['home'])
  const { user } = useAppSelector((state) => state.user)

  const handleLanguageChange = (lng: any) => {
    const expiresAt = dayjs().add(500, 'day').startOf('day')
    setCookie('seasoftservice', lng, expiresAt)
    i18next.changeLanguage(lng)
  }

  return (
    <div className='min-w-[230px]'>
      <div className='flex flex-col gap-[6px] pb-3 border-b p-1'>
        <NavLink to='/profile/my-profile' className='text-[14px] cursor-pointer'>
          {t('XIN_CHAO')}, <span className='font-medium'> {user?.full_name}</span>
        </NavLink>
        <div className='flex items-center justify-between gap-5'>
          <span className='italic text-gray-600'>
            {t('SO_DU')}:<span className='font-medium'> 2,500,345đ</span>
          </span>
          <NavLink
            to='/profile/deposit-withdrawal'
            className='px-2 py-1 hover:text-white text-xs hover:bg-secondary transition-all text-white rounded-md cursor-pointer bg-primary'
          >
            {t('NAP_RUT')}
          </NavLink>
        </div>
      </div>
      <div className='flex flex-col pt-2 border-b border-blue1'>
        <NavLink to='/profile/my-profile' className='px-3 py-[6px] hover:bg-blue1'>
          {t('THONG_TIN_CA_NHAN')}
        </NavLink>
        <NavLink to='/profile/noti' className='px-3 py-[6px] hover:bg-blue1'>
          {t('THONG_BAO')}
        </NavLink>
        <NavLink to='/profile/affiliate' className='px-3 py-[6px] hover:bg-blue1'>
          {t('TIEP_THI_LIEN_KET')}
        </NavLink>
      </div>
      <div className='flex flex-col pt-2 border-b border-blue1'>
        <NavLink to='/profile/deposit-withdrawal' className='px-3 py-[6px] hover:bg-blue1'>
          {t('NAP_RUT')} {t('TIEN')}
        </NavLink>
        <NavLink to='/ ' className='px-3 py-[6px] hover:bg-blue1'>
          {t('MA_KHUYEN_MAI')}
        </NavLink>
        <NavLink to='/profile/history-product' className='px-3 py-[6px] hover:bg-blue1 mb-2'>
          {t('LICH_SU_MUA_HANG')}
        </NavLink>
      </div>
      <div className='flex flex-col pt-2 border-b border-blue1'>
        <NavLink to='/' className='px-3 py-[6px] hover:bg-blue1'>
          {t('LIEN_HE_HO_TRO')}/ {t('BAO_CAO')}
        </NavLink>
        <NavLink to='/' className='px-3 py-[6px] hover:bg-blue1 mb-2'>
          {t('GOP_Y_CAI_THIEN_CHAT_LUONG')}
        </NavLink>
      </div>
      {/* Chọn đa ngôn ngữ (Khi nào tích hợp sẽ thêm vào đây) */}
      <div className='flex flex-col border-b border-blue1'>
        <div className='flex gap-2 px-3 py-3'>
          {Object.entries(locales).map(([code, name]) => (
            <button
              className='font-medium text-[12px] text-white px-2 py-1 rounded-md bg-primary'
              key={code}
              value={code}
              onMouseDown={() => {
                handleLanguageChange(code)
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>
      <div className='flex cursor-pointer flex-col pt-2'>
        <span
          className='px-3 pt-[6px] hover:text-primary hover:bg-blue1 mb-2'
          onClick={() => {
            deleteCookie('accessToken')
            deleteCookie('refreshToken')
            window.location.href = '/dang-nhap'
          }}
        >
          {t('DANG_XUAT')}
        </span>
      </div>
    </div>
  )
}

export default PopoverHeaderInfoUser
