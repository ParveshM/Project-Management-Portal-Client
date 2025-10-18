import type { AuthPayload } from "@/types";
import { setItem } from "@/utils";
import { authAPI } from "@/utils/api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (data: AuthPayload, { rejectWithValue }) => {
    try {
      const { token, user } = await authAPI.login(data);
      setItem("accessToken", token);
      return {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        isAuthenticated: true,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
