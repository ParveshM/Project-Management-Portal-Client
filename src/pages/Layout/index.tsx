import { Outlet } from "react-router-dom";
import Navbar from "../../components/pages/Layout/Navbar";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="pt-20 p-4">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
