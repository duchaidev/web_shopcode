import React, { useEffect, useState } from 'react'
import FormAddCategory from './FormAddCategory'
import TableListCategory from './TableListCategory'
import { getCategoryAPI } from '@/repository/CategoryAPI'
import { Button, Form, Input } from 'antd'
import { setFilterCategory } from '@/stores/Category'
import { useAppDispatch, useAppSelector } from '@/stores'
import { SearchProps } from 'antd/es/input'
import { use } from 'i18next'
import { urlImage } from '@/repository/ImageUrl'
const { Search } = Input

const TabManageCategory = () => {
  const [form] = Form.useForm()
  const [textSearch, setTextSearch] = useState('')
  const dispatch = useAppDispatch()
  const [fileUrl, setFileUrl] = useState<string[]>([])
  const [fileImage, setFileImage] = useState<any[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const onSearch: SearchProps['onSearch'] = (value, _e, info) => setTextSearch(value)

  const fetchDataCategory = async () => {
    try {
      setLoading(true)
      const res: any = await getCategoryAPI({
        pagingParams: {
          isPaging: false,
          keyword: textSearch || '',
          orderBy: '',
          pageIndex: 0,
          pageSize: 100
        },
        filterParams: {
          is_popular: null
        }
      })
      dispatch(
        setFilterCategory(
          res?.data?.data?.map((item: any) => ({
            ...item,
            label: item.name,
            value: item.id,
            desc: item.name,
            key: item.id,
            text: item.name
          }))
        )
      )
    } catch (err) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDataCategory()
  }, [textSearch])

  const handleEdit = (record: any) => {
    setIsModalOpen(true)
    form.setFieldsValue(record)
    setFileUrl([record.image])
    setFileImage([{ url: `${urlImage()}${record.image}` }])
  }

  const showModal = () => {
    setIsModalOpen(true)
    form.resetFields()
    setFileUrl([])
    setFileImage([])
  }

  return (
    <div className='bg-white px-5 py-5 rounded-md'>
      <div className='flex items-center justify-between pb-4'>
        <p className='font-medium text-xl'>Quản lý phân loại</p>
        <div className='flex gap-3'>
          <Button type='primary' onClick={showModal}>
            Thêm mới phân loại
          </Button>
          <Search placeholder='Tìm theo tên sản phẩm' onSearch={onSearch} style={{ width: 300 }} />
        </div>
      </div>
      <FormAddCategory
        form={form}
        setFileUrl={setFileUrl}
        setFileImage={setFileImage}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        fileUrl={fileUrl}
        fileImage={fileImage}
        fetchDataCategory={fetchDataCategory}
      />
      <TableListCategory handleEdit={handleEdit} loadingSearch={loading} />
    </div>
  )
}

export default TabManageCategory
