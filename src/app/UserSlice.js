import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders,UpdateUserProfile,fetchLoggedInUser } from "../utils/UserAPI";


const initialState = {
    //initial state for authSlice
    status: 'idle',
    UserProfile: { orders: null } // this info will be used in case of detailed user info, while auth will 
    // only be used for loggedInUser id etc checks
  };

  export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async () => {
      const response = await fetchLoggedInUserOrders();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const UpdateUserProfileAsync = createAsyncThunk(
    'user/UpdateUser',
    async (updateUser) => {
      const response = await UpdateUserProfile(updateUser);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

  export const fetchLoggedInUserAsync = createAsyncThunk(
    'user/fetchLoggedInUser',
    async () => {
      const response = await fetchLoggedInUser();
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );
export const  UserOrdersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      increment: (state) => {
        state.value += 1;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.UserProfile.orders=action.payload;
        })
        .addCase(UpdateUserProfileAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(UpdateUserProfileAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.UserProfile=action.payload;
        })
        .addCase(fetchLoggedInUserAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          // this info can be different or more from logged-in User info
          state.UserProfile = action.payload;
        });
    }
});        

export const SelectedUserOrders = (state) => state.user.UserProfile.orders;
export const SelectUserProfile = (state) => state.user.UserProfile;
export const selectUserInfoStatus = (state) => state.user.status;
export default UserOrdersSlice.reducer;