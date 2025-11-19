type UserType = {
  id: number
  username: string
  firstName: string
  lastName: string
  role: string
  avatar: string
  full_name: string
  email: string
  qr_admin: {
    nameAccout: string
    nameBank: string
    numberAccout: string
    qrcode: string
    money: number
    content: string
  }[]
  referral_code: string
  role_id: number
  status_id: number
  phone: string
  birthday: string
  sex: string
}

type TokenType = {
  accessToken: string
  refreshToken: string
  expires: string
}

type LoginParamsType = {
  username: string
  password: string
}
type RegisterParamsType = {
  full_name: string
  password: string
  email: string
  qr_admin: {
    nameAccout: string
    nameBank: string
    numberAccout: string
    qrcode: string
    money: number
    content: string
  }[]
}
type UpdatePasswordType = {
  id: string | number
  oldPassword: string
  newPassword: string
}
type ResetPasswordType = {
  email: string
  newPassword: string
  validKey: string
}

type GetUserParamsType = {
  accessToken: string
  refreshToken: string
}
