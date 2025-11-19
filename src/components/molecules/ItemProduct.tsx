import { Avatar, Tag, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import ImageAutoScroll from '../atoms/ImageAutoScroll'
import { moneyFormat } from '@/ultils/function'

const ItemProduct = ({ dataProduct }: { dataProduct: any }) => {
  const navigate = useNavigate()
  return (
    <NavLink to={`/product/${dataProduct?.slug}`} className='bg-[#f7f6f6] hover:text-black rounded-2xl overflow-hidden'>
      <ImageAutoScroll height={200} image={dataProduct?.image} />
      <div className='py-3 px-4 flex flex-col gap-1'>
        <div className='flex justify-between'>
          <Tooltip
            title={dataProduct?.name}
            className='text-[16px] hover:text-[#307063] transition-all font-bold cursor-pointer'
          >
            {dataProduct?.name.length > 20 ? dataProduct?.name.slice(0, 30) + '...' : dataProduct?.name}
          </Tooltip>
          <Tag color='#a7e9db' className='h-[22px]'>
            <span className='text-black font-medium'>{moneyFormat(+dataProduct?.price_min)}</span>
          </Tag>
        </div>
        <span
          onClick={(e) => {
            e.stopPropagation()
            navigate(`/product/${dataProduct?.slug}`)
          }}
          className='text-[14px] max-w-max text-gray-500 flex items-center gap-2 cursor-pointer'
        >
          <Avatar size={20} icon={<UserOutlined />} />
          By {dataProduct?.user_name}
        </span>
      </div>
    </NavLink>
  )
}

export default ItemProduct
