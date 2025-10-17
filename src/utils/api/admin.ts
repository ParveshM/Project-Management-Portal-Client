import type {
  PaginatedApiResponse,
  Project,
  ProjectStatistics,
  ROLES,
  User,
  UserStatistics,
} from "@/types";
import { authInstance } from "../axios";
type PaginatePayload = { page: number; limit: number };
export const adminAPI = {
  getUserStatistics: async () => {
    const { data } = await authInstance.get("/user/statistics");
    return data?.data as UserStatistics;
  },
  getProjectStatistics: async () => {
    const { data } = await authInstance.get("/projects/statistics");
    return data?.data as ProjectStatistics;
  },

  getAllprojects: async (param: PaginatePayload & { q?: string }) => {
    const { data } = await authInstance.get("/projects", { params: param });
    return data as PaginatedApiResponse<Project>;
  },
  createProject: async (
    payload: Pick<
      Project,
      "name" | "description" | "startDate" | "endDate" | "status"
    >
  ) => {
    const { data } = await authInstance.post("/projects", payload);
    return data?.data as Project;
  },
  updateProject: async (id: string, payload: Partial<Project>) => {
    const { data } = await authInstance.patch(`/projects/${id}`, payload);
    return data?.data as Project;
  },
  deleteProject: async (id: string) => {
    const { data } = await authInstance.delete(`/projects/${id}`);
    return data?.data as Project;
  },

  getAllUsers: async (param: PaginatePayload & { q?: string; role: ROLES }) => {
    const { data } = await authInstance.get("/user", { params: param });
    return data as PaginatedApiResponse<User>;
  },
  updateUser: async (id: string, payload: Partial<User>) => {
    const { data } = await authInstance.patch(`/user/${id}`, payload);
    return data?.data as User;
  },
  deleteUser: async (id: string) => {
    const { data } = await authInstance.delete(`/user/${id}`);
    return data?.data as User;
  },
};
