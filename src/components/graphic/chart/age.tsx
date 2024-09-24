"use client"
import React, { useEffect, useState } from 'react';
import { ApexOptions } from 'apexcharts';
import dynamic from 'next/dynamic';
import { GraphicAgeResponse } from '@/types';

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type AgeCountProps = {
  ageList: GraphicAgeResponse;
};

const AgeGroupChart: React.FC<AgeCountProps> = ({ ageList }) => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (ageList && ageList.result) {
      setLabels(ageList.result.map((item) => item.ageType ?? ""));
      setSeries(ageList.result.map((item) => item.count ?? 0));
    }
  }, [ageList]);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: labels,
    colors: ['#3366FF', '#FFBB00', '#FF9966', '#FF1666', '#FFD700', '#FFDD22'],
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
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
            show: true, // Ensure labels inside the donut are not shown
          },
        },
      },
    },
  };


  return (
    <div className="bg-white rounded-lg p-4 md:p-6" style={{ height: "351px", boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-md font-bold leading-none text-gray-900 dark:text-white">
            Насны ангилал
          </h5>
        </div>
      </div>

      <div className="py-6">
        <Chart options={chartOptions} series={series} type="donut" height={280} />
      </div>
    </div>
  );
};

export default AgeGroupChart;
