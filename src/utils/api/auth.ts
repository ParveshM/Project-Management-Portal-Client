import type { AuthPayload, User } from "@/types";
import { authInstance, publicInstance } from "../axios";

export const authAPI = {
  login: async (payload: AuthPayload) => {
    const { data } = await publicInstance.post("/user/login", payload);
    return data?.data as {
      token: string;
      user: Pick<User, "_id" | "name" | "username" | "role">;
    };
  },

  registerUser: async (payload: AuthPayload) => {
    const { data } = await authInstance.post("/user/register", payload);
    return data?.data as User;
  },
};
