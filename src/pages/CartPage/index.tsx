import React from 'react'
import CartInfo from './components/CartInfo'
import Popular from '../HomePage/components/Popular'
import CartPayment from './components/CartPayment'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '@/stores'

const CartPage = () => {
  const { listAllCart } = useAppSelector((state) => state.cart)

  return (
    <div>
      <div className='px-[8%] grid grid-cols-3 gap-x-5'>
        <div className='col-span-3 my-8 flex items-end gap-4'>
          <span className='font-semibold text-2xl'>Giỏ hàng</span>
          <NavLink to={''} className='font-semibold text-lg text-secondary'>
            Lịch sử mua hàng {'>'}
          </NavLink>
        </div>
        <div className='col-span-2'>
          <CartInfo />
        </div>
        <div className='col-span-1'>
          <CartPayment />
        </div>
      </div>
      <Popular />
    </div>
  )
}

export default CartPage
