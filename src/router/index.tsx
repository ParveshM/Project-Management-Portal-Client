import App from "@/App";
import { RouterErrorBoundary } from "@/components/pages/Error/RouterBoundary";
import NotFound from "@/pages/Error/404";
import Unauthorized from "@/pages/Error/Unauthorized";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute, PublicRoute, RoleBasedRoute } from "./RouterGuard";
import { lazy } from "react";
import Layout from "@/pages/Layout";
const Projects = lazy(() => import("@/pages/manager/Projects"));
const Users = lazy(() => import("@/pages/manager/Users"));
const Dashboard = lazy(() => import("@/pages/admin/Dashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: RouterErrorBoundary,
    children: [
      {
        path: "",
        Component: ProtectedRoute,
        children: [
          {
            path: "",
            Component: RoleBasedRoute,
            children: [
              {
                path: "/",
                Component: Home,
              },
              {
                path: "",
                Component: Layout,
                children: [
                  {
                    path: "/dashboard",
                    Component: Dashboard,
                  },
                  {
                    path: "/users",
                    Component: Users,
                  },
                  {
                    path: "/projects",
                    Component: Projects,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/unauthorized",
        Component: Unauthorized,
      },
      {
        path: "",
        Component: PublicRoute,
        children: [
          {
            path: "/login",
            Component: Login,
          },
          {
            path: "*",
            Component: NotFound,
          },
        ],
      },
    ],
  },
]);

export default router;
