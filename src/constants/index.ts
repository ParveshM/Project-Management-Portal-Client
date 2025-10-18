import type { ROLES } from "@/types";

export const navLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },

  {
    name: "Projects",
    path: "/projects",
  },
  {
    name: "Users",
    path: "/users",
  },
];
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MANAGER: "manager",
} as const;
export type CRUD_Actions = "create" | "edit" | "delete" | "read";
// add routes that need can be read should be added to roles
export const ROLE_PERMISSIONS: Record<
  ROLES,
  { [field: string]: CRUD_Actions[] }
> = {
  admin: {
    dashboard: ["create", "edit", "delete", "read"],
    projects: ["create", "edit", "delete", "read"],
    users: ["create", "edit", "delete", "read"],
  },
  manager: {
    projects: ["create", "edit", "read"],
    users: ["create", "edit", "read"],
  },
  user: {
    profile: ["read"],
  },
};
