import type { USER_ROLES } from "@/constants";

export type ROLES = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type AuthPayload = {
  username: string;
  password: string;
  role: ROLES;
};
export type User = {
  _id: string;
  name: string;
  username: string;
  role: ROLES;
  createdBy?: User;
  createdAt: string;
};
export type ProjectStatus = "pending" | "in-progress" | "completed";
export type Project = {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate?: string;
  managerId: User;
  members?: User[];
  createdAt: string;
};

export type ProjectStatistics = {
  totalProject: {
    count: number;
  }[];
  projectByStatus: {
    count: number;
    status: Project["status"];
  }[];
};

export type UserStatistics = {
  dailyCounts: { count: number; date: string }[];
  totalCount: number;
};

export type PaginatedApiResponse<T> = {
  data: T[];
  count: number;
};
