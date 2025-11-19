import { addProductAPI, updateProductAPI } from '@/repository/ProductApi'
import { useAppSelector } from '@/stores'
import { message, Button } from 'antd'
import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

interface HandleSubmitProps {
  form: any
  formClassify: any
  editorData: string
  file: any
  fileList: any
  setLoading: any
}

const HandleSubmit: FC<HandleSubmitProps> = ({ form, formClassify, editorData, file, fileList, setLoading }) => {
  const { user } = useAppSelector((state) => state.user)
  const location = useLocation()
  const slugProduct = location.pathname.split('/')[3]

  const submit = async () => {
    const values = await form.validateFields()
    const valuesClassify = await formClassify.validateFields()
    if (!values.name) return message.error('Vui lòng nhập tên sản phẩm')
    if (!editorData) return message.error('Vui lòng nhập mô tả')
    if (file.length === 0 || fileList.length === 0) return message.error('Vui lòng thêm ảnh sản phẩm')
    if (values.categories.length === 0) return message.error('Vui lòng chọn phân loại')
    if (values.technologies.length === 0) return message.error('Vui lòng chọn công nghệ sử dụng')
    if (valuesClassify.classifyData.length === 0) return message.error('Vui lòng thêm ít nhất 1 phân loại')

    const dataSubmit = {
      productData: {
        ...values,
        description: editorData,
        images: [...file, ...fileList],
        user_id: user.id,
        is_popular: values.is_popular
      },
      classifyData: valuesClassify.classifyData
    }

    try {
      setLoading(true)
      if (!slugProduct) {
        await addProductAPI(dataSubmit)
        message.success('Thêm sản phẩm thành công')
      }
      if (slugProduct) {
        await updateProductAPI(dataSubmit)
        message.success('Sửa sản phẩm thành công')
      }
    } catch (err) {
      message.error('Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

  // Trả về nút nhấn để submit, nhưng không thực sự cần thiết
  return (
    <Button type='primary' size='large' onClick={submit}>
      Lưu và hiển thị
    </Button>
  )
}

export default HandleSubmit
