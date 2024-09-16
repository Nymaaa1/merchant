"use client"; // Ensures the code runs client-side in Next.js

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { SalesPartnerGraphic } from "@/types/demo";
import { Form } from "react-bootstrap";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type SalesDataChartProps = {
  sales: SalesPartnerGraphic[];
  type: string;
  handleChange: (val: string) => void;
};

interface ChartSeries {
  name: string;
  data: number[];
}

interface ChartData {
  series: ChartSeries[];
}


interface ChooseTypeProps {
  name: string;
  en: string;
}

const SalesDataChart: React.FC<SalesDataChartProps> = ({ sales, type, handleChange }) => {
  const [dates, setDates] = useState<string[]>([]);
  const [typeDate, setTypeDate] = useState<ChooseTypeProps[]>([{ name: "Жилээр", en: "annual" }, { name: "Сараар", en: "monthly" }, { name: "7 хоног", en: "weekly" }]);
  const [typeUser, setTypeUser] = useState<ChooseTypeProps[]>([{ name: "Хэрэглэгчийн тоо", en: "user" }, { name: "Гүйлгээний тоо", en: "transaction" }, { name: "Мөнгөн дүн", en: "amount" }]);
  const [tableDataType, setTableDataType] = useState<string>("amount");
  const [chartData, setChartData] = useState<ChartData>({
    series: [
      {
        name: "New Customers",
        data: [],
      },
    ],
  });
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const changeTableDataType = (val: string) => {
    setTableDataType(val);
    const data = sales.map((item) => val === "amount" ? (item.totalAmount ?? 0) : val === "transaction" ? (item.totalCount ?? 0) : (item.customerCount ?? 0));
    setChartData({
      series: [
        {
          name: "New Customers",
          data: data,
        },
      ],
    });
  };

  useEffect(() => {
    if (sales) {
      const formattedDates = sales.map((item) => {
        const date = new Date(item.xaxis);
        const monthIndex = date.getMonth();
        return monthNames[monthIndex];
      });
      setDates(formattedDates);
      const data = sales.map((item) => item.totalAmount ?? 0);
      setChartData({
        series: [
          {
            name: "New Customers",
            data: data,
          },
        ],
      });
    }
  }, [sales]);

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
      categories: dates,
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
      show: true,
      position: "top",
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
          <h5 className="text-md font-semibold text-gray-900">
            Борлуулалтын мэдээ
          </h5>
          <div className="flex space-x-2">
            <Form.Select
              aria-label="Default select example"
              className="select-bank"
              value={type}
              name="bankCode"
              style={{ fontSize: "10px" }}
              onChange={(e) => handleChange(e.target.value)}
            >
              {typeDate?.map((data, index) => {
                return (
                  <option
                    value={data.en}
                    className="label-item"
                    key={index}
                  >
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              className="select-bank"
              value={tableDataType}
              name="bankCode"
              style={{ fontSize: "10px" }}
              onChange={(e) => changeTableDataType(e.target.value)}
            >
              {typeUser?.map((data, index) => {
                return (
                  <option
                    value={data.en}
                    className="label-item"
                    key={index}
                  >
                    {data.name}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </div>
        <Chart options={chartOptions} series={chartData.series} type="line" />
      </div>
    </div>
  );
};

export default SalesDataChart;
