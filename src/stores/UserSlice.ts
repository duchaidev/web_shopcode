import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  user: {} as UserType,
  token: {
    accessToken: '',
    refreshToken: '',
    expires: ''
  } as TokenType
}

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    setTokenUser: (state, action: PayloadAction<TokenType>) => {
      state.token = action.payload
    }
  }
})

export const { setUser, setTokenUser } = UserSlice.actions
export default UserSlice
