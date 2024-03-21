import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import basketSlice from './slices/basket'
export default configureStore({
    reducer:{
        auth: authSlice,
        basket: basketSlice
    }
})