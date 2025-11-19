import { Menu } from 'antd'
import React, { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const menus = [
  // {
  // 	key: `/`,
  // 	icon: <HomeOutlined />,
  // 	label: 'Trang chủ',
  // },
  {
    key: `/order`,
    label: 'Quản lý đơn hàng',
    icon: <HomeOutlined />,
    children: [
      {
        key: '/admin/manage-order',
        label: 'Tất cả'
      },
      {
        key: `/admin/manage-order-waiting`,
        label: 'Đặt theo yêu cầu'
      }
    ]
  },
  {
    key: `admin`,
    label: 'Quản lý sản phẩm',
    icon: <HomeOutlined />,
    children: [
      {
        key: `/admin/manage-product`,
        label: 'Tất cả sản phẩm'
      },
      {
        key: `/admin/add-product`,
        label: 'Thêm sản phẩm'
      },
      {
        key: `/admin/manage-product-waiting`,
        label: 'Sản phẩm chờ duyệt'
      }
    ]
  },
  {
    key: `/admin/manage-category`,
    label: 'Quản lý phân loại',
    icon: <HomeOutlined />
  },

  {
    key: `admin/fintech`,
    label: 'Tài chính',
    icon: <HomeOutlined />,
    children: [
      {
        key: `/admin/revenue`,
        label: 'Doanh thu'
      },
      {
        key: `/admin/manage-payment`,
        label: 'Lịch sử nạp/rút'
      },
      {
        key: `/admin/manage-bank-account`,
        label: 'Tài khoản ngân hàng'
      }
    ]
  },
  {
    key: `/admin/manage-user`,
    label: 'Quản lý người dùng',
    icon: <HomeOutlined />
  }
]
const MenuComponent = () => {
  const parentRoute = location.pathname.split('/')[1]
  const childRoute = location.pathname.split('/')[2]
  const [openKeys, setOpenKeys] = useState([`/${parentRoute}`, `/${parentRoute}/${childRoute}`])
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const onHandleClickMenu = ({ key }: { key: string }) => {
    if (key === '/dang-xuat') {
      // deleteCookie('accessToken')
      // deleteCookie('refreshToken')
      window.location.href = '/login'
    } else {
      // closeOpenMenu()
      navigate(key)
    }
  }

  const onOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys)
  }

  return (
    <div className='top-[60px] left-0 bottom-0 w-[230px] fixed min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)]'>
      <Menu
        mode='inline'
        selectedKeys={[`/${parentRoute}`, `/${parentRoute}/${childRoute}`]}
        openKeys={openKeys}
        className=' min-h-[calc(100vh-60px)] max-h-[calc(100vh-60px)] overflow-y-auto border-r'
        items={menus?.map((item) => {
          if (item.children) {
            return {
              ...item,
              children: item.children.map((child) => {
                return {
                  ...child,
                  key: child.key,
                  label: child.label
                }
              })
            }
          }
          return {
            ...item,
            key: item.key,
            label: item.label
          }
        })}
        onClick={(props) => onHandleClickMenu(props)}
        onOpenChange={onOpenChange}
        inlineCollapsed={collapsed}
      />
      {/* <div onClick={toggleCollapsed} className='absolute bottom-0 border-t left-0 right-0 p-4'>
                <span className='cursor-pointer'>
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </span>
            </div> */}
    </div>
  )
}

export default MenuComponent
