import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

const ItemTrendingCategory: FC<{
  to: string
  imgSrc: string
  title: string
}> = ({ to, imgSrc, title }) => {
  return (
    <NavLink to={to} className='aspect-[19/20] rounded-md bg-slate-100 flex p-2 flex-col items-center'>
      <div className='w-[85%] flex items-center justify-center !h-[80%] mt-[4%] mb-3'>
        <img src={imgSrc} alt='image' className='h-full object-cover' />
      </div>
      <span className='text-[16px] font-semibold text-center w-[100%] pb-2 text-black whitespace-nowrap'>{title}</span>
    </NavLink>
  )
}

export default ItemTrendingCategory
