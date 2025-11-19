import ImageAutoScrollCart from '@/components/atoms/ImageAutoScrollCart'
import DeleteIcon from '@/components/icons/DeleteIcon'
import VndIcon from '@/components/icons/VndIcon'
import { moneyFormat } from '@/ultils/function'
import { Checkbox, Select } from 'antd'

const ItemProductCart = ({ item }: { item: any }) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  console.log(item)
  return (
    <div className='border-t pt-5 py-8 w-full px-3'>
      <div className='min-w-full flex justify-between'>
        <Checkbox value={item.cart_id} className='w-full'>
          <div
            className='flex gap-3'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            <div className='w-64 p-1 border rounded-md'>
              <ImageAutoScrollCart image={item.image_url} />
            </div>

            <div className='flex flex-col'>
              <span className='font-semibold text-lg'>{item.product_name}</span>
              <span>
                by: <span className='text-secondary'>{item.sell_by}</span>
              </span>
              <div className='mt-3 flex flex-col gap-1'>
                <span className='font-medium'>Phân loại</span>
                <Select
                  defaultValue={item.classify_name}
                  style={{ width: 260 }}
                  onChange={handleChange}
                  options={[
                    { value: 'jack', label: 'Jack' },
                    { value: 'lucy', label: 'Lucy' },
                    { value: 'Yiminghe', label: 'yiminghe' },
                    { value: 'disabled', label: 'Disabled', disabled: true }
                  ]}
                />
              </div>
            </div>
          </div>
        </Checkbox>
        <div className='flex flex-col items-center gap-8 justify-around py-2'>
          <button onClick={() => {}} className='hover:bg-red-50 transition-all p-2 rounded-full'>
            <DeleteIcon />
          </button>
          <span className='font-semibold text-lg flex items-center gap-[1px]'>
            <span className='-translate-y-[2px]'>{moneyFormat(+item.price)}</span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default ItemProductCart
