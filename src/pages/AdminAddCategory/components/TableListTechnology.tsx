import { deleteCategoryAPI } from '@/repository/CategoryAPI'
import { Image, message, Table, TableProps } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import { Switch } from 'antd'
import ActionTable from '@/components/atoms/ActionTable'
import PopConfirmDelete from '@/components/atoms/PopConfirmDelete'
import EditIcon from '@/components/icons/EditIcon'
import { useAppSelector } from '@/stores'
import { deleteTechnologyAPI } from '@/repository/Technology'
type OnChange = NonNullable<TableProps<any>['onChange']>
type Filters = Parameters<OnChange>[1]

const TableListTechnology: FC<{
  loading: boolean
  dataSource: any
  setLoading: any
  setDataSource: any
  handleEdit: any
  filteredInfo: any
  setFilteredInfo: any
}> = ({ loading, dataSource, setLoading, setDataSource, handleEdit, filteredInfo, setFilteredInfo }) => {
  const { listAllCategory } = useAppSelector((state) => state.category)

  const handleChangeTable: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters)
  }

  const columns: any = [
    {
      title: 'STT',
      dataIndex: '',
      key: '',
      render: (text: any, _: any, index: any) => <a>{index + 1}</a>
    },
    {
      title: 'Phân loại',
      dataIndex: 'category_id',
      key: 'category_id',
      render: (category_id: any) => {
        const category = listAllCategory.find((item: any) => item.id === category_id)
        return category?.name
      },
      filters: listAllCategory,
      filteredValue: filteredInfo.category_id || null,
      filterSearch: true
    },
    {
      title: 'Tên công nghệ',
      dataIndex: 'name',
      key: 'name'
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

                  await deleteTechnologyAPI(record?.id)
                  message.success('Xóa phân loại thành công')
                  setDataSource((prev: any) => prev.filter((item: any) => item.id !== record?.id))
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
      <Table columns={columns} onChange={handleChangeTable} dataSource={dataSource} loading={loading} />
    </div>
  )
}

export default TableListTechnology
