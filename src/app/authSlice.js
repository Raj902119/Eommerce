import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateUser,loginUser,signout,checkAuth } from '../utils/authAPI';

const initialState = {
  //initial state for authSlice
  loggedInUserToken: null,
  status: 'idle',
  error: null,
  userChecked:false
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

export const loginUserAsync = createAsyncThunk(
  'auth/CheckUser',
  async (logDate) => {
      const response = await loginUser(logDate);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
  }
);


export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log(error);
    }
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
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.error = null;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        console.error(action.error); // Log the error object to the console
        state.error = action.error.message || 'Unknown error occurred';
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })
      .addCase(LogoutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(LogoutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
        state.userChecked = false;
      })
      .addCase(LogoutAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

//export the loggedInUserToken
export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;

export default authSlice.reducer;