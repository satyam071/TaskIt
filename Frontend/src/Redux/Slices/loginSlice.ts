import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
}

interface LoginState {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
}

const initialState: LoginState = {
  user: null,
  isLoggedIn: false,
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginStart:(state)=>{
      state.loading= true;
    },
    loginSuccess:(state,action:PayloadAction<User>)=>{
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload

    },
    loginFailure:(state)=>{
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    logout:(state)=>{
      state.user = null;
      state.isLoggedIn = false
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout
}=loginSlice.actions

export default loginSlice.reducer
