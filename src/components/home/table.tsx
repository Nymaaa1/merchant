"use client"
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { Col, Nav, Tab, Table, Container } from "react-bootstrap";
import DateRangePickerComponent from '../common/datepicker';
import IctContext from "@/context/ict-context";
import { useRequest } from "ahooks";
import authService from "@/service/api";
import FailNotification from "../notification/fail-notif";

const HomeTable = () => {
    const [selectTab, setSelectTab] = useState<number>(0);
    const [recent, setRecent] = useState<RecentBody>();
    const [totalSalesList, setTotalSalesList] = useState({});
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const tra = useTranslations('transaction');
    const { partner } = useContext(IctContext);

    useEffect(() => {
        recentAction.run(partner?.profileId);
    }, []);

    const recentAction = useRequest(authService.getRecent, {
        manual: true,
        onSuccess: async (data) => {
            setRecent(data);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
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
                                        onClick={() => setSelectTab(0)}
                                    >
                                        <Nav.Link eventKey="0">
                                            {tra('tab-1.all')}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                        className="tw-nav-income"
                                        onClick={() => setSelectTab(1)}
                                    >
                                        <Nav.Link eventKey="1">
                                            {tra('tab-1.income')}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item
                                        className="tw-nav-outcome"
                                        onClick={() => setSelectTab(2)}
                                    >
                                        <Nav.Link eventKey="2">
                                            {tra('tab-1.expense')}
                                        </Nav.Link>
                                    </Nav.Item>
                                    <div className="date-graphic"><div className="content"><DateRangePickerComponent /></div></div>

                                    {/* <div className="date-graphic">
                        <div className="content">
                          <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                          >
                            <DateRangePicker
                              disabledDate={disabledDate}
                              value={newValue}
                              inputFormat="MM-dd-yyyy"
                              onChange={changeDateRange}
                              renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                  <input
                                    ref={startProps.inputRef}
                                    {...startProps.inputProps}
                                    className="date-item"
                                  />
                                  -
                                  <input
                                    ref={endProps.inputRef}
                                    {...endProps.inputProps}
                                    className="date-item"
                                  />
                                </React.Fragment>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div> */}
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
                                            {totalSalesList &&
                                                totalSalesList.result?.length > 0 &&
                                                totalSalesList?.result.map(
                                                    (cat, i) => (
                                                        <tbody key={i}>
                                                            <tr>
                                                                <td>
                                                                    <h5>{cat.dateUI}</h5>
                                                                </td>
                                                                <td>
                                                                    <h5>{cat.description}</h5>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {cat.balanceOld
                                                                            .toString()
                                                                            .replace(
                                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                                ','
                                                                            )}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span
                                                                        className={
                                                                            cat.amount < 0
                                                                                ? 'total-decrease'
                                                                                : 'total-increase'
                                                                        }
                                                                    >
                                                                        {cat.amountUI}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span>
                                                                        {cat.balance
                                                                            .toString()
                                                                            .replace(
                                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                                ','
                                                                            )}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <h5>{cat.sourceMsisdn}</h5>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    )
                                                )}
                                        </Table>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="1">
                                    <div className="tabs-header">
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
                                            {totalSalesList &&
                                                totalSalesList.result?.length > 0 &&
                                                totalSalesList?.result.map(
                                                    (cat, i) => {
                                                        if (cat.amount > 0) {
                                                            return (
                                                                <tbody key={i}>
                                                                    <tr>
                                                                        <td>
                                                                            <h5>{cat.dateUI}</h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5>
                                                                                {cat.description}
                                                                            </h5>
                                                                        </td>
                                                                        <td>
                                                                            <span>
                                                                                {cat.balanceOld
                                                                                    .toString()
                                                                                    .replace(
                                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                                        ','
                                                                                    )}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="total-increase">
                                                                                {cat.amountUI}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span>
                                                                                {cat.balance
                                                                                    .toString()
                                                                                    .replace(
                                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                                        ','
                                                                                    )}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <h5>{cat.source}</h5>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            );
                                                        }
                                                        {
                                                            return (cat = null);
                                                        }
                                                    }
                                                )}
                                        </Table>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="2">
                                    <div className="tabs-header">
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
                                            {totalSalesList &&
                                                totalSalesList.result?.length > 0 &&
                                                totalSalesList?.result.map(
                                                    (cat, i) => {
                                                        if (cat.amount < 0) {
                                                            return (
                                                                <tbody key={i}>
                                                                    <tr>
                                                                        <td>
                                                                            <h5>{cat.dateUI}</h5>
                                                                        </td>
                                                                        <td>
                                                                            <h5>
                                                                                {cat.description}
                                                                            </h5>
                                                                        </td>
                                                                        <td>
                                                                            <span>
                                                                                {cat.balanceOld
                                                                                    .toString()
                                                                                    .replace(
                                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                                        ','
                                                                                    )}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span className="total-decrease">
                                                                                {cat.amountUI}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <span>
                                                                                {cat.balance
                                                                                    .toString()
                                                                                    .replace(
                                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                                        ','
                                                                                    )}
                                                                            </span>
                                                                        </td>
                                                                        <td>
                                                                            <h5>{cat.source}</h5>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            );
                                                        }
                                                        {
                                                            return (cat = null);
                                                        }
                                                    }
                                                )}
                                        </Table>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                            {/* <div className="transaction-pagination">
                    <div className="inner-content">
                      <div className="trans-dropdown">
                        <Form>
                          <Form.Select
                            className="form-select-payment"
                            onChange={handlePaging}
                          >
                            <option
                              value="50"
                              className="form-label-option"
                            >
                              50
                            </option>
                          </Form.Select>
                        </Form>
                      </div>
                      <Pagination>
                        <Pagination.Prev
                          className="prev"
                          onClick={prevSubmit}
                        />
                        <Pagination.Next
                          className="next"
                          onClick={nextSubmit}
                        />
                      </Pagination>
                    </div>
                  </div> */}
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