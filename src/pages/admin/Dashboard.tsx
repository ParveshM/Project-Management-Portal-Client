import { Ministatistics } from "@/components/pages/Dashboard/MiniStatistics";
import UserGrowth from "@/components/pages/Dashboard/UserGrowth";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4  xl:h-[calc(100vh-100px)] ">
      <h1 className="text-lg sm:text-2xl font-medium text-primary">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Ministatistics title="Total Users" value="1,234" />
        <Ministatistics title="Total Projects" value="1,234" />
        <Ministatistics title="Pending Projects" value="1,234" />
        <Ministatistics title="In Progress Projects" value="1,234" />
      </div>
      <UserGrowth />
    </div>
  );
};

export default Dashboard;
