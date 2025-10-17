import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}
const nonRetryableErrors = [400, 401, 403, 404, 500, 502, 503, 504];
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          if (nonRetryableErrors.includes(error.response?.status as number))
            return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  useEffect(() => {
    window.__TANSTACK_QUERY_CLIENT__ = queryClient;
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster richColors theme="light" />
      </QueryClientProvider>
    </>
  );
}

export default App;
