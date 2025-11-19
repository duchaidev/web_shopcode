import { Popconfirm, Typography } from 'antd'
import XIcon from '../icons/XIcon'
import { FC } from 'react'
import TickIcon from '../icons/TickIcon'

const ActionConfirmTable: FC<{
  handleSubmit?: () => void
  onCancel?: () => void
}> = ({ handleSubmit, onCancel }) => {
  return (
    <div className={'flex items-center justify-center gap-4'}>
      <div onClick={handleSubmit} className='cursor-pointer'>
        <TickIcon />
      </div>
      <Popconfirm title='Bạn có chắc chắc muốn huỷ?' okText='Đồng ý' cancelText='Hủy' onConfirm={onCancel}>
        <span className={'cursor-pointer'}>
          <XIcon />
        </span>
      </Popconfirm>
    </div>
  )
}

export default ActionConfirmTable
