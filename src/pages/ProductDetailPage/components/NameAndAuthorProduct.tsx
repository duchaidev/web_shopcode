import { Breadcrumb, Tag } from 'antd'
import React, { FC } from 'react'

const NameAndAuthorProduct: FC<{
  dataProduct: any
}> = ({ dataProduct }) => {
  return (
    <div>
      <Breadcrumb
        separator='>'
        items={[
          {
            title: (dataProduct?.categories?.length > 0 && dataProduct?.categories[0]?.name) || '',
            href: '/category/' + (dataProduct?.categories?.length > 0 ? dataProduct?.categories[0]?.slug : '')
          },
          {
            title: dataProduct?.name
          }
        ]}
      />
      <div className='flex flex-col gap-2'>
        <p className='font-bold text-2xl text-gray-700 tracking-wide'>{dataProduct?.name}</p>
        <p className='flex items-center gap-2'>
          <img
            src='https://images.unsplash.com/photo-1712312610859-eeacc9d9e9f7?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='avatar'
            className='w-5 h-5 rounded-full object-cover'
          />
          <span>{dataProduct?.user_name}</span>
          <Tag bordered={false} color='cyan'>
            Active
          </Tag>
        </p>
      </div>
    </div>
  )
}

export default NameAndAuthorProduct
