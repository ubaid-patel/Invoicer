import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './mainSlice'

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
})