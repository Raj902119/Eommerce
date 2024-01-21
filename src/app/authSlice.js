import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUser,CheckUser,UpdateUser,signout } from '../utils/authAPI';

const initialState = {
  //initial state for authSlice
  loggedInUser: null,
  status: 'idle',
  error: null,
};

//AsyncThunk handles the asynchronous operation of creating a user by dispatching actions 
export const CreateUserAsync = createAsyncThunk(
  'auth/CreateUser',
  async (userDate) => {
    const response = await CreateUser(userDate);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const CheckUserAsync = createAsyncThunk(
  'auth/CheckUser',
  async (logDate) => {
    const response = await CheckUser(logDate);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const UpdateUserAsync = createAsyncThunk(
  'auth/UpdateUser',
  async (updateUser) => {
    const response = await UpdateUser(updateUser);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const LogoutAsync = createAsyncThunk(
  'auth/Logout',async (userid) => {
    const response = await signout(userid);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

//The slice contains a reducer that handles the state changes based on actions dispatched by the CreateUserAsync thunk.
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(CheckUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CheckUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(CheckUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(LogoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LogoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      })
      .addCase(LogoutAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

//export the loggedInUser
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;