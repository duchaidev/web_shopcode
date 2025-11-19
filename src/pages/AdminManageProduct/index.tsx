import { Tabs, TabsProps } from 'antd'
import './ManageProduct.scss'
import { SearchProps } from 'antd/es/input'
import { Input } from 'antd'
import TableProduct from './components/TableProduct'
import { useEffect, useState } from 'react'
import { getListProductByFilterAPI } from '@/repository/ProductApi'
const { Search } = Input

const AdminManageProduct = () => {
  const [dataProducts, setDataProducts] = useState<any[]>([])
  const onChange = (key: string) => {
    console.log(key)
  }
  const fetchDataProducts = async () => {
    try {
      const res = await getListProductByFilterAPI({
        pagingParams: {
          isPaging: false,
          pageSize: 2,
          keyword: '',
          orderBy: '',
          pageIndex: 1
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

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tất cả',
      children: <TableProduct dataProducts={dataProducts} setDataProducts={setDataProducts} />
    },
    {
      key: '2',
      label: 'Đang hoạt động',
      children: <TableProduct dataProducts={dataProducts} setDataProducts={setDataProducts} />
    },
    {
      key: '3',
      label: 'Chờ duyệt',
      children: <TableProduct dataProducts={dataProducts} setDataProducts={setDataProducts} />
    },
    {
      key: '4',
      label: 'Vi phạm',
      children: <TableProduct dataProducts={dataProducts} setDataProducts={setDataProducts} />
    }
  ]

  return (
    <div className='bg-white py-3 px-5 manageProduct'>
      <div className='flex items-center justify-between'>
        <p className='font-medium text-xl pb-3'>Danh sách sản phẩm</p>
        <Search placeholder='Tìm theo tên sản phẩm' onSearch={onSearch} style={{ width: 300 }} />
      </div>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </div>
  )
}

export default AdminManageProduct
