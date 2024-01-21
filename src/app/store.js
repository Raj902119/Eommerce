import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import orderReducer from "./orderSlice"
import UserOrdersReducer from "./UserSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: UserOrdersReducer,
  },
});