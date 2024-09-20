import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socketConnection: null,
  },
  reducers: {
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload;
    },
  },
});

export const { setSocketConnection } = socketSlice.actions;
export default socketSlice.reducer;
