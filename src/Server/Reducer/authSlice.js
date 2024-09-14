import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    org: JSON.parse(localStorage.getItem("org")) || null,
    roll: JSON.parse(localStorage.getItem("roll")) || null,
    rollList: JSON.parse(localStorage.getItem("rollList")) || [],
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
    userData: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    orgData: (state, action) => {
      state.org = action.payload;
      localStorage.setItem("org", JSON.stringify(action.payload));
    },
    rollData: (state, action) => {
      state.roll = action.payload;
      localStorage.setItem("roll", JSON.stringify(action.payload));
    },
    createRollList: (state, action) => {
      state.rollList = action.payload;
      localStorage.setItem("rollList", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("org");
      localStorage.removeItem("user");
      localStorage.removeItem("roll");
      localStorage.removeItem("rollList");
    },
  },
});

export const {
  setToken,
  setRefreshToken,
  logout,
  userData,
  orgData,
  rollData,
  createRollList,
} = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectUser = (state) => state.auth.user;
export const selectOrg = (state) => state.auth.org;
export const selectRoll = (state) => state.auth.roll;
export const getRollList = (state) => state.auth.rollList;
export default authSlice.reducer;
