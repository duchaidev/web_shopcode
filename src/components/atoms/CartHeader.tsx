import { Badge, Dropdown, Popover } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { items } from '../../ultils/menu/MenuDropdown'
import PopoverCart from '../molecules/PopoverCart'

const CartHeader = () => {
  return (
    <Popover content={<PopoverCart />} title='Giỏ hàng' placement='bottomRight' className='!z-50'>
      <NavLink to={'/gio-hang'} className='flex items-center justify-center'>
        <Badge count={5} size='small'>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M16 15.9195C16.5304 15.9195 17.0391 16.1244 17.4142 16.4891C17.7893 16.8538 18 17.3484 18 17.8641C18 18.3799 17.7893 18.8745 17.4142 19.2391C17.0391 19.6038 16.5304 19.8087 16 19.8087C15.4696 19.8087 14.9609 19.6038 14.5858 19.2391C14.2107 18.8745 14 18.3799 14 17.8641C14 16.7849 14.89 15.9195 16 15.9195ZM0 0.362793H3.27L4.21 2.30738H19C19.2652 2.30738 19.5196 2.40982 19.7071 2.59216C19.8946 2.7745 20 3.02181 20 3.27968C20 3.44497 19.95 3.61026 19.88 3.76583L16.3 10.0566C15.96 10.6497 15.3 11.058 14.55 11.058H7.1L6.2 12.6429L6.17 12.7596C6.17 12.824 6.19634 12.8859 6.24322 12.9314C6.29011 12.977 6.3537 13.0026 6.42 13.0026H18V14.9472H6C5.46957 14.9472 4.96086 14.7424 4.58579 14.3777C4.21071 14.013 4 13.5184 4 13.0026C4 12.6623 4.09 12.3415 4.24 12.0692L5.6 9.68711L2 2.30738H0V0.362793ZM6 15.9195C6.53043 15.9195 7.03914 16.1244 7.41421 16.4891C7.78929 16.8538 8 17.3484 8 17.8641C8 18.3799 7.78929 18.8745 7.41421 19.2391C7.03914 19.6038 6.53043 19.8087 6 19.8087C5.46957 19.8087 4.96086 19.6038 4.58579 19.2391C4.21071 18.8745 4 18.3799 4 17.8641C4 16.7849 4.89 15.9195 6 15.9195ZM15 9.11345L17.78 4.25198H5.14L7.5 9.11345H15Z'
              fill='black'
            />
          </svg>
        </Badge>
      </NavLink>
    </Popover>
  )
}

export default CartHeader
