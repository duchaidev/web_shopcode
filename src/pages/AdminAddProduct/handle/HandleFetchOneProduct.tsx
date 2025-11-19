import { urlImage } from '@/repository/ImageUrl'
import { getOneProductAPI } from '@/repository/ProductApi'
import { TYPEIMAGE } from '@/ultils/constant/typeImage'
import { message } from 'antd'
import React, { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface IProps {
  form: any
  formClassify: any
  setEditorData: any
  setFile: any
  setFileImage: any
  setFileListImage: any
  setFileList: any
}

const HandleFetchOneProduct: FC<IProps> = ({
  form,
  formClassify,
  setEditorData,
  setFile,
  setFileImage,
  setFileListImage,
  setFileList
}) => {
  const location = useLocation()
  const slugProduct = location.pathname.split('/')[3]
  const fetchOneProduct = async () => {
    try {
      const res = await getOneProductAPI(slugProduct)
      const data = res.data
      form.setFieldsValue({
        ...data,
        categories: data.categories.map((item: any) => item.id),
        technologies: data.technologies.map((item: any) => item.id)
      })
      formClassify.setFieldsValue({
        classifyData: data.classify.map((item: any) => ({
          name: item.name,
          price: item.price,
          url_download: item.url_download,
          id: item.id
        }))
      })
      // setFileUrl([record.image])
      setEditorData(data.description)
      setFile(data.images.filter((item: any) => item.type === TYPEIMAGE.IMAGE_MAIN).map((item: any) => item.url))
      setFileList(data.images.filter((item: any) => item.type === TYPEIMAGE.IMAGE_SUB).map((item: any) => item.url))
      setFileImage(
        data.images
          .map((item: any) => {
            if (item.type === TYPEIMAGE.IMAGE_MAIN) {
              return { url: `${urlImage()}${item.url}` }
            }
          })
          .filter((item: any) => item)
      )
      setFileListImage(
        data.images
          .map((item: any) => {
            if (item.type === TYPEIMAGE.IMAGE_SUB) {
              return { url: `${urlImage()}${item.url}` }
            }
          })
          .filter((item: any) => item)
      )
    } catch (error) {
      message.error('Lấy dữ liệu thất bại')
    }
  }

  useEffect(() => {
    if (slugProduct) fetchOneProduct()
  }, [slugProduct])
  return null
}

export default HandleFetchOneProduct
