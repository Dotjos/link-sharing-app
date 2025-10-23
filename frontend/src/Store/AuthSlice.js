// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
// import { startTokenRefreshTimer } from "../utilitis/tokenManager";

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  user: null,
  isAuthenticated: !!token,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      console.log(state.user);
      // localStorage.setItem("token", token);
      // startTokenRefreshTimer(); // 🕐 start refresh timer here
    },
    restoreSession: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        // startTokenRefreshTimer(); // 🕐 resume timer on app reload
      }
    },
  },
});

export const { loginSuccess, restoreSession } = AuthSlice.actions;
export default AuthSlice.reducer;
