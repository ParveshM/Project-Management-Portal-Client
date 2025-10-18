import { Outlet } from "react-router-dom";
import Navbar from "../../components/pages/Layout/Navbar";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="pt-20 p-4">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

export default Layout;
