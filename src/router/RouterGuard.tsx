import usePermissionCheck from "@/hooks/usePermissionCheck";
import { useAppSelector } from "@/lib/redux/hooks";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export const PublicRoute = () => {
  const { isAuthenticated, role } = useAppSelector((state) => state.user);
  const to =
    role === "admin" ? "/dashboard" : role === "manager" ? "/projects" : "/";
  if (isAuthenticated) return <Navigate to={to} replace />;

  return <Outlet />;
};

export const RoleBasedRoute = () => {
  const { pathname } = useLocation();
  const moduleName = pathname === "/" ? "profile" : pathname.split("/")[1];
  const [read] = usePermissionCheck(["read"], moduleName);

  return read ? <Outlet /> : <Navigate to="/unauthorized" />;
};
