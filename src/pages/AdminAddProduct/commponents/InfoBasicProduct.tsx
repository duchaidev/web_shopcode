import { getTechnologyAPI } from '@/repository/Technology'
import { useAppSelector } from '@/stores'
import { Form, Input, InputNumber, Select, Space, Switch } from 'antd'
import React, { FC, useEffect, useState } from 'react'

const InfoBasicProduct: FC<{ form: any }> = ({ form }) => {
  const { listAllCategory } = useAppSelector((state) => state.category)
  const [selectedCategory, setSelectedCategory] = useState<any>([])
  const [selectTechnology, setSelectTechnology] = useState<any>([])
  const fetchDataTechnology = async (categories?: number[]) => {
    try {
      const res: any = await getTechnologyAPI({
        pagingParams: {
          isPaging: false,
          keyword: '',
          orderBy: '',
          pageIndex: 0,
          pageSize: 100
        },
        filterParams: {
          category_id: selectedCategory || categories || []
        }
      })
      setSelectTechnology(res.data?.data?.map((item: any) => ({ label: item.name, value: item.id })))
    } catch (err) {}
  }

  useEffect(() => {
    const categories = form.getFieldValue('categories')
    fetchDataTechnology(categories)
  }, [selectedCategory])

  return (
    <div>
      <Form labelCol={{ span: 4 }} layout='horizontal' form={form}>
        <div className='grid grid-cols-2'>
          <Form.Item name='id' hidden>
            <Input />
          </Form.Item>
          <Form.Item label='Nổi bật' name='is_popular'>
            <Switch checkedChildren='Có' unCheckedChildren='Không' />
          </Form.Item>
          <Form.Item></Form.Item>
          <Form.Item label='Tên sản phẩm' name='name'>
            <Input placeholder='Nhập tên sản phẩm' />
          </Form.Item>
          <Form.Item label='Link demo' name='url_demo'>
            <Input placeholder='Nhập url demo' />
          </Form.Item>
          <Form.Item label='Ngành hàng' name='categories'>
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Chọn ngành hàng'
              onChange={(value) => {
                setSelectedCategory(value)
              }}
              maxCount={3}
              options={listAllCategory}
              optionRender={(option) => (
                <Space>
                  <span role='img' aria-label={option.data.label}>
                    {option.data.emoji}
                  </span>
                  {option.data.desc}
                </Space>
              )}
            />
          </Form.Item>
          <Form.Item label='Công nghệ' name='technologies'>
            <Select
              mode='multiple'
              style={{ width: '100%' }}
              placeholder='Chọn công nghệ'
              options={selectTechnology}
              disabled={!selectTechnology.length}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default InfoBasicProduct
