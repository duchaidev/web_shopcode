import React, { useEffect, useState } from 'react'
import { Button, Form, TableProps } from 'antd'
import FormAddTechnology from './FormAddTechnology'
import TableListTechnology from './TableListTechnology'
import { getTechnologyAPI } from '@/repository/Technology'
import Input, { SearchProps } from 'antd/es/input'
type OnChange = NonNullable<TableProps<any>['onChange']>
type Filters = Parameters<OnChange>[1]
const { Search } = Input

const TabManageTechnology = () => {
  const [form] = Form.useForm()
  const [textSearch, setTextSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<any>([])
  const [filteredInfo, setFilteredInfo] = useState<Filters>({})
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => setTextSearch(value)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const fetchDataTechnology = async () => {
    setLoading(true)
    try {
      const res: any = await getTechnologyAPI({
        pagingParams: {
          isPaging: false,
          keyword: textSearch || '',
          orderBy: '',
          pageIndex: 0,
          pageSize: 100
        },
        filterParams: {
          category_id: filteredInfo?.category_id ? filteredInfo?.category_id[0] : 0
        }
      })
      setDataSource(res.data?.data)
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataTechnology()
  }, [filteredInfo, textSearch])

  const handleEdit = (record: any) => {
    setIsModalOpen(true)
    form.setFieldsValue(record)
  }

  return (
    <div className='bg-white px-5 py-5 rounded-md'>
      <div className='flex items-center justify-between pb-4'>
        <p className='font-medium text-xl'>Quản lý công nghệ sử dụng</p>
        <div className='flex gap-3'>
          <Button type='primary' onClick={showModal}>
            Thêm mới công nghệ sử dụng
          </Button>
          <Search placeholder='Tìm theo tên sản phẩm' onSearch={onSearch} style={{ width: 300 }} />
        </div>
      </div>
      <FormAddTechnology
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fetchDataTechnology={fetchDataTechnology}
      />
      <TableListTechnology
        loading={loading}
        setLoading={setLoading}
        dataSource={dataSource}
        setDataSource={setDataSource}
        handleEdit={handleEdit}
        filteredInfo={filteredInfo}
        setFilteredInfo={setFilteredInfo}
      />
    </div>
  )
}

export default TabManageTechnology
