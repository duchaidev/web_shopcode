import VndIcon from '@/components/icons/VndIcon'
import { Button, Input } from 'antd'
import React from 'react'

const CartPayment = () => {
  return (
    <div className='border p-5 rounded-md flex flex-col gap-5'>
      <span className='font-medium text-[15px] text-secondary'>
        Bạn có thể có thêm thu nhập bằng cách giới thiệu người khác mua hàng.
      </span>

      <div className='border-t'></div>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-2'>
          <span>Mã khuyến mại (Nếu có)</span>
          <Input placeholder='Nhập mã khuyễn mại'></Input>
        </div>
        <div className='flex flex-col gap-2'>
          <span>Ghi chú thêm (Nếu có)</span>
          <Input.TextArea placeholder='Nhập ghi chú' className='max-h-28'></Input.TextArea>
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <span className='font-medium text-xl'>Total</span>
        <span>
          <span className='font-semibold text-lg flex items-center gap-[1px]'>
            <VndIcon />
            <span className='-translate-y-[2px]'>100.000</span>
          </span>
        </span>
      </div>
      <Button className='w-full' size='large' type='primary'>
        Thanh toán
      </Button>
    </div>
  )
}

export default CartPayment
