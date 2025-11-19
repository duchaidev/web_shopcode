import { Breadcrumb, Button, Radio, RadioChangeEvent, Space, Spin, Tabs, TabsProps, Tag } from 'antd'
import React, { useState } from 'react'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import './productDetail.scss'
import { NavLink, useLocation } from 'react-router-dom'
import PriceAndClassify from './components/PriceAndClassify'
import NameAndAuthorProduct from './components/NameAndAuthorProduct'
import ImageGallery from 'react-image-gallery'
import TabsProduct from './components/TabsProduct'
import KeepExploring from './components/KeepExploring'
import HandleFetchProduct from './components/HandleFetchProduct'
import Description from './components/Description'

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<any[]>([])
  const [dataProduct, setDataProduct] = useState<any>({})

  return (
    <div className='px-[5%] mt-8'>
      <HandleFetchProduct
        loading={loading}
        setLoading={setLoading}
        setImages={setImages}
        setDataProduct={setDataProduct}
      />
      <Spin spinning={loading}>
        <div className='grid grid-cols-10 gap-8'>
          <div className='col-span-10'>
            <NameAndAuthorProduct dataProduct={dataProduct} />
          </div>
          <div className='col-span-7'>
            <ImageGallery
              items={images}
              slideOnThumbnailOver={true}
              showFullscreenButton={false}
              showPlayButton={false}
              slideDuration={150}
              slideInterval={0}
              infinite={false}
              additionalClass='product-detail-image-gallery'
            />
          </div>
          <div className='col-span-3'>
            <PriceAndClassify dataProduct={dataProduct} />
          </div>
          <div className='col-span-7'>
            <Description description={dataProduct.description} />
          </div>
          {/* <div className='col-span-3'>
            <span className='font-semibold text-xl text-gray-700 tracking-wide'>Product Specs</span>
          </div> */}
          <TabsProduct />
        </div>
        <KeepExploring />
      </Spin>
    </div>
  )
}

export default ProductDetailPage
