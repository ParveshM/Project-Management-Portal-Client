import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/index.tsx";
import { Provider } from "react-redux";
import "./index.css";
import store, { persistor } from "./lib/redux/store.ts";
import { ErrorBoundary } from "./components/pages/Error/ErrorBoundary.tsx";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
