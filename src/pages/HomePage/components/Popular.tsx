import ItemProduct from '@/components/molecules/ItemProduct'
import ItemProductSkeleton from '@/components/molecules/ItemProductSkeleton'
import { getListProductByFilterAPI } from '@/repository/ProductApi'
import { useAppSelector } from '@/stores'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Popular = () => {
  const [dataProducts, setDataProducts] = React.useState<any[]>([])
  const fetchDataProducts = async () => {
    try {
      const res = await getListProductByFilterAPI({
        pagingParams: {
          isPaging: true,
          pageSize: 4,
          keyword: '',
          orderBy: '',
          pageIndex: 2
        },
        filterParams: {
          user_id: null,
          categories: [],
          technologies: [],
          is_popular: null
        }
      })
      setDataProducts(res.data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDataProducts()
  }, [])

  return (
    <div className='flex mt-16 flex-col '>
      <div className='flex justify-between items-center'>
        <h2 className='text-[22px] font-bold'>Popular Landing Page</h2>
        <NavLink
          to={'/category/x'}
          className='font-semibold hover:text-primary transition-all text-[#2a8f7c] text-[16px]'
        >
          Xem tất cả{' '}
        </NavLink>
      </div>
      <div className='grid w-full grid-cols-4 gap-6 mt-5'>
        {dataProducts?.length === 0
          ? Array.from({ length: 4 }).map((_, index) => <ItemProductSkeleton key={index} />)
          : dataProducts?.map((item) => <ItemProduct key={item.id} dataProduct={item} />)}
      </div>
    </div>
  )
}

export default Popular
