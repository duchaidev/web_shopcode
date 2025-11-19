import { deleteCategoryAPI } from '@/repository/CategoryAPI'
import { Image, message, Table } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { Switch } from 'antd'
import ActionTable from '@/components/atoms/ActionTable'
import PopConfirmDelete from '@/components/atoms/PopConfirmDelete'
import EditIcon from '@/components/icons/EditIcon'
import { useAppDispatch, useAppSelector } from '@/stores'
import { setAllCategory, setFilterCategory } from '@/stores/Category'
import { urlImage } from '@/repository/ImageUrl'

const TableListCategory: FC<{
  handleEdit: any
  loadingSearch?: boolean
}> = ({ handleEdit, loadingSearch }) => {
  const dispatch = useAppDispatch()
  const { listFilterCategory } = useAppSelector((state) => state.category)
  const { listAllCategory } = useAppSelector((state) => state.category)
  const [loading, setLoading] = useState(false)
  const columns: any = [
    {
      title: 'STT',
      dataIndex: '',
      key: '',
      render: (text: any, _: any, index: any) => <a>{index + 1}</a>
    },
    {
      title: 'Tên loại',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (image: any) => (
        <div className='border w-max p-2 h-max'>
          <Image width={65} height={65} className='object-cover' src={`${urlImage()}${image}`} />
        </div>
      )
    },
    {
      title: 'Nổi bật',
      key: 'is_popular',
      dataIndex: 'is_popular',
      render: (is_popular: boolean) => <Switch checkedChildren='Có' unCheckedChildren='Không' checked={is_popular} />
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: any) => {
        return (
          <ActionTable>
            <p
              onClick={() => {
                handleEdit(record)
              }}
              className='cursor-pointer'
            >
              <EditIcon />
            </p>
            <PopConfirmDelete
              handleDelete={async () => {
                try {
                  setLoading(true)

                  await deleteCategoryAPI(record?.id)
                  message.success('Xóa phân loại thành công')
                  dispatch(setFilterCategory(listFilterCategory.filter((item: CategoryType) => item.id !== record?.id)))
                  dispatch(setAllCategory(listAllCategory.filter((item: CategoryType) => item.id !== record?.id)))
                } catch (error) {
                  console.log(error)
                  message.error('Không thể xóa phân loại')
                } finally {
                  setLoading(false)
                }
              }}
            />
          </ActionTable>
        )
      },
      align: 'center'
    }
  ]

  return (
    <div className='mt-5'>
      <Table columns={columns} dataSource={listFilterCategory} loading={loadingSearch || loading} />
    </div>
  )
}

export default TableListCategory
