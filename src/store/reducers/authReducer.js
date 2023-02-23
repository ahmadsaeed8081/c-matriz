import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem("token");

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    userToken: token ? token : "",
  },
  reducers: {
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },

    logout: (state, { payload }) => {
      localStorage.removeItem("token");
      state.userToken = null;
    },
  },
});
export const { setUserToken, logout } = authReducer.actions;
export default authReducer.reducer;
