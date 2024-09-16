"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Table } from 'react-bootstrap';
import { DistrictGraphicResponse } from '@/types/demo';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const data = [
    '#008FFB',
    '#00E396',
    '#775DD0',
    '#FF4560',
    "#FF9359",
    "#344BFD",
    "#008FFB",
    "#00E396",
    "#775DD0",
    "#FF4560",
    "#FF9359",
    "#344BFD",
    "#008FFB",
    "#00E396",
    "#775DD0",
    "#FF4560",
];

const getOptions = (color: string, maxCount: number): ApexOptions => ({
    chart: {
        type: 'bar',
        sparkline: { enabled: true },
    },
    colors: [color],
    plotOptions: {
        bar: {
            horizontal: true,
            barHeight: '10%',
            columnWidth: "13px",
            borderRadius: 2.76,
            borderRadiusApplication: 'end',
        },
    },
    stroke: { width: 0 },
    xaxis: {
        max: maxCount,
        categories: ['Popularity'],
        labels: { show: false },
    },
    dataLabels: {
        enabled: false,
    },
    yaxis: { show: false },
    tooltip: { y: { formatter: (val) => `${val} sales` }, },
    grid: { show: false },
});

type PopularityTableProps = {
    districtList: DistrictGraphicResponse;
};

type PercentageDisplayProps = {
    count: number;
    districtList: DistrictGraphicResponse;
};

const PercentageDisplay: React.FC<PercentageDisplayProps> = ({ count, districtList }) => {
    const maxCount = districtList.result.length > 0
        ? Math.max(...districtList.result.map(item => item.count))
        : 0;
    const percentage = (count / maxCount) * 100;
    return percentage.toFixed(1);
};

const PopularityTable: React.FC<PopularityTableProps> = ({ districtList }) => {
    const maxCount = Math.max(...districtList.result.map(cat => cat.count ?? 0));
    return (
        <div className="bg-white rounded-lg p-4 md:p-6" style={{ height: "351px", boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
            <div className="flex justify-between mb-3">
                <div className="flex justify-center items-center">
                    <h5 className="text- font-bold leading-none text-gray-900 dark:text-white">
                        УБ хот / Дүүрэг
                    </h5>
                </div>
            </div>
            <div className="container mx-auto bg-white" style={{ height: 'calc(100% - 50px)', overflowY: 'auto' }}>
                <div className="overflow-x-auto">
                    <Table
                        className="transaction-history"
                        responsive="sm"
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>name</th>
                                <th>Popularity</th>
                                <th>Sales</th>
                            </tr>
                        </thead>
                        {districtList.result?.map(
                            (cat, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td>
                                                <h5>{i + 1}</h5>
                                            </td>
                                            <td>
                                                <span>
                                                    {cat.district}
                                                </span>
                                            </td>
                                            <td>
                                                <span>
                                                    <Chart
                                                        options={getOptions(data[i], maxCount)}
                                                        series={[{ data: [cat.count ?? 0] }]}
                                                        type="bar"
                                                        height={30}
                                                        width="100%"
                                                    />
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                    className="inline-block font-bold text-sm"
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center", height: "24px", width: "50px", backgroundColor: '#f1f1f1', border: `1px solid ${data[i]}`, color: data[i], borderRadius: "10px"
                                                    }}
                                                >
                                                    {PercentageDisplay({ count: cat.count, districtList: districtList })}%
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            }
                        )}
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PopularityTable;
