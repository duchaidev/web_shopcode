import React from 'react'
import { NavLink } from 'react-router-dom'
import AppMenuIcon from '../icons/AppMenuIcon'
import { Popover } from 'antd'
import PopoverHeaderMenuAdmin from '../molecules/PopoverHeaderMenuAdmin'

const HeaderAdmin = () => {
  return (
    <div className='flex h-full justify-between px-[20px] items-center'>
      <div className='flex items-center gap-3'>
        <NavLink to={'/'}>
          <img src='/logo.png' className='h-[40px]' alt='logo' />
        </NavLink>
        <span className='font-semibold text-lg text-gray-600'>Kênh người bán</span>
      </div>
      <div>
        <Popover content={<PopoverHeaderMenuAdmin />} title='Title' placement='bottomRight' className=''>
          <div className='p-3 hover:bg-gray-200 rounded-sm transition-all cursor-pointer'>
            <AppMenuIcon />
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default HeaderAdmin
