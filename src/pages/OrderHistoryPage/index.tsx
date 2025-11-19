import { Input, Tabs, TabsProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import AllOrder from './components/AllOrder'
import ProcessOrder from './components/ProcessOrder'
import CompleteOrder from './components/CompleteOrder'
import RefundClaim from './components/RefundClaim'
import './orderStyle.scss'
import { SearchProps } from 'antd/es/input'
const { Search } = Input

const OrderHistoryPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const onChange = (key: string) => {
    navigate(`/profile/history-product/${key}`)
  }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <span className='font-semibold text-[16px]'>Tất cả</span>
    },
    {
      key: '2',
      label: <span className='font-semibold text-[16px]'>Đang xử lý</span>
    },
    {
      key: '3',
      label: <span className='font-semibold text-[16px]'>Hoàn thành</span>
    },
    {
      key: '4',
      label: <span className='font-semibold text-[16px]'>Khiếu nại/Hoàn tiền</span>
    }
  ]

  return (
    <div className='rounded-xl'>
      <Tabs activeKey={`${id ? id : '1'}`} className='tabCustom' items={items} onChange={onChange} />
      <div className='py-4'>
        <Search
          placeholder='Tìm kiếm theo tên sản phẩm'
          size='large'
          className='!bg-[#f4f4f4] !rounded'
          onSearch={onSearch}
          enterButton
        />
      </div>

      {id === '1' && <AllOrder />}
      {!id && <AllOrder />}
      {id === '2' && <ProcessOrder />}
      {id === '3' && <CompleteOrder />}
      {id === '4' && <RefundClaim />}
    </div>
  )
}

export default OrderHistoryPage
