import ApiBase from './api/APIBase'

export const addToCartAPI = (body: {
  product_id: number
  user_id: number
  classify_id: number
  code: string
  note: string
}) => {
  return ApiBase.post('/cart', body)
}
export const getCartAPI = (body: { status_id: number; user_id: number }) => {
  return ApiBase.post('/cart/getcart', body)
}
export const deleteProductCartAPI = (id: number) => {
  return ApiBase.post(`/cart?product_id=${id}`)
}

export const updateCartAPI = (body: {
  product_id: number
  user_id: number
  classify_id: number
  code?: string
  note: string
  cart_id: number
  status_id: number
}) => {
  return ApiBase.post('/cart', body)
}
