import { getListProductByFilterAPI } from '@/repository/ProductApi'
import { useAppSelector } from '@/stores'
import { debounce } from '@/ultils/function'
import { Input, Select, Space, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PopoverProduct from '../atoms/PopoverProduct'
const { Search } = Input

const InputSearch = () => {
  const { listAllCategory } = useAppSelector((state) => state.category)
  const [selectedCategory, setSelectedCategory] = useState<string>('1')
  const [dataProducts, setDataProducts] = useState<any[]>([])
  const [textSearch, setTextSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const fetchDataProducts = async () => {
    try {
      const res = await getListProductByFilterAPI({
        pagingParams: {
          isPaging: true,
          pageSize: 10,
          keyword: textSearch || '',
          orderBy: '',
          pageIndex: 1
        },
        filterParams: {
          user_id: null,
          categories: selectedCategory === '1' ? [] : [selectedCategory],
          technologies: [],
          is_popular: null
        }
      })
      setDataProducts(res.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataProducts()
  }, [textSearch, selectedCategory])

  const debouncedSetTextSearch = useCallback(
    debounce((value: string) => {
      setTextSearch(value)
    }, 500),
    []
  )

  return (
    <div className='relative'>
      <Space.Compact style={{ borderRadius: '30px', width: '440px' }}>
        <Select
          showSearch
          defaultValue={'1'}
          style={{ width: 200 }}
          aria-multiline={true}
          options={[
            { label: 'Tất cả', value: '1' },
            ...listAllCategory?.map((item) => ({ label: item.name, value: item.slug }))
          ]}
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          onChange={(value) => setSelectedCategory(value)}
        />
        <Search
          placeholder='Tìm kiếm '
          allowClear
          onFocus={() => setVisible(true)}
          onBlur={() => setVisible(false)}
          onChange={(e) => {
            setLoading(true)
            debouncedSetTextSearch(e.target.value)
          }}
        />
      </Space.Compact>
      <div
        className={`absolute border bg-white duration-300 transition-all rounded-lg mt-2 w-full overflow-hidden ${
          visible ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ transition: 'max-height 0.3s ease, opacity 0.3s ease' }}
      >
        <Spin spinning={loading}>
          {dataProducts?.length > 0 && dataProducts.map((item) => <PopoverProduct key={item.id} dataProduct={item} />)}
          <div className='py-3'>Không còn sản phẩm nào khác</div>
        </Spin>
      </div>
    </div>
  )
}

export default InputSearch
