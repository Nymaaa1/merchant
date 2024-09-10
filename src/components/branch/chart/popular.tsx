"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Table } from 'react-bootstrap';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const data = [
    { id: '01', name: 'СБД', popularity: 45, sales: 45, color: '#008FFB' },
    { id: '02', name: 'СХД', popularity: 29, sales: 29, color: '#00E396' },
    { id: '03', name: 'ХУД', popularity: 18, sales: 18, color: '#775DD0' },
    { id: '04', name: 'БГД', popularity: 25, sales: 25, color: '#FF4560' },
];

const getOptions = (color: string): ApexOptions => ({
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
        categories: ['Popularity'],
        labels: { show: false },
    },
    yaxis: { show: false },
    tooltip: { enabled: false },
    grid: { show: false },
});

const PopularityTable = () => (
    <div className="bg-white rounded-lg p-4 md:p-6" style={{ height: "351px", boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
        <div className="flex justify-between mb-3">
            <div className="flex justify-center items-center">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    УБ хот / Дүүрэг
                </h5>
            </div>
        </div>
        <div className="container mx-auto p-6 bg-white">
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
                    {data?.map(
                        (cat, i) => (
                            <tbody key={i}>
                                <tr>
                                    <td>
                                        <h5>{cat.id}</h5>
                                    </td>
                                    <td>
                                        <span>
                                            {cat.name}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            <Chart
                                                options={getOptions(cat.color)}
                                                series={[{ data: [cat.popularity] }]}
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
                                                justifyContent: "center", height: "24px", width: "50px", backgroundColor: '#f1f1f1', border: `1px solid ${cat.color}`, color: cat.color, borderRadius: "10px"
                                            }}
                                        >
                                            {cat.sales}%
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    )}
                </Table>
            </div>
        </div>
    </div>
);

export default PopularityTable;
