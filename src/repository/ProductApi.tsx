import ApiBase from './api/APIBase'

export const getListProductByFilterAPI = (body: {
  pagingParams: PagingType
  filterParams: {
    user_id: string | number | null
    categories: any[]
    technologies: string[]
    is_popular: number | string | null
  }
}) => {
  return ApiBase.post('/product/get-list', body)
}
export const getOneProductAPI = (slug: string) => {
  return ApiBase.get(`/product?slug_product=${slug}`)
}
export const deleteProductAPI = (id: string | number) => {
  return ApiBase.delete(`/product?id=${id}`)
}
export const updateProductAPI = (body: ProductType) => {
  return ApiBase.patch(`/product`, body)
}
export const addProductAPI = (body: ProductType) => {
  return ApiBase.post(`/product`, body)
}
