export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MANAGER: "manager",
} as const;

type ROLES = (typeof USER_ROLES)[keyof typeof USER_ROLES];

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
  createdAt?: string;
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
