import { Tabs, TabsProps } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'

const TabsProduct = () => {
  const onChange = (key: string) => {
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className='font-semibold'>Đánh giá</span>
    },
    {
      key: '2',
      label: <span className='font-semibold'>Bình luận</span>
    },
    {
      key: '3',
      label: <span className='font-semibold'>Hỏi đáp</span>
    }
  ]

  return (
    <div className='col-span-10 flex justify-between'>
      <div className='w-[350px]'>
        <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
      </div>
      <div>
        <span className='text-base'>
          Need Help?{' '}
          <NavLink to='/' className={'text-primary font-semibold'}>
            Contact Support
          </NavLink>
        </span>
      </div>
    </div>
  )
}

export default TabsProduct
