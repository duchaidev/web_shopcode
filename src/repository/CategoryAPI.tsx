import ApiBase from './api/APIBase'

export const getCategoryAPI = (body: {
  pagingParams: PagingType
  filterParams: {
    is_popular: string | null
  }
}) => {
  return ApiBase.post('/category/get-list', body)
}

export const addCategoryAPI = (body: { name: string; user_id: number; image: string }) => {
  return ApiBase.post('/category', body)
}
export const updateCategoryAPI = (body: {
  id: number
  name: string
  user_id: number
  image: string
  is_popular: number
}) => {
  return ApiBase.put('/category', body)
}

export const deleteCategoryAPI = (id: number) => {
  return ApiBase.delete(`/category?id=${id}`)
}
