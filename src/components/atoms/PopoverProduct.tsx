import { moneyFormat } from '@/ultils/function'
import { Tooltip } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

const PopoverProduct = ({ dataProduct }: { dataProduct: any }) => {
  const url = import.meta.env.VITE_PUBLIC_STORAGE_API
  return (
    <NavLink
      to={`/product/${dataProduct?.slug}`}
      className='flex justify-between border-b p-3 hover:text-black hover:bg-gray-50 transition-all'
    >
      <div className='flex gap-3 max-w-[80%]'>
        <img
          src={url + dataProduct?.image}
          alt=''
          className='min-h-16 min-w-20 max-h-16 max-w-20 object-cover rounded-md'
        />
        <div className='flex flex-col items-start gap-1'>
          <Tooltip title={dataProduct.name} className='text-[16px] text-start'>
            {dataProduct.name.length > 40 ? dataProduct.name.slice(0, 40) + '...' : dataProduct.name}
          </Tooltip>
          <span className='text-gray-500'>
            By <span className='font-medium text-black'>{dataProduct.user_name}</span>
          </span>
        </div>
      </div>
      <div className='flex items-center justify-center'>
        <span className='px-1 rounded-[4px] text-sm font-medium bg-[#a7e9db]'>
          {moneyFormat(+dataProduct.price_min)}
        </span>
      </div>
    </NavLink>
  )
}

export default PopoverProduct
