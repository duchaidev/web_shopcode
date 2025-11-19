import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: { listAllCategory: CategoryType[]; listFilterCategory: CategoryType[] } = {
  listAllCategory: [],
  listFilterCategory: []
}

const CategorySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllCategory: (state: any, action: PayloadAction<CategoryType[]>) => {
      state.listAllCategory = action.payload
    },
    setFilterCategory: (state: any, action: PayloadAction<CategoryType[]>) => {
      state.listFilterCategory = action.payload
    }
  }
})

export const { setAllCategory, setFilterCategory } = CategorySlice.actions
export default CategorySlice
