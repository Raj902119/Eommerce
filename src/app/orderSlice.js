import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateOrder,fetchAllOrders,updateOrder } from '../utils/orderAPI';
const initialState = {
    orders: [],
    status: 'idle',
    orderStatus:null,
    totalOrders:null,
  };

  export const addOrderAsync = createAsyncThunk(
    'order/addOrder',
    async (order) => {
      const response = await CreateOrder(order);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchAllOrdersAsync = createAsyncThunk(
    'order/fetchAllOrders',
    async ({sort,pagination}) => {
      const response = await fetchAllOrders(sort,pagination);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const updateOrdersAsync = createAsyncThunk(
    'order/updateOrders',
    async (order) => {
      const response = await updateOrder(order);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      resetOrder: (state) => {
        state.orderStatus =null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addOrderAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(addOrderAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders.push(action.payload);
          state.orderStatus = action.payload;
        })
        .addCase(fetchAllOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.orders =action.payload.orders;
          state.totalOrders = action.payload.totalItems;
        })
        .addCase(updateOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          const index = state.orders.findIndex(order=>order.id===action.payload.id)
          state.orders[index] = action.payload;
        });
    },
  });
  export const {resetOrder} = orderSlice.actions;
  export const TotalOrders = (state) => state.order.orders;
  export const OrderStatus = (state) => state.order.orderStatus;
  export const SumofOrders = (state) => state.order.totalOrders;
  export default orderSlice.reducer;  