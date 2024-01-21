import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrders,UpdateUserProfile } from "../utils/UserAPI";


const initialState = {
    //initial state for authSlice
    UserOrders: [],
    status: 'idle',
    UserProfile: null,  // this info will be used in case of detailed user info, while auth will 
    // only be used for loggedInUser id etc checks
  };

  export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
    'user/fetchLoggedInUserOrders',
    async (userId) => {
      const response = await fetchLoggedInUserOrders(userId);
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
          state.UserOrders=action.payload;
        })
        .addCase(UpdateUserProfileAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(UpdateUserProfileAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          state.UserProfile=action.payload;
        });
    }
});        

export const SelectedUserOrders = (state) => state.user.UserOrders;
export const SelectUserProfile = (state) => state.user.UserProfile;
export default UserOrdersSlice.reducer;