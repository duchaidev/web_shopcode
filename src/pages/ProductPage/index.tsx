import XIconNoBackgeound from '@/components/icons/XIconNoBackgeound'
import ItemProduct from '@/components/molecules/ItemProduct'
import { Input, Select, Spin } from 'antd'
import React, { useCallback, useState } from 'react'
import HandleFetchData from './component/HandleFetchData'
import { SearchProps } from 'antd/es/input'
import { useLocation } from 'react-router-dom'
import { debounce } from '@/ultils/function'
const { Search } = Input

const ProductPage = () => {
  const [category, setCategory] = useState<any>()
  const [dataProducts, setDataProducts] = useState<any[]>([])
  const [technology, setTechnology] = useState<any[]>([])
  const [option, setOption] = useState<any>()
  const [textSearch, setTextSearch] = useState('')
  const slugCategory = location.pathname.split('/')[2]
  const [loading, setLoading] = useState(false)

  const handleChange = (value: string) => {
    setOption(value)
  }

  const handleFilter = (index: number) => {
    const newFilter = technology.map((item) => {
      if (index === item.key) {
        return { ...item, active: !item.active }
      } else {
        return item
      }
    })
    const check = newFilter.filter((item) => item.active === true)

    if (check.length === 0) {
      newFilter[0].active = true
    }
    setTechnology(newFilter)
  }

  const debouncedSetTextSearch = useCallback(
    debounce((value: string) => {
      setTextSearch(value)
    }, 500),
    []
  )

  return (
    <div className='flex justify-center flex-col'>
      <HandleFetchData
        setLoading={setLoading}
        setCategory={setCategory}
        setDataProducts={setDataProducts}
        setTechnology={setTechnology}
        technology={technology}
        option={option}
        textSearch={textSearch}
      />
      {slugCategory !== 'all' && slugCategory !== 'free' ? (
        <div className='my-20 flex items-center justify-center flex-col'>
          <h1 className='font-semibold text-[44px]'>{category?.name}</h1>
          <span className='text-[18px] text-gray-500'>{category?.desc}</span>
        </div>
      ) : (
        <div className='my-14 flex-col gap-4 flex items-center justify-center'>
          <Search
            placeholder='Tìm kiếm sản phẩm theo tên....'
            onChange={(e) => {
              debouncedSetTextSearch(e.target.value)
            }}
            allowClear
            enterButton
            className='w-[500px]'
            size='large'
          />
        </div>
      )}
      <Spin spinning={loading}>
        <div className='px-[10%]'>
          {slugCategory !== 'all' && slugCategory !== 'free' && (
            <div className='flex justify-between items-start'>
              <div className='flex gap-3 h-full'>
                {technology?.map((item) => (
                  <p
                    key={item.key}
                    onClick={() => {
                      handleFilter(item?.key)
                    }}
                    className={`cursor-pointer transition-all font-semibold px-4 py-2 rounded-full border-[2px] ${
                      item.active ? 'border-primary' : 'hover:border-[#3e3e3e]'
                    } flex items-center gap-3 justify-center`}
                  >
                    {' '}
                    <span>{item.value}</span> {item.active && <XIconNoBackgeound />}
                  </p>
                ))}
              </div>
              <div className='flex items-end gap-3 flex-col'>
                <Search
                  placeholder='Tìm kiếm theo tên sản phẩm'
                  onChange={(e) => {
                    debouncedSetTextSearch(e.target.value)
                  }}
                  enterButton
                  allowClear
                />
                <Select
                  defaultValue={'0'}
                  style={{ width: 280, height: 32 }}
                  onChange={handleChange}
                  options={[
                    { label: 'Mặc định', value: '0' },
                    { label: 'Nổi bật', value: '1' },
                    { label: 'Giá từ cao đến thấp', value: 'price:desc' },
                    { label: 'Giá từ thấp đến cao', value: 'price:asc' },
                    { label: 'Theo tên A-Z', value: 'name:asc' },
                    { label: 'Theo tên Z-A', value: 'name:desc' }
                  ]}
                />
              </div>
            </div>
          )}
          {slugCategory === 'all' && (
            <div className='flex justify-end gap-3 items-center'>
              <span>Sắp xếp:</span>
              <Select
                defaultValue={'0'}
                style={{ width: 280, height: 32 }}
                onChange={handleChange}
                options={[
                  { label: 'Mặc định', value: '0' },
                  // { label: 'Nổi bật', value: '1' },
                  { label: 'Giá từ cao đến thấp', value: 'price:desc' },
                  { label: 'Giá từ thấp đến cao', value: 'price:asc' },
                  { label: 'Theo tên A-Z', value: 'name:asc' },
                  { label: 'Theo tên Z-A', value: 'name:desc' }
                ]}
              />
            </div>
          )}
          <div className='grid w-full grid-cols-4 gap-6 mt-5'>
            {dataProducts?.length > 0 && dataProducts?.map((item) => <ItemProduct key={item.id} dataProduct={item} />)}
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default ProductPage
