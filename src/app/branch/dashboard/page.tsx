"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRequest } from 'ahooks';
import FailNotification from '@/components/notification/fail-notif';
// import HomeTable from '../home/table';
import { thousands } from '@/utils/utils';
import "../../../styles/CustomSwitchComponent.css";
import authBranchService from '@/service/branch';
import BranchTable from '@/components/graphic/table';

const Page = () => {
    const t = useTranslations('dashboard');
    const { branch, branchBalance, setBranchBalance } = useContext(IctContext);
    const [show, setShow] = useState(false);
    const [copied, setCopied] = useState(false);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });

    useEffect(() => {
        balanceAction.run(branch?.accountIdMerch);
    }, []);

    const balanceAction = useRequest(authBranchService.getBalance, {
        manual: true,
        onSuccess: async (data) => {
            setBranchBalance(data);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const toggle = () => {
        const state = show;
        setShow(!state);
    };

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    return (
        <div
            className="control"
            style={{
                margin: 'auto',
            }}
        >
            <Container fluid>
                <Row className="d-flex dashboard-features" style={{ marginBottom: '24px' }}>
                    <Col xl={3} xs={4} lg={8} style={{ minWidth: "438px" }} >
                        <div className="mp-wallet background" style={{ height: "144px", }}>
                            <div className="content">
                                <div className="content-inner">
                                    <div className="logo">
                                        <img src="/dashboard/monpay-logo-white.svg" />
                                    </div>
                                    <div className="mp-current-wallet">
                                        <div className="content-item">
                                            <h6>{t('balance')}</h6>
                                            <div className={show ? 'hide' : 'show'}>
                                                <img onClick={toggle} src="/account-icon-on.svg" />
                                            </div>
                                        </div>
                                        <span>
                                            {show
                                                ? '***.***'
                                                : branchBalance !== null
                                                    ? branchBalance.balance.toString().replace(thousands, ',')
                                                    : '0.00'}
                                            ₮
                                        </span>
                                    </div>
                                    <div className="mp-wallet-id">
                                        <h6>{t('mp-account')}</h6>
                                        <span>{branchBalance !== null ? branchBalance?.accountNo : ""}</span>
                                        <CopyToClipboard
                                            text={branchBalance !== null ? branchBalance?.accountNo : ""}
                                            onCopy={() =>
                                                alert(
                                                    !copied ? 'Дансны дугаар амжилттай хуулагдлаа' : null
                                                )
                                            }
                                        >
                                            <div className="icon">
                                                <img src="/dbicon-copy.svg" />
                                            </div>
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <BranchTable />
                </Row>
                {alerts.show && (
                    <FailNotification show={alerts.show} infos={alerts.message} close={closeNotification} />
                )}
            </Container>
        </div>
    );
};

export default Page;
