"use client"
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { Col, Nav, Tab, Table, Alert, Pagination } from "react-bootstrap";
import IctContext from "@/context/ict-context";
import { useRequest } from "ahooks";
import authService from "@/service/api";
import FailNotification from "../notification/fail-notif";
import { format } from "date-fns";
import { TransactionListResponse } from "@/types";
import { DateRangePicker } from "rsuite";
import 'rsuite/DateRangePicker/styles/index.css';
import Image from "next/image";
import { useLoading } from "@/context/loading";

const HomeTable = () => {
    const { setLoading } = useLoading();
    let dayjs = require('dayjs');
    const [recent, setRecent] = useState<TransactionListResponse>({ code: 0, info: "", result: [], offset: 0, limit: 0, total: 0 });
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const tra = useTranslations('transaction');
    const { partner } = useContext(IctContext);
    const [params, setParams] = useState<DatePickerModel>({
        offset: 0,
        limit: 20,
        pagingStart: 0,
        maxPage: 1,
        beginDate: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
    });

    const converHidePhone = (val: string) => {
        return val.length > 8
            ? val.substring(0, 4) + '****' + val.substring(7)
            : val;
    }

    useEffect(() => {
        recentAction.run(partner?.profileId, params);
    }, []);

    const recentAction = useRequest(authService.getRecent, {
        onBefore: () => {
            setLoading(true)
        },
        manual: true,
        onSuccess: async (data) => {
            setRecent(data);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        },
        onFinally: () => {
            setLoading(false)
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
        recentAction.run(partner?.profileId, params);
    };

    const changeDateRange = (value: [Date, Date] | null) => {
        if (value && value[0] && value[1]) {
            setParams((params) => ({
                ...params,
                beginDate: format(value[0], 'yyyy-MM-dd'),
                endDate: format(value[1], 'yyyy-MM-dd'),
            }));
        }
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
                                        <DateRangePicker
                                            disabled={false}
                                            style={{ fontSize: "2px" }}
                                            placement="autoVerticalEnd"
                                            onChange={changeDateRange}
                                        />
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
                                                    <th>{tra('tab-1.date')}</th>
                                                    <th>{tra('tab-1.trans-value')}</th>
                                                    <th>{tra('tab-1.first-balance')}</th>
                                                    <th>{tra('tab-1.trans-amount')}</th>
                                                    <th>{tra('tab-1.final-balance')}</th>
                                                </tr>
                                            </thead>
                                            {recent?.result &&
                                                recent?.result?.length > 0 &&
                                                recent?.result.map(
                                                    (cat, i) => (
                                                        <tbody key={i}>
                                                            <tr>
                                                                <td>
                                                                    <h5>{cat.description}</h5>
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
                                                                    <span>
                                                                        {cat.accountNo
                                                                            .toString()
                                                                            .replace(
                                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                                ','
                                                                            )} ₮
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {converHidePhone(cat.coopAccountNo)}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {formatDate(cat.date)}
                                                                    </span>
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
                                                    <th>{tra('tab-1.date')}</th>
                                                    <th>{tra('tab-1.trans-value')}</th>
                                                    <th>{tra('tab-1.first-balance')}</th>
                                                    <th>{tra('tab-1.trans-amount')}</th>
                                                    <th>{tra('tab-1.final-balance')}</th>
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
                                                                        <h5>{cat.description}</h5>
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
                                                                            <h5 style={{ color: "#165E3D" }}>Амжилттай"</h5>
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {cat.accountNo
                                                                                .toString()
                                                                                .replace(
                                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                                    ','
                                                                                )} ₮
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {converHidePhone(cat.coopAccountNo)}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {formatDate(cat.date)}
                                                                        </span>
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
                                                    <th>{tra('tab-1.date')}</th>
                                                    <th>{tra('tab-1.trans-value')}</th>
                                                    <th>{tra('tab-1.first-balance')}</th>
                                                    <th>{tra('tab-1.trans-amount')}</th>
                                                    <th>{tra('tab-1.final-balance')}</th>
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
                                                                        <h5>{cat.description}</h5>
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
                                                                        <span>
                                                                            {cat.accountNo
                                                                                .toString()
                                                                                .replace(
                                                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                                                    ','
                                                                                )} ₮
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {converHidePhone(cat.coopAccountNo)}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <span>
                                                                            {formatDate(cat.date)}
                                                                        </span>
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
                                        {Array.from({ length: recent.total }, (_, i) => (
                                            <Pagination.Item
                                                key={i + 1}
                                                active={i === params.pagingStart}
                                                onClick={() => handlePaging(i)}
                                            >
                                                {i + 1}
                                            </Pagination.Item>
                                        ))}
                                    </Pagination>
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

export default HomeTable;