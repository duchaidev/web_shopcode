import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import CommonSlice from './CommonSlice'
import UserSlice from './UserSlice'
import CategorySlice from './Category'
import CartSlice from './CartSlice'

const rootReducer = {
  common: CommonSlice.reducer,
  user: UserSlice.reducer,
  category: CategorySlice.reducer,
  cart: CartSlice.reducer
}

const store = configureStore({ reducer: rootReducer })

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type StoreType = typeof store
export default store
