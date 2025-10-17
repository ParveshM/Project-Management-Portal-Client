import { Ministatistics } from "@/components/pages/Dashboard/MiniStatistics";
import UserGrowth from "@/components/pages/Dashboard/UserGrowth";
import { adminAPI } from "@/utils/api/admin";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
const status = ["pending", "in-progress", "completed"];
const Dashboard = () => {
  const { data: projectStatistics } = useQuery({
    queryKey: ["Project Statistics"],
    queryFn: adminAPI.getProjectStatistics,
  });
  const { data: userGrowth } = useQuery({
    queryKey: ["userGrowth"],
    queryFn: adminAPI.getUserStatistics,
  });

  const mapped = useMemo(() => {
    return status.map((s) => {
      const count =
        projectStatistics?.projectByStatus.find((p) => p.status === s)?.count ??
        0;
      return { status: s, count };
    });
  }, [projectStatistics?.projectByStatus]);
  return (
    <div className="flex flex-col gap-4  xl:h-[calc(100vh-100px)] ">
      <h1 className="text-lg sm:text-2xl font-medium text-primary">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <Ministatistics
          title="Total Users"
          value={`${userGrowth?.totalCount ?? 0}`}
        />

        {mapped.map((s, i) => (
          <Ministatistics
            key={i}
            title={`${s.status.replace("-", " ")} Projects`}
            value={`${s.count ?? 0}`}
          />
        ))}
      </div>
      <UserGrowth data={userGrowth ? userGrowth.dailyCounts : []} />
    </div>
  );
};

export default Dashboard;
