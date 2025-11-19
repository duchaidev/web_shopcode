import DeleteIcon from '@/components/icons/DeleteIcon'
import { Checkbox, GetProp, Select } from 'antd'
import React from 'react'
import ItemProductCart from './ItemProductCart'
import { useAppSelector } from '@/stores'

const CartInfo = () => {
  const { listAllCart } = useAppSelector((state) => state.cart)
  const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues)
  }

  console.log(listAllCart)
  return (
    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
      {listAllCart.map((item) => (
        <ItemProductCart key={item.id} item={item} />
      ))}
      {/* <ItemProductCart />
      <ItemProductCart />
      <ItemProductCart /> */}
    </Checkbox.Group>
  )
}

export default CartInfo
