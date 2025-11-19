import { useAppSelector } from '@/stores'
import { moneyFormat } from '@/ultils/function'
import { Button, Tooltip } from 'antd'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const PopoverCart = () => {
  const url = import.meta.env.VITE_PUBLIC_STORAGE_API
  const { listAllCart } = useAppSelector((state) => state.cart)
  const navigate = useNavigate()
  return (
    <div className='w-[400px]'>
      {listAllCart?.length > 0 &&
        listAllCart.map((item: any) => (
          <div className='flex justify-between border-b p-3 hover:text-black hover:bg-gray-50 transition-all'>
            <div className='flex gap-3 max-w-[80%]'>
              <img
                src={url + item?.image_url}
                alt=''
                className='min-h-[68px] min-w-20 max-h-[68px] max-w-20 object-cover rounded-md'
              />
              <div className='flex flex-col items-start gap-1'>
                <Tooltip title={item.product_name} className='text-[15px] text-start'>
                  {item.product_name.length > 40 ? item.product_name.slice(0, 40) + '...' : item.product_name}
                </Tooltip>
                <span>Phân loại: {item.classify_name}</span>
                {/* <span className='text-gray-500'>
                    By <span className='font-medium text-black'>{item.sell_by}</span>
                  </span> */}
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <span className='px-1 rounded-[4px] text-sm font-medium bg-[#a7e9db]'>{moneyFormat(+item.price)}</span>
            </div>
          </div>
        ))}
      <div className='mt-3 flex justify-end'>
        <Button
          type='primary'
          onClick={() => {
            navigate('/gio-hang')
          }}
        >
          Xem giỏ hàng
        </Button>
      </div>
    </div>
  )
}

export default PopoverCart
