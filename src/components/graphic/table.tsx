"use client"
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { Col, Nav, Tab, Table, Pagination, Button, Row } from "react-bootstrap";
import { useRequest } from "ahooks";
import FailNotification from "../notification/fail-notif";
import authBranchService from "@/service/branch";
import { TransactionBranchListResponse } from "@/types/branch";
import Image from "next/image";
import React from "react";
import IctContext from "@/context/ict-context";
// import { DateRangePicker } from "rsuite";
import 'rsuite/DateRangePicker/styles/index.css';
import { format } from 'date-fns';
import { useLoading } from "@/context/loading";
import { excelDownload } from "@/utils/excel";
import Switch from "../widget/switch";
import DatePickerModel from "../widget/date";

const BranchTable = () => {
    const { setLoading, setColor } = useLoading();
    let dayjs = require('dayjs');
    const [recent, setRecent] = useState<TransactionBranchListResponse>({ code: 0, info: "", result: [], limit: 0, total: 0, paging: { count: 0, start: 0, size: 0, maxPage: 0 }, offset: 0 });
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const tra = useTranslations('transaction');
    const { branch, tableHideAbout, setTableHideAbout } = useContext(IctContext);
    const [params, setParams] = useState<DatePickerModel>({
        offset: 0,
        limit: 20,
        pagingStart: 0,
        maxPage: 1,
        beginDate: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
    });

    // const changeDateRange = (value: [Date, Date] | null) => {
    //     if (value && value[0] && value[1]) {
    //         setParams((params) => ({
    //             ...params,
    //             pagingStart: 0,
    //             beginDate: format(value[0], 'yyyy-MM-dd'),
    //             endDate: format(value[1], 'yyyy-MM-dd'),
    //         }));
    //         recentAction.run(branch?.accountIdMerch, params);
    //     }
    // };

    const changeBeginDate = (value: Date) => {
        setParams({
            limit: 20,
            offset: params.offset,
            maxPage: params.maxPage,
            pagingStart: 0,
            beginDate: format(value, 'yyyy-MM-dd'),
            endDate: params.endDate,
        });
        recentAction.run(branch?.accountIdMerch, params);
    }

    const changeEndDate = (value: Date) => {
        setParams({
            limit: 20,
            offset: params.offset,
            maxPage: params.maxPage,
            pagingStart: 0,
            beginDate: params.beginDate,
            endDate: format(value, 'yyyy-MM-dd'),
        });
        recentAction.run(branch?.accountIdMerch, params);
    }

    useEffect(() => {
        setColor("#4341CC");
        recentAction.run(branch?.accountIdMerch, params);
    }, []);

    const recentAction = useRequest(authBranchService.getRecent, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setRecent(data);
            setParams((params) => ({
                ...params,
                maxPage: data.paging.maxPage,
            }));
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        },
        onFinally: () => {
            setLoading(false);
        }
    })

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        return format(date, 'yyyy-MM-dd HH:mm:ss');
    }

    const handlePaging = (value: number) => {
        setParams((params) => ({
            ...params,
            pagingStart: value
        }));
        recentAction.run(branch?.accountIdMerch, params);
    };

    const toggleHandler = () => {
        setTableHideAbout(!tableHideAbout);
    };

    const beginDate = params.beginDate ? new Date(params.beginDate) : new Date();
    const endDate = params.endDate ? new Date(params.endDate) : new Date();

    const handleExcelDownload = () => {
        excelDownload(
            recent?.result.map((item, i) => {
                return {
                    "№": i + 1,
                    "ГҮЙЛГЭЭНИЙ НЭР": item.description,
                    "ТӨЛӨВ": item.transactionType === "FEE" ? "Буцаагдсан" : "Амжилттай",
                    "ДҮН": item.amount,
                    "ХАРИЛЦСАН ДАНС": item.accountNo,
                    "ОН, САР, ӨДӨР": formatDate(item.date),
                } as ContractsExcel;
            }),
            "Contract report"
        );
    };

    return (
        <Col xs={6} className="flex-grow-1" xl={2} lg={2}>
            <div className="tw-transaction-body">
                <div className="transaction-history-outer">
                    <div
                        className="transaction-history-inner"
                        style={{ width: '100%' }}
                    >
                        <Tab.Container defaultActiveKey="0">
                            <div className="tabs">
                                <Nav variant="pills">
                                    <Nav.Item
                                        className="tw-nav-all"
                                    // onClick={() => setSelectTab(0)}
                                    >
                                        <Nav.Link eventKey="0">
                                            {tra('tab-1.all')}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                        className="tw-nav-income"
                                    // onClick={() => setSelectTab(1)}
                                    >
                                        <Nav.Link eventKey="1">
                                            {tra('tab-1.income')}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                        className="tw-nav-outcome"
                                    // onClick={() => setSelectTab(2)}
                                    >
                                        <Nav.Link eventKey="2">
                                            {tra('tab-1.expense')}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <div className="date-graphic">
                                        <div className="content d-flex justify-content-between align-items-center" style={{ height: "48px" }}>
                                            <DatePickerModel selectedDate={beginDate} setSelectedDate={changeBeginDate} />
                                            <DatePickerModel selectedDate={endDate} setSelectedDate={changeEndDate} />
                                        </div>
                                        <div className="item d-flex justify-content-center align-items-center" style={{ width: "155px", height: "48px", }}>
                                            <Row className="d-flex justify-content-between align-items-center g-0 m-0 p-0">
                                                <Col className="text-nowrap mr-6" style={{ fontSize: "13px", fontWeight: "600", fontFamily: 'Code Next' }}>
                                                    Харах
                                                </Col>
                                                <Col className="d-flex justify-content-end align-items-center">
                                                    <Switch
                                                        isOn={tableHideAbout}
                                                        handleToggle={toggleHandler}
                                                        onColor={!tableHideAbout ? "#4341CC" : ""}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </Nav>
                            </div>

                            <Tab.Content>
                                <Tab.Pane eventKey="0">
                                    <div className="tabs-header ">
                                        <Table
                                            className="transaction-history"
                                            responsive="sm"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>{tra('tab-1.final-balance')}</th>
                                                    <th>{tra('tab-1.first-balance')}</th>
                                                    <th>{tra('tab-1.trans-amount')}</th>
                                                    <th>{tra('tab-1.trans-value')}</th>
                                                    <th>{tra('tab-1.date')}</th>
                                                </tr>
                                            </thead>
                                            {recent?.result &&
                                                recent?.result?.length > 0 &&
                                                recent?.result.map(
                                                    (cat, i) => (
                                                        <tbody key={i}>
                                                            <tr>
                                                                <td>
                                                                    <span>
                                                                        {formatDate(cat.date)}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {tableHideAbout ? cat.amount
                                                                            .toString()
                                                                            .replace(
                                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                                ','
                                                                            ) : '*'.repeat(cat.amount.toString().length)} ₮
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span style={{
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        gap: "5px",
                                                                        height: "24px",
                                                                    }}>
                                                                        <Image src={"/logo/logo.png"} alt="Toggle password visibility" width={16} height={16} />
                                                                        {tableHideAbout ? (cat.coopAccountNo) : "********"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                            paddingLeft: "10px",
                                                                            paddingRight: "4px",
                                                                            height: "24px", color: cat.transactionType !== "FEE" ? "#165E3D" : "#B83131", backgroundColor: cat.transactionType !== "FEE" ? "#EDFFEA" : "#FFEAEA", borderRadius: "4px"
                                                                        }}
                                                                    >
                                                                        <Image src={cat.transactionType !== "FEE" ? "/svg/table-warning.svg" : "/svg/table-success.svg"} alt="Toggle password visibility" width={16} height={16} />
                                                                        <h5 style={{ color: cat.transactionType !== "FEE" ? "#165E3D" : "#B83131" }}>{cat.transactionType === "FEE" ? "Буцаагдсан" : "Амжилттай"}</h5>
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <h5>{cat.description}</h5>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                )}
                                        </Table>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="1">
                                    <div className="tabs-header ">
                                        <Table
                                            className="transaction-history"
                                            responsive="sm"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>{tra('tab-1.final-balance')}</th>
                                                    <th>{tra('tab-1.first-balance')}</th>
                                                    <th>{tra('tab-1.trans-amount')}</th>
                                                    <th>{tra('tab-1.trans-value')}</th>
                                                    <th>{tra('tab-1.date')}</th>
                                                </tr>
                                            </thead>
                                            {recent &&
                                                recent?.result?.length > 0 &&
                                                recent?.result.map(
                                                    (cat, i) => (
                                                        cat.transactionType === "FEE" && (
                                                            <tbody key={i}>
                                                                <tr>
                                                                    <td>
                                                                        <span>
                                                                            {formatDate(cat.date)}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {tableHideAbout ? cat.amount
                                                                                .toString()
                                                                                .replace(
                                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                                    ','
                                                                                ) : '*'.repeat(cat.amount.toString().length)} ₮
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                            gap: "5px",
                                                                            height: "24px",
                                                                        }}>
                                                                            <Image src={"/logo/logo.png"} alt="Toggle password visibility" width={16} height={16} />
                                                                            {tableHideAbout ? (cat.coopAccountNo) : "********"}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span
                                                                            style={{
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                justifyContent: "center",
                                                                                paddingLeft: "10px",
                                                                                paddingRight: "4px",
                                                                                height: "24px", color: "#165E3D", backgroundColor: "#EDFFEA", borderRadius: "4px"
                                                                            }}
                                                                        >
                                                                            <Image src={"/svg/table-warning.svg"} alt="Toggle password visibility" width={16} height={16} />
                                                                            <h5 style={{ color: "#165E3D" }}>{"Амжилттай"}</h5>
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <h5>{cat.description}</h5>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ))
                                                )}
                                        </Table>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="2">
                                    <div className="tabs-header ">
                                        <Table
                                            className="transaction-history"
                                            responsive="sm"
                                        >
                                            <thead>
                                                <tr>
                                                    <th>{tra('tab-1.final-balance')}</th>
                                                    <th>{tra('tab-1.first-balance')}</th>
                                                    <th>{tra('tab-1.trans-amount')}</th>
                                                    <th>{tra('tab-1.trans-value')}</th>
                                                    <th>{tra('tab-1.date')}</th>
                                                </tr>
                                            </thead>
                                            {recent &&
                                                recent?.result?.length > 0 &&
                                                recent?.result.map(
                                                    (cat, i) => (
                                                        cat.transactionType !== "FEE" && (
                                                            <tbody key={i}>
                                                                <tr>
                                                                    <td>
                                                                        <span>
                                                                            {formatDate(cat.date)}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {tableHideAbout ? cat.amount
                                                                                .toString()
                                                                                .replace(
                                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                                    ','
                                                                                ) : '*'.repeat(cat.amount.toString().length)} ₮
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span style={{
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                            gap: "5px",
                                                                            height: "24px",
                                                                        }}>
                                                                            <Image src={"/logo/logo.png"} alt="Toggle password visibility" width={16} height={16} />
                                                                            {tableHideAbout ? (cat.coopAccountNo) : "********"}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span
                                                                            style={{
                                                                                display: "flex",
                                                                                alignItems: "center",
                                                                                justifyContent: "center",
                                                                                paddingLeft: "10px",
                                                                                paddingRight: "4px",
                                                                                height: "24px", color: cat.transactionType !== "FEE" ? "#165E3D" : "#B83131", backgroundColor: cat.transactionType === "FEE" ? "#EDFFEA" : "#FFEAEA", borderRadius: "4px"
                                                                            }}
                                                                        >
                                                                            <Image src={cat.transactionType === "FEE" ? "/svg/table-warning.svg" : "/svg/table-success.svg"} alt="Toggle password visibility" width={16} height={16} />
                                                                            <h5 style={{ color: cat.transactionType === "FEE" ? "#165E3D" : "#B83131" }}>{cat.transactionType !== "FEE" ? "Буцаагдсан" : "Амжилттай"}</h5>
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <h5>{cat.description}</h5>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        ))
                                                )}
                                        </Table>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                            <div className="transaction-pagination">
                                <div className="inner-content">
                                    <div className="trans-dropdown">
                                        <h5 style={{ fontSize: "12px", color: "#4B5563" }}>
                                            Хуудас - {params.pagingStart + 1}
                                        </h5>
                                    </div>
                                    <Pagination className="custom-pagination" style={{ gap: 10 }}>
                                        {Array.from({ length: recent.paging.maxPage }, (_, i) => (
                                            <Pagination.Item
                                                key={i + 1}
                                                active={i === params.pagingStart}
                                                onClick={() => handlePaging(i)}
                                            >
                                                {i + 1}
                                            </Pagination.Item>
                                        ))}
                                    </Pagination>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => { recent?.result?.length > 0 ? handleExcelDownload() : setAlert({ show: true, message: "Өгөгдөл байхгүй байна" }) }}
                                        className="flex items-center space-x-2 border rounded-xl hover:bg-gray-200 hover:border-gray-400"
                                    >
                                        <Image
                                            className=""
                                            src="/svg/table-cloud-output.svg"
                                            alt="Toggle password visibility"
                                            width={20}
                                            height={20}
                                        />
                                        <h5 style={{ fontSize: "12px", color: "#4B5563" }}>
                                            Excel файл татах
                                        </h5>
                                    </Button>
                                </div>
                            </div>
                        </Tab.Container>
                    </div>
                </div>
            </div>
            {alerts.show && (
                <FailNotification show={alerts.show} infos={alerts.message} close={closeNotification} />
            )}

        </Col>

    )
}

export default BranchTable;