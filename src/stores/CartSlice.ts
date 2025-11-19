import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { listAllCart: CategoryType[] } = {
  listAllCart: []
}

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setAllCart: (state: any, action: PayloadAction<CategoryType[]>) => {
      state.listAllCart = action.payload
    }
  }
})

export const { setAllCart } = CartSlice.actions
export default CartSlice
