"use client";
import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const SalesByGenderChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Эрэгтэй",
        data: [40, 80, 60, 90, 50], // Male sales data
      },
      {
        name: "Эмэгтэй",
        data: [20, 60, 50, 70, 40], // Female sales data
      },
    ],
  });

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
        columnWidth: "13px", // Adjust for width of bars
        borderRadius: 2.76, // Apply the rounding
        borderRadiusApplication: 'end',
        // endingShape: true 
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
      categories: ["10", "11", "12", "1", "2"], // Month labels
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
          fontSize: "14px",
          colors: ["#666"],
        },
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "14px",
          color: "#333",
        },
      },
      labels: {
        style: {
          fontSize: "14px",
          colors: ["#666"],
        },
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
        formatter: (val) => `${val} sales`,
      },
      theme: "light",
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-6" style={{ height: "351px", boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Борлуулалт хүйсээр
          </h5>
        </div>
      </div>
      <Chart options={chartOptions} series={chartData.series} type="bar" height={300} />
    </div>
  );
};

export default SalesByGenderChart;
