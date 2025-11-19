import { urlImage } from '@/repository/ImageUrl'
import { getOneProductAPI } from '@/repository/ProductApi'
import { TYPEIMAGE } from '@/ultils/constant/typeImage'
import { message } from 'antd'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface IProps {
  loading: boolean
  setLoading: any
  setImages: any
  setDataProduct: any
}
const HandleFetchProduct = ({ loading, setLoading, setImages, setDataProduct }: IProps) => {
  const location = useLocation()
  const slugProduct = location.pathname.split('/')[2]
  const fetchOneProduct = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await getOneProductAPI(slugProduct)
      setDataProduct(res.data)
      setImages(
        res.data.images
          .sort((a: any, b: any) => (a.type === TYPEIMAGE.IMAGE_MAIN ? -1 : b.type === TYPEIMAGE.IMAGE_MAIN ? 1 : 0))
          .map((item: any) => ({
            original: `${urlImage()}${item.url}`,
            thumbnail: `${urlImage()}${item.url}`
          }))
      )
    } catch (error) {
      message.error('Lấy dữ liệu thất bại')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (slugProduct) fetchOneProduct()
  }, [slugProduct])
  return null
}

export default HandleFetchProduct
