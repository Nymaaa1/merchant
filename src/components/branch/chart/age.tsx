"use client"
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const AgeGroupChart = () => {
  const [series, setSeries] = useState([2.3, 5.5, 19.2, 19.2, 53, 53]); // The numerical values

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['14-18', '19-24', '25-34', '45-54', '35-44', '55-аас'], // Labels for the age groups
    colors: ['#3366FF', '#FFBB00', '#FF9966', '#FF1666', '#FFDK55', '#FFDD22'], // Custom colors
    tooltip: {
      enabled: false, // Disable the tooltip to avoid displaying values
    },
    dataLabels: {
      enabled: false, // Hide the numerical values on the chart
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%', // Size of the donut hole
          labels: {
            show: false, // Ensure labels inside the donut are not shown
          },
        },
      },
    },
  };


  return (
       <div className="bg-white rounded-lg p-4 md:p-6" style={{ height: "351px", boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
        <div className="flex justify-between mb-3">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Насны ангилал
            </h5>
          </div>
        </div>

        <div className="py-6">
          <Chart options={chartOptions} series={series} type="donut" height={300} />
        </div>
      </div>
  );
};

export default AgeGroupChart;
