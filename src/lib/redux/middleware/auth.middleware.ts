import type { AuthPayload } from "@/types";
import { removeItem, setItem } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (data: AuthPayload, { rejectWithValue }) => {
    try {
      //   const response = await authAPI.login(data);
      //   const { accessToken, refreshToken } = response.data;
      //   setItem("accessToken", accessToken);
      //   return {
      //     id: decoded.userId,
      //     email: decoded.email,
      //     role: decoded.role,
      //     isAuthenticated: true,
      //   };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  removeItem("accessToken");
});
