"use client"; // Ensures the code runs client-side in Next.js

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import Chart to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesDataChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "New Customers",
        data: [200, 250, 220, 320, 290, 370, 240, 180, 210, 220, 190, 160],
      },
    ],
  });

  const chartOptions: ApexOptions = {
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 3,
      colors: ["#EF4444"],
      curve: 'smooth'
    },
    grid: {
      strokeDashArray: 0, // Dashed grid lines
      borderColor: "#E9ECEF", // Grid line color
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val} new customers`, // Tooltip format
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // X-axis categories
      axisBorder: {
        show: false, // Hide X-axis border
      },
      labels: {
        style: {
          fontSize: "12px", // Font size for X-axis labels
          colors: ["#7B91B0"], // X-axis label color
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px", // Font size for Y-axis labels
          colors: ["#A0AEC0"], // Y-axis label color
        },
      },
    },
    legend: {
      show: true, // Display legend
      position: "top", // Place the legend at the top
      horizontalAlign: "right", // Align legend to the right
      labels: {
        colors: "#333", // Legend text color
      },
      markers: {
        fillColors: ["#F95F53"], // Marker color
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 md:p-6 mb-10" style={{ boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
      <div
        className="control"
        style={{
          margin: 'auto',
          height: "302px"
        }}>
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-lg font-semibold text-gray-900">
            Борлуулалтын мэдээ
          </h5>
          <div className="flex space-x-2">
            <button className="border rounded-lg px-4 py-1 text-sm">
              Хугацаа
            </button>
            <button className="border rounded-lg px-4 py-1 text-sm">
              Төрөл
            </button>
          </div>
        </div>
        <Chart options={chartOptions} series={chartData.series} type="line" />
      </div>
    </div>
  );
};

export default SalesDataChart;
