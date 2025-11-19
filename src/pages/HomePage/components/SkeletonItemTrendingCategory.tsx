import { Skeleton } from 'antd'
import React from 'react'

const SkeletonItemTrendingCategory = () => {
  return (
    <div className='aspect-[19/20] rounded-md bg-slate-100 flex p-2 flex-col items-center'>
      <div className='w-[85%] flex items-center justify-center h-[80%] mt-[4%] mb-3'>
        <Skeleton.Image active />
      </div>
      <span className='text-[14px] font-semibold text-center w-[100%] pb-2 text-black whitespace-nowrap'>
        <Skeleton.Input active size='small' />
      </span>
    </div>
  )
}

export default SkeletonItemTrendingCategory
