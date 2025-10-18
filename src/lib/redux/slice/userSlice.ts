import { createSlice } from "@reduxjs/toolkit";
import { login } from "../middleware/auth.middleware";
import type { ROLES } from "@/types";

export type User = {
  id: string | null;
  name: string | null;
  username: string | null;
  role: ROLES | null;
  isAuthenticated: boolean;
};
const initialState: User = {
  id: null,
  name: null,
  username: null,
  role: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
