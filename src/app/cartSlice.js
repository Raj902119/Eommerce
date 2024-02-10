import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddItem, fetchAllUserItems, UpdateCart, DeleteCart,resetCart } from '../utils/cartAPI';

const initialState = {
  items: [],
  status: 'idle',
  cartLoaded:false
};

export const addItemAsync = createAsyncThunk(
  'cart/addItem',
  async (item) => {
    const response = await AddItem(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllUserItemsAsync = createAsyncThunk(
  'cart/fetchAllUserItems',
  async () => {
    const response = await fetchAllUserItems();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await UpdateCart(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCart',
  async (delId) => {
    const response = await DeleteCart(delId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchAllUserItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUserItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchAllUserItemsAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })  
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex((item)=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [];
      });
  },
});

export const TotalItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;