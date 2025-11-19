import { Button, Form, Input, InputNumber, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/es/input/TextArea'
import { FC } from 'react'

const AddClassify: FC<{ form: any }> = ({ form }) => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
  }
  return (
    <Form name='dynamic_form_nest_item' onFinish={onFinish} autoComplete='off' form={form} labelCol={{ span: 2 }}>
      <Form.List name='classifyData'>
        {(fields, { add, remove }) => (
          <>
            <Form.Item label='Phân loại' rules={[{ required: true, message: 'Thêm ít nhất 1 phân loại!' }]}>
              <div className='w-[300px]'>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm loại
                </Button>
              </div>
            </Form.Item>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className='grid grid-cols-12 gap-3 w-full items-baseline'>
                <input className='col-span-1'></input>

                <Form.Item {...restField} name={[name, 'id']} className='col-span-2' hidden>
                  <Input placeholder='Nhập tên loại' />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Nhập tên loại' }]}
                  className='col-span-2'
                >
                  <Input
                    count={{
                      show: true,
                      max: 20
                    }}
                    placeholder='Nhập tên loại'
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'price']}
                  className='col-span-2'
                  rules={[{ required: true, message: 'Nhập giá' }]}
                >
                  <InputNumber
                    className='w-full'
                    formatter={(value) => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'url_download']}
                  className='col-span-2'
                  rules={[{ required: true, message: 'Nhập link download' }]}
                >
                  <Input placeholder='Link download' className='w-full' />
                </Form.Item>

                <MinusCircleOutlined onClick={() => remove(name)} className='col-span-2' />
              </div>
            ))}
          </>
        )}
      </Form.List>
    </Form>
  )
}

export default AddClassify
