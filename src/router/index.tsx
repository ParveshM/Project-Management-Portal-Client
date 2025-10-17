import App from "@/App";
import { RouterErrorBoundary } from "@/components/pages/Error/RouterBoundary";
import Dashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/Error/404";
import Unauthorized from "@/pages/Error/Unauthorized";
import Home from "@/pages/Home";
import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import Projects from "@/pages/manager/Projects";
import Users from "@/pages/manager/Users";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: RouterErrorBoundary,
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
      {
        path: "/unauthorized",
        Component: Unauthorized,
      },
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
]);

export default router;
