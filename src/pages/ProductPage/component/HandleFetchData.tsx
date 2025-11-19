import { getListProductByFilterAPI } from '@/repository/ProductApi'
import { getTechnologyAPI } from '@/repository/Technology'
import { useAppSelector } from '@/stores'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HandleFetchData = ({
  setCategory,
  setDataProducts,
  setTechnology,
  technology,
  option,
  textSearch,
  setLoading
}: {
  setCategory: any
  setDataProducts: any
  setTechnology: any
  technology: any
  option: any
  textSearch: string
  setLoading: any
}) => {
  const { listAllCategory } = useAppSelector((state) => state.category)
  const location = useLocation()
  const slugCategory = location.pathname.split('/')[2]
  useEffect(() => {
    setCategory(listAllCategory?.find((item) => item.slug === slugCategory))
  }, [slugCategory, listAllCategory])

  const fetchDataProducts = async () => {
    setLoading(true)
    try {
      const res = await getListProductByFilterAPI({
        pagingParams: {
          isPaging: false,
          pageSize: 2,
          keyword: textSearch || '',
          orderBy: option !== '1' ? option : '',
          pageIndex: 1
        },
        filterParams: {
          user_id: null,
          categories:
            slugCategory === 'free'
              ? []
              : slugCategory === 'all'
              ? []
              : [listAllCategory?.find((item) => item.slug === slugCategory)?.id],
          technologies: technology?.some((item: any) => item.active === true && item.key === 0)
            ? []
            : technology?.filter((item: any) => item.active).map((item: any) => item.key),
          is_popular: option === '1' ? +option : null
        }
      })
      setDataProducts(res.data?.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDataTechnology = async () => {
    try {
      const res: any = await getTechnologyAPI({
        pagingParams: {
          isPaging: false,
          keyword: '',
          orderBy: '',
          pageIndex: 0,
          pageSize: 100
        },
        filterParams: {
          category_id: [listAllCategory?.find((item) => item.slug === slugCategory)?.id]
        }
      })
      setTechnology([
        { value: 'All Products', active: true, key: 0 },
        ...res.data?.data?.map((item: any) => ({ value: item.name, active: false, key: item.id }))
      ])
    } catch (err) {}
  }

  useEffect(() => {
    fetchDataTechnology()
  }, [slugCategory, listAllCategory])

  useEffect(() => {
    fetchDataProducts()
  }, [technology, option, textSearch])

  return null
}

export default HandleFetchData
