import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../middleware/api/apiSlice"
import authReducer from '../services/slices/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true // change to false in production
})