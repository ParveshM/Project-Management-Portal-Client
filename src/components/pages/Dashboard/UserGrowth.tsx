import { type ApexOptions } from "apexcharts";
import Chart from "@/components/Chart";
import { getChartData } from "@/utils";
import { useMemo } from "react";
// import { useTheme, type Theme } from "@/context/ThemeProvider";
const getOptions = (theme: string): ApexOptions => ({
  chart: {
    toolbar: { show: false },
    background: "transparent",
    fontFamily: "Inter, sans-serif",
  },

  stroke: {
    curve: "smooth",
    width: 2,
  },

  tooltip: {
    theme: theme === "dark" ? "dark" : "light",
  },

  xaxis: {
    type: "category",
    labels: {
      style: {
        colors: theme === "dark" ? "#EAEAEA" : "#1A1A1A",
        fontWeight: 500,
      },
    },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },

  yaxis: {
    labels: {
      style: {
        colors: theme === "dark" ? "#EAEAEA" : "#1A1A1A",
        fontWeight: 600,
      },
    },
  },

  // 🎨 Your Palette
  colors:
    theme === "dark"
      ? ["#8B5CF6", "#00B8A9", "#F5C542", "#F97316", "#EAEAEA"]
      : ["#635BFF", "#00A4B4", "#FACC15", "#E11D48", "#1A1A1A"],

  markers: {
    size: 0,
    hover: { sizeOffset: 3 },
  },

  dataLabels: { enabled: false },

  grid: {
    borderColor: theme === "dark" ? "#2A2A2A" : "#E4E4E7",
    strokeDashArray: 4,
  },

  legend: {
    show: true,
    labels: {
      colors: theme === "dark" ? "#EAEAEA" : "#1A1A1A",
    },
  },
});
const UserGrowth = () => {
  //   const { theme } = useTheme();
  const chartData = useMemo(() => {
    return [
      {
        name: "Users",
        data: getChartData({
          data: [
            { date: "2025-10-10", count: 150 },
            { date: "2025-10-11", count: 230 },
            { date: "2025-10-12", count: 180 },
            { date: "2025-10-13", count: 290 },
            { date: "2025-10-14", count: 250 },
            { date: "2025-10-15", count: 320 },
            { date: "2025-10-16", count: 410 },
          ],

          dateKey: "date",
          labelKey: "count",
        }),
      },
    ];
  }, []);
  const options = getOptions("light");
  return (
    <div className="h-fit min-h-[260px] sm:min-h-[300px] py-3 bg-primary/5 p-3 rounded-sm">
      <div className="flex items-center justify-between gap-2">
        <h2
          className="text-primary 
         text-lg sm:text-xl font-medium"
        >
          User Growth
        </h2>
      </div>
      <Chart options={options} data={chartData} type="area" />
    </div>
  );
};

export default UserGrowth;
