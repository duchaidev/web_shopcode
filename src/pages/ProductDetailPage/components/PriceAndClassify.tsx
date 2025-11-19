import { addToCartAPI } from '@/repository/CartAPI'
import { useAppSelector } from '@/stores'
import { moneyFormat } from '@/ultils/function'
import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const PriceAndClassify = ({ dataProduct }: { dataProduct: any }) => {
  const { user } = useAppSelector((state) => state.user)
  const [option, setOption] = useState<any>({})

  useEffect(() => {
    if (dataProduct?.classify?.length > 0) {
      setOption(dataProduct?.classify[0])
    }
  }, [dataProduct])

  const handleAddToCart = async () => {
    try {
      addToCartAPI({
        product_id: dataProduct.id,
        user_id: user.id,
        classify_id: option.id,
        code: '',
        note: ''
      })
      message.success('Thêm vào giỏ hàng thành công')
    } catch (error) {
      console.log(error)
      message.error('Thêm vào giỏ hàng thất bại')
    }
  }
  return (
    <div>
      <div className='flex border rounded-md flex-col px-4 pt-3 pb-5 gap-2'>
        <p className=' font-semibold text-primary text-2xl'>{moneyFormat(+option.price) || 0}</p>
        <span className='text-[16px] font-medium text-gray-600'>Lựa chọn</span>
        <div className='flex flex-col justify-center items-start gap-3'>
          {dataProduct?.classify?.length > 0 &&
            dataProduct?.classify.map((item: any) => (
              <div className='flex gap-x-3 w-full' key={item.id}>
                <input
                  type='radio'
                  id={item.id}
                  name='fav_language'
                  defaultChecked
                  value={item.id}
                  className='bg-primary cursor-pointer'
                  onClick={() => setOption(item)}
                />
                <label htmlFor={item.id} className='flex cursor-pointer justify-between w-full text-base font-semibold'>
                  <span>{item.name}</span>
                  <span className=''>{moneyFormat(+item.price)}</span>
                </label>
              </div>
            ))}

          {/* <p className='text-end text-primary underline cursor-pointer'>Xem chi tiết</p> */}
        </div>
        <div className='mt-2 flex flex-col gap-3'>
          <Button type='primary' size='large'>
            Mua ngay
          </Button>
          <Button
            size='large'
            onClick={() => {
              handleAddToCart()
            }}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
        <p className='flex flex-col gap-1'>
          <span className='text-[16px] font-medium text-gray-600'>Phân loại</span>
          <span>
            {dataProduct?.categories?.length > 0 &&
              dataProduct?.categories.map((item: any, index: number) => (
                <NavLink to={'/category/' + item.slug} key={item.id}>
                  {item.name} {index < dataProduct?.categories?.length - 1 ? '/' : ''}{' '}
                </NavLink>
              ))}
          </span>
        </p>
      </div>
      <div className='p-3 rounded-md md mt-4 bg-[#d7f8f2]'>
        <strong>Mách bạn: </strong>
        Bạn có thể kiếm tiền từ việc giới thiệu. Khi họ mua sản phẩm, bạn sẽ nhận được lên đến 20% giá trị đơn hàng.
        <p>
          <NavLink to={'/profile/affiliate'} className={'text-blue-600 underline hover:text-blue-800 hover:underline'}>
            Chi tiết xem tại đây
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default PriceAndClassify
