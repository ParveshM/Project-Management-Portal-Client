import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../middleware/auth.middleware";

const initialState = {
  id: "",
  name: "",
  username: "",
  role: "",
  isAuthenticated: false,
} as const;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
    builder.addCase(logout.rejected, (state) => {
      Object.assign(state, initialState);
    });
  },
});

export default userSlice.reducer;
