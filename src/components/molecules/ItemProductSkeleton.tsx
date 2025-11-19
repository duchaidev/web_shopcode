import { Skeleton } from 'antd'
import React from 'react'

const ItemProductSkeleton = () => {
  return (
    <div className='bg-[#f7f6f6] rounded-2xl overflow-hidden flex flex-col justify-between'>
      <div className='h-[200px] flex items-center justify-center'>
        <Skeleton.Image active />
      </div>
      <div className='py-3 px-4 flex flex-col gap-1'>
        <p className='flex justify-between'>
          <Skeleton.Input active size='small' />
          {/* <Skeleton.Input active size='small' /> */}
        </p>
        <span className='text-[14px] max-w-max text-gray-500 flex items-center gap-2 cursor-pointer'>
          {' '}
          <Skeleton.Avatar active size={'small'} /> <Skeleton.Input active size='small' />
        </span>
      </div>
    </div>
  )
}

export default ItemProductSkeleton
