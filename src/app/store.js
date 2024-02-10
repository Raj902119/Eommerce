import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import orderReducer from "./orderSlice"
import UserOrdersReducer from "./UserSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'



const rootReducer = combineReducers({
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  order: orderReducer,
  user: UserOrdersReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // Add any configuration options here
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);