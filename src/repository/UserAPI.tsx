import ApiBase from './api/APIBase'

export const updateUserAPI = (data: LoginParamsType) => {
  return ApiBase.put('/user', data)
}
