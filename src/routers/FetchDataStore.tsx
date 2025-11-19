import { getCartAPI } from '@/repository/CartAPI'
import { getCategoryAPI } from '@/repository/CategoryAPI'
import { urlImage } from '@/repository/ImageUrl'
import { useAppDispatch, useAppSelector } from '@/stores'
import { setAllCart } from '@/stores/CartSlice'
import { setAllCategory } from '@/stores/Category'
import { STATUS_CART } from '@/ultils/constant/status'
import { useEffect } from 'react'

const FetchDataStore = () => {
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const fetchDataCategory = async () => {
    try {
      const res: any = await getCategoryAPI({
        pagingParams: {
          isPaging: false,
          keyword: '',
          orderBy: '',
          pageIndex: 0,
          pageSize: 100
        },
        filterParams: {
          is_popular: null
        }
      })
      dispatch(
        setAllCategory(
          res?.data?.data?.map((item: any) => ({
            ...item,
            label: item.name,
            value: item.id,
            desc: item.name,
            key: item.id,
            text: item.name,
            image: `${urlImage()}${item.image}`
          }))
        )
      )
    } catch (err) {}
  }

  const fetchDataCart = async () => {
    try {
      const res: any = await getCartAPI({
        status_id: STATUS_CART.INCART,
        user_id: user.id
      })
      dispatch(setAllCart(res.result))
    } catch (err) {}
  }

  useEffect(() => {
    fetchDataCategory()
  }, [])
  useEffect(() => {
    if (user.id) fetchDataCart()
  }, [user.id])
  return null
}

export default FetchDataStore
