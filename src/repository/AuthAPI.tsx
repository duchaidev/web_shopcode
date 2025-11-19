import ApiBase from './api/APIBase'

export const loginAPI = (data: LoginParamsType) => {
  return ApiBase.post('/auth/user', data)
}

export const registerAPI = (data: RegisterParamsType) => {
  return ApiBase.post('/auth/register', data)
}

export const refreshTokenAPI = (data: GetUserParamsType) => {
  return ApiBase.post('/auth/token', data)
}

export const resetPassword = (data: ResetPasswordType) => {
  return ApiBase.post('/auth/confirm-password', data)
}

export const updatePasswordAPI = (data: UpdatePasswordType) => {
  return ApiBase.post('/auth/change-password', data)
}
