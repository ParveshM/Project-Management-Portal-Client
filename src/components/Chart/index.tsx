import { memo } from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({
  data,
  options,
  type,
  ...rest
}: {
  data: any[];
  options: ApexCharts.ApexOptions;
  type?: ReactApexChart["props"]["type"];
}) => {
  return (
    <ReactApexChart
      options={options}
      series={data}
      type={type}
      width="100%"
      height="100%"
      {...rest}
    />
  );
};

export default memo(Chart);
