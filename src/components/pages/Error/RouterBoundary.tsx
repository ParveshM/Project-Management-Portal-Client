import { isRouteErrorResponse, useRouteError } from "react-router";
import { ErrorPage } from "./ErrorPage";

export const RouterErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <ErrorPage />;
  }
  return <ErrorPage />;
};
