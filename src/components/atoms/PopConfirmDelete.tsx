import { Popconfirm } from 'antd'
import React, { FC } from 'react'
import DeleteIcon from '../icons/DeleteIcon'

const PopConfirmDelete: FC<{
  title?: string
  handleDelete?: any
  propChildren?: any
}> = ({ title, handleDelete, propChildren }) => {
  return (
    <Popconfirm
      title={title || 'Bạn có chắc chắn muốn xoá?'}
      okText='Xóa'
      cancelText='Hủy'
      onConfirm={handleDelete}
      {...propChildren}
    >
      <span className={'cursor-pointer'}>
        <DeleteIcon />
      </span>
    </Popconfirm>
  )
}

export default PopConfirmDelete
