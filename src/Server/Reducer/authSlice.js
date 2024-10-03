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
    memberGroupList: JSON.parse(localStorage.getItem("memberGroupList")) || [],
    memberList: JSON.parse(localStorage.getItem("memberList")) || [],
    orgList: JSON.parse(localStorage.getItem("orgList")) || [],
    userList: JSON.parse(localStorage.getItem("userList")) || [],
    routeList: JSON.parse(localStorage.getItem("routeList")) || [],
    menuList: JSON.parse(localStorage.getItem("menuList")) || [],
    orgPosList: JSON.parse(localStorage.getItem("orgPosList")) || [],
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
    createOrgList: (state, action) => {
      state.orgList = action.payload;
      localStorage.setItem("orgList", JSON.stringify(action.payload));
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
    createMemberGroupList: (state, action) => {
      state.memberGroupList = action.payload;
      localStorage.setItem("memberGroupList", JSON.stringify(action.payload));
    },
    createMemberList: (state, action) => {
      state.memberList = action.payload;
      localStorage.setItem("memberList", JSON.stringify(action.payload));
    },
    createUserList: (state, action) => {
      state.userList = action.payload;
      localStorage.setItem("userList", JSON.stringify(action.payload));
    },
    createRouteList: (state, action) => {
      state.routeList = action.payload;
      localStorage.setItem("routeList", JSON.stringify(action.payload));
    },
    createMenuList: (state, action) => {
      state.menuList = action.payload;
      localStorage.setItem("menuList", JSON.stringify(action.payload));
    },
    createOrgPositionList: (state, action) => {
      state.orgPosList = action.payload;
      localStorage.setItem("orgPosList", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.org = null;
      state.user = null;
      state.roll = null;
      state.rollList = [];
      state.memberGroupList = [];
      state.userList = [];
      state.orgList = [];
      state.routeList = [];
      state.menuList = [];
      state.memberList = [];
      state.orgPosList = [];
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("org");
      localStorage.removeItem("user");
      localStorage.removeItem("roll");
      localStorage.removeItem("rollList");
      localStorage.removeItem("memberGroupList");
      localStorage.removeItem("userList");
      localStorage.removeItem("orgList");
      localStorage.removeItem("routeList");
      localStorage.removeItem("menuList");
      localStorage.removeItem("memberList");
      localStorage.removeItem("orgPosList");
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
  createMemberGroupList,
  createUserList,
  createOrgList,
  createRouteList,
  createMenuList,
  createMemberList,
  createOrgPositionList,
} = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectUser = (state) => state.auth.user;
export const selectOrg = (state) => state.auth.org;
export const selectRoll = (state) => state.auth.roll;
export const getRollList = (state) => state.auth.rollList;
export const getMemberGroupList = (state) => state.auth.memberGroupList;
export const getUserList = (state) => state.auth.userList;
export const getOrgList = (state) => state.auth.orgList;
export const getRouteList = (state) => state.auth.routeList;
export const getMenuList = (state) => state.auth.menuList;
export const getMemberList = (state) => state.auth.memberList;
export const getOrgPosList = (state) => state.auth.orgPosList;
export default authSlice.reducer;
