import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  showUserDetails: false,
  showSearchUserModal: false,
  onlineUsers: [],
  // socketConnection: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.profile_pic = action.payload?.profile_pic;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    logoutUser: (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.profile_pic = "";
      state.token = "";
      state.socketConnection = ""
    },

    setShowUserDetails: (state, action) => {
      state.showUserDetails = action.payload;
    },

    setShowUserSearchModal: (state, action) => {
      state.showSearchUserModal = action.payload;
    },

    setOnlineUsers: (state, action)=>{
      state.onlineUsers = action.payload
    },

    // setSocketConnection: (state, action)=>{
    //   state.socketConnection = action.payload
    // }
  },
});

export const {
  setUser,
  setToken,
  logoutUser,
  setShowUserDetails,
  setShowUserSearchModal,
  setOnlineUsers,
  // setSocketConnection,
} = userSlice.actions;

export default userSlice.reducer;
