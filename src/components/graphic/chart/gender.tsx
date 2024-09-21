"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { GenderGraphicResponse } from "@/types/demo";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type SalesByGenderChartProps = {
  genderList: GenderGraphicResponse;
};

const SalesByGenderChart: React.FC<SalesByGenderChartProps> = ({ genderList }) => {
  const [chartData, setChartData] = useState<{ series: ApexAxisChartSeries; categories: string[] }>({
    series: [],
    categories: []
  });

  useEffect(() => {
    if (genderList && genderList.result) {
      const formattedDates = genderList.result.map((item) => {
        const month = item.date.split("-")[1];
        return parseInt(month, 10).toString();
      });
      const maleSales = genderList.result.map((item) => item.saleMale);
      const femaleSales = genderList.result.map((item) => item.saleFemale);

      setChartData({
        series: [
          {
            name: "Эрэгтэй",
            data: maleSales
          },
          {
            name: "Эмэгтэй",
            data: femaleSales
          }
        ],
        categories: formattedDates
      });
    }
  }, [genderList]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
      foreColor: "#333",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "12px",
        borderRadius: 2.76,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.categories,
      axisBorder: {
        show: true,
        color: "#ccc",
      },
      axisTicks: {
        show: true,
        color: "#ccc",
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#666"],
        },
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "12px",
          color: "#333",
        },

      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#666"],
        },
        formatter: (val: number) => `${val.toString()
          .replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          )}`,
      },
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      opacity: 1,
    },
    colors: ["#344BFD", "#FF9359"],
    legend: {
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: ["#333"],
      },
      markers: {
        shape: 'circle',
      }
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val.toString()
          .replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          )}`,
      },
      theme: "light",
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-6" style={{ height: "351px", boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-md font-bold leading-none text-gray-900 dark:text-white">
            Борлуулалт хүйсээр
          </h5>
        </div>
      </div>
      <Chart options={chartOptions} series={chartData.series} type="bar" height={300} />
    </div>
  );
};

export default SalesByGenderChart;
