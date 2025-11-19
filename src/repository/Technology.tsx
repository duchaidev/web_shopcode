import ApiBase from './api/APIBase'

export const getTechnologyAPI = (body: {
  pagingParams: PagingType
  filterParams: {
    category_id: any
  }
}) => {
  return ApiBase.post('/technology/get-list', body)
}

export const addTechnologyAPI = (body: { name: string; category_id: number }) => {
  return ApiBase.post('/technology', body)
}
export const updateTechnologyAPI = (body: { id: number; name: string; category_id: string }) => {
  return ApiBase.put('/technology', body)
}

export const deleteTechnologyAPI = (id: number) => {
  return ApiBase.delete(`/technology?id=${id}`)
}
