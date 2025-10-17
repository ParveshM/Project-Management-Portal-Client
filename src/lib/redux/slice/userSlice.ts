import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../middleware/auth.middleware";

// Define the initial state using that type
const initialState = {
  id: "",
  name: "",
  username: "",
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
