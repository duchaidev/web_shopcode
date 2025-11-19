import { message, Popconfirm, Space, Table, TableProps, Tag, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { deleteProductAPI } from '@/repository/ProductApi'
import DeleteIcon from '@/components/icons/DeleteIcon'
import EditIcon from '@/components/icons/EditIcon'
import EyeIcon from '@/components/icons/EyeIcon'

const TableProduct = ({ dataProducts, setDataProducts }: { dataProducts: any; setDataProducts: any }) => {
  const [loading, setLoading] = useState(false)
  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await deleteProductAPI(id)
      setDataProducts((prev: any) => prev.filter((item: any) => item.id !== id))
      message.success('Xóa sản phẩm thành công')
    } catch (error) {
      message.error('Xóa sản phẩm thất bại')
    } finally {
      setLoading(false)
    }
  }
  const columns: TableProps<any>['columns'] = [
    {
      title: 'STT',
      dataIndex: '',
      key: '',
      render: (_, record, index) => <a>{index + 1}</a>,
      align: 'center'
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Tooltip title={text}>{text?.length > 30 ? text.slice(0, 30) + '...' : text}</Tooltip>
    },

    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <NavLink to={`/product/${record.slug}`} target='_blank' className='cursor-pointer'>
            <EyeIcon />
          </NavLink>
          <NavLink to={`/admin/edit-product/${record.slug}`} className='cursor-pointer'>
            <EditIcon />
          </NavLink>
          <p className='cursor-pointer'>
            <Popconfirm title='Bạn chắc chắn xóa?' onConfirm={() => handleDelete(record.id)}>
              <span className='cursor-pointer'>
                <DeleteIcon />
              </span>
            </Popconfirm>
          </p>
        </Space>
      )
    }
  ]

  return (
    <div className='mt-5'>
      <Table columns={columns} dataSource={dataProducts} loading={loading} />
    </div>
  )
}

export default TableProduct
