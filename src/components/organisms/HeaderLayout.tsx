import { Avatar, Badge, Button, Dropdown, Input, MenuProps, Popover, Select, Skeleton, Space, Tooltip } from 'antd'
import { SmileOutlined, UserOutlined, CaretDownOutlined } from '@ant-design/icons'
import InputSearch from '../molecules/InputSearch'
import { NavLink, useParams } from 'react-router-dom'
import { useAppSelector } from '@/stores'
import Notification from '../atoms/Notification'
import CartHeader from '../atoms/CartHeader'
import PopoverHeaderInfoUser from '../molecules/PopoverHeaderInfoUser'
import { useTranslation } from 'react-i18next'
import ModalOrder from '../atoms/ModalOrder'
import { useState } from 'react'

const HeaderLayout = () => {
  const { t } = useTranslation(['home'])
  const { user } = useAppSelector((state) => state.user)
  const { listAllCategory } = useAppSelector((state) => state.category)
  const { slug } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className='flex flex-col'>
      <ModalOrder isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className='flex py-5 justify-between items-center'>
        <div className=''>
          <InputSearch />
        </div>
        <div className='absolute left-[50%] -translate-x-[50%]'>
          <NavLink to={'/'}>
            <img src='/logo.png' className='h-[40px]' alt='logo' />
          </NavLink>
        </div>
        <div className='flex gap-7 items-center'>
          <NavLink to='/category/free' className='font-semibold'>
            Free Download
          </NavLink>
          <Button
            type='primary'
            onClick={() => {
              setIsModalOpen(true)
            }}
          >
            Đặt hàng theo yêu cầu
          </Button>
          {/* {user?.id && <Notification></Notification>} */}
          {user?.id && (
            <Popover content={<PopoverHeaderInfoUser />} trigger={'click'} placement='bottomRight'>
              <a onClick={(e) => e.preventDefault()}>
                <div className='flex items-center justify-center gap-1'>
                  <Avatar size='small' icon={<UserOutlined />} />
                  <CaretDownOutlined />
                </div>
              </a>
            </Popover>
          )}
          {!user?.id && <NavLink to={'/dang-nhap'}>Đăng nhập</NavLink>}
          <CartHeader></CartHeader>
        </div>
      </div>
      <div className='border-t border-b border-stone-400 px-[10%] gap-2 flex font-semibold justify-center items-center py-2 '>
        <NavLink
          to={`/category/all`}
          key={'-1'}
          className={`cursor-pointer px-4 py-2 font-medium rounded-full transition-all ${
            slug === 'all' ? 'hover:text-black bg-[#d6eee9]' : 'hover:bg-[#d7d7d7] hover:text-black'
          }`}
        >
          Tất cả sản phẩm
        </NavLink>
        {listAllCategory?.length > 0
          ? listAllCategory.map((item, index) => (
              <NavLink
                to={`/category/${item.slug}`}
                key={index}
                className={`cursor-pointer px-4 py-2 font-medium rounded-full transition-all ${
                  slug === item.slug ? 'hover:text-black bg-[#d6eee9]' : 'hover:bg-[#d7d7d7] hover:text-black'
                }`}
              >
                {item.name}
              </NavLink>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <Skeleton.Input key={index} active className='!h-[36px] !rounded-full' />
            ))}
      </div>
    </div>
  )
}

export default HeaderLayout
