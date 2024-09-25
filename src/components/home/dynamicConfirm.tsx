"use client";
import React, { useState, useContext, useEffect } from 'react';
import {
    Col,
    Row,
    Button,
    Modal,
    Form,
} from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useRouter } from 'next/navigation';
import FailNotification from '../notification/fail-notif';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import { useLoading } from '@/context/loading';
import OtpInput from '../widget/pinput';
import Link from 'next/link';

interface DynamicConfirmProps {
    setConfirmation: (value: boolean) => void;
}

type ReponseProps = {
    success: boolean;
    message: string;
    info: string;
}

const DynamicConfirm: React.FC<DynamicConfirmProps> = ({ setConfirmation }) => {
    const t = useTranslations('account');
    const router = useRouter();
    const { setLoading } = useLoading();
    const { partner, cardIndex, partnerBalance, transferInfo, setTransaction, setPartnerBalance } = useContext(IctContext);
    const [otp1, setOtp1] = useState(new Array(4).fill(""));
    const [otp2, setOtp2] = useState(new Array(4).fill(""));
    const [checked, setChecked] = useState<number>(0);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [showPaymentPassword, setShowPaymentPassword] = useState<boolean>(false);
    const [response, setResponse] = useState<ReponseProps>({ success: false, message: "", info: "" });
    const [show, setShow] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(60);
    const [otpCheck, setOtpCheck] = useState<boolean>(false);
    const [tokenPassword, setTokenPassword] = useState<string>("");

    useEffect(() => {
        if (otp2.join("").length === 4) {
            postOTPCode.run(otp2.join(""));
        } else {
            setOtpCheck(false);
        }
    }, [otp2]);

    const handleBack = () => {
        setShow(true);
        setConfirmation(true);
    };

    const handleShowOTP = () => {
        setOtp1(new Array(4).fill(""));
        setOtp2(new Array(4).fill(""));
        if (transferInfo.type === "bank") {
            // getOTPCode.run(transferInfo.bank.sourceAccountNo);
        } else if (transferInfo.type === "candy") {
            getOTPCode.run();
            const timer: NodeJS.Timeout = setInterval(() => {
                setCounter(prevCounter => {
                    if (prevCounter <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prevCounter - 1;
                });
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        } else if (transferInfo.type === "merchant") {
            getOTPCode.run();
            const timer: NodeJS.Timeout = setInterval(() => {
                setCounter(prevCounter => {
                    if (prevCounter <= 1) {
                        clearInterval(timer); // Clear the interval when counter reaches 0
                        return 0; // Ensure it doesn't go negative
                    }
                    return prevCounter - 1;
                });
            }, 1000);
            return () => {
                clearInterval(timer);
            };
        }
    }

    const converHidePhone = (val: string) => {
        return val.length > 4
            ? val.substring(0, 2) + '***' + val.substring(5)
            : val;
    }

    const getOTPCode = useRequest(authService.getOTPCode, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setChecked(1);
            setCounter(60);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        },
        onFinally: () => {
            setLoading(false)
        }
    })

    const postOTPCode = useRequest(authService.postOTPCode, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setOtpCheck(true);
            setTokenPassword(data.result.passwordToken);
            setLoading(false);
        },
        onError: (e) => {
            setLoading(false);
            setOtp2(new Array(4).fill(""));
            setShow(true);
            setResponse({ message: e.message, success: false, info: e.message });
        },
    })

    const transferToMonpay = useRequest(authService.transferToMonpay, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setPartnerBalance({ balanceList: [], totalBalance: 0 });
            setTransaction({ code: 0, info: "", result: [], offset: 0, limit: 0, total: 0, paging: { count: 0, start: 0, size: 0, maxPage: 0 } });
            setShow(true);
            setResponse({ message: data.result.message, success: true, info: data.result.info });
        },
        onError: (e) => {
            setTokenPassword("");
            setChecked(0);
            setLoading(false);
            setAlert({ show: true, message: e.message });
            setResponse({ message: e.message, success: false, info: e.message });
        },
        onFinally: () => {
            setLoading(false);
        }
    })

    const retryPin = async () => {
        getOTPCode.run();
        const timer: NodeJS.Timeout = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCounter - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            event.preventDefault();
            setShowPaymentPassword(true);
        }
    };

    const handleTransfer = () => {
        setShowPaymentPassword(false);
        const body: TransferToMonpayModel = transferInfo.type === "candy" ? {
            srcAccountNo: partnerBalance.balanceList[cardIndex].accountNo,
            dstSrc: transferInfo?.monpay?.phoneNumber,
            amount: transferInfo?.monpay?.amount,
            description: transferInfo?.monpay?.description,
            pin: otp1.join(""),
            passwordToken: tokenPassword,
        } : transferInfo.type === "merchant" ? {
            srcAccountNo: partnerBalance.balanceList[cardIndex].accountNo,
            dstSrc: transferInfo?.merchant?.phoneNumber,
            amount: transferInfo?.merchant?.amount,
            description: transferInfo?.merchant?.description,
            pin: otp1.join(""),
            passwordToken: tokenPassword,
        } :
            {
                srcAccountNo: "",
                dstSrc: "",
                amount: "",
                description: "",
                pin: otp1.join(""),
                passwordToken: tokenPassword,
            }
        transferToMonpay.run(body);
    }

    const handleClose = () => {
        setShow(false);
        window.location.reload();
        if (response.success) {
            router.push('/app/dashboard');
        }
    };

    const closeNotification = () => {
        setAlert({ message: "", show: false });
    };

    return (
        <>
            <Col xl={8}>
                <Row >
                    <div
                        style={{
                            margin: 'auto',
                            padding: '0',
                        }}
                        className="account"
                    >
                        <Row>
                            <Col >
                                <Row>
                                    <Col>
                                        <div className="deposit-tab">
                                            <div className="title">
                                                <h5>{t('account-conf.conf-transfer')}</h5>
                                            </div>
                                            <div className="confirm-1">
                                                <div className="confirm-title-out">
                                                    <span className="confirm-title">
                                                        {transferInfo?.title}
                                                    </span>
                                                </div>
                                                {transferInfo.type === "bank" ?
                                                    <div className="content p-0 m-0">
                                                        <div className="content-inner">
                                                            <div className="content-item">
                                                                <h5 className="item-title">
                                                                    {t('account-transfer.recipient-bank')}
                                                                </h5>
                                                                <span className="number">
                                                                    {transferInfo?.bank?.bankName}
                                                                </span>
                                                            </div>
                                                            <div className="content-item">
                                                                <h5 className="item-title">
                                                                    {t('account-transfer.recipient-account')}
                                                                </h5>
                                                                <span className="number">
                                                                    {transferInfo?.bank?.bankAccount}
                                                                </span>
                                                            </div>
                                                            <div className="content-item">
                                                                <h5 className="item-title">
                                                                    {t('account-transfer.recipient-name')}
                                                                </h5>
                                                                <span className="number">{transferInfo?.bank?.accountName}</span>
                                                            </div>
                                                            <div className="content-item">
                                                                <h5 className="item-title">
                                                                    {t('account-transfer.amount')}
                                                                </h5>
                                                                <span className="number">
                                                                    {transferInfo?.bank?.amount || '0.00'}₮
                                                                </span>
                                                            </div>
                                                            <div className="content-item">
                                                                <h5 className="item-title">
                                                                    {t('account-transfer.transaction-value ')}
                                                                </h5>
                                                                <span className="number">
                                                                    {transferInfo?.bank?.description}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div> : transferInfo.type === "candy" ?
                                                        <div className="content pb-0 m-0">
                                                            <div className="content-inner">
                                                                <div className="content-item">
                                                                    <h5 className="item-title">
                                                                        Утасны дугаар
                                                                    </h5>
                                                                    <span className="number">
                                                                        {transferInfo?.monpay?.phoneNumber}
                                                                        <Image width={16} height={16} className='ml-2' src="/svg/transfer-success-phone.svg" alt="Phone icon" />
                                                                    </span>
                                                                </div>
                                                                <div className="content-item">
                                                                    <h5 className="item-title">
                                                                        Хүлээн авагчийн нэр
                                                                    </h5>
                                                                    <span className="number">
                                                                        {transferInfo?.monpay?.userName}
                                                                    </span>
                                                                </div>
                                                                <div className="content-item">
                                                                    <h5 className="item-title">
                                                                        Шилжүүлэх дүн
                                                                    </h5>
                                                                    <span className="number">{transferInfo?.monpay?.amount || '0.00'}₮</span>
                                                                </div>
                                                                <div className="content-item">
                                                                    <h5 className="item-title">
                                                                        Гүйлгээний утга
                                                                    </h5>
                                                                    <span className="number">
                                                                        {transferInfo?.monpay?.description || ''}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div> : transferInfo.type === "merchant" ?
                                                            <div className="content pb-0 m-0">
                                                                <div className="content-inner">
                                                                    <div className="content-item">
                                                                        <h5 className="item-title">
                                                                            Утасны дугаар
                                                                        </h5>
                                                                        <span className="number">
                                                                            {transferInfo?.merchant?.phoneNumber}
                                                                            <Image width={16} height={16} className='ml-2' src="/svg/transfer-success-phone.svg" alt="Phone icon" />
                                                                        </span>
                                                                    </div>
                                                                    <div className="content-item">
                                                                        <h5 className="item-title">
                                                                            Хүлээн авагчийн нэр
                                                                        </h5>
                                                                        <span className="number">
                                                                            {transferInfo?.merchant?.userName}
                                                                        </span>
                                                                    </div>
                                                                    <div className="content-item">
                                                                        <h5 className="item-title">
                                                                            Шилжүүлэх дүн
                                                                        </h5>
                                                                        <span className="number">{transferInfo?.merchant?.amount || '0.00'}₮</span>
                                                                    </div>
                                                                    <div className="content-item">
                                                                        <h5 className="item-title">
                                                                            Гүйлгээний утга
                                                                        </h5>
                                                                        <span className="number">
                                                                            {transferInfo?.merchant?.description || ''}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            :
                                                            <></>
                                                }
                                                <Form
                                                    className="email-confirm-code pt-0"
                                                    onSubmit={handleSubmit}
                                                >
                                                    {checked === 0 ?
                                                        <div className="transfer-buttons">
                                                            <div className="buttons-inner">
                                                                <Button onClick={() => handleBack()}>Буцах</Button>
                                                                <Button variant="primary" onClick={handleShowOTP}>
                                                                    Баталгаажуулах код авах
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        :
                                                        <>
                                                            <div className="label-title" style={{ paddingTop: "40px", paddingBottom: "10px" }}>
                                                                <h5>Бид таны {converHidePhone(partner?.verifiedPhone)} дугаарт кодыг илгээсэн. Баталгаажуулах кодоо оруулна уу</h5>
                                                            </div>
                                                            <OtpInput otp={otp2} setOtp={setOtp2} />
                                                            <div className="timer mt-3">
                                                                {counter === 0 ? (
                                                                    <span className="timer-text" onClick={retryPin}>
                                                                        Дахин код авах
                                                                    </span>
                                                                ) : (
                                                                    <span className="timer-number" style={{ color: "#161E34", fontSize: "13px" }}>
                                                                        <span style={{ color: "#5B698E" }}>Дахин код авах уу?</span> 00:{counter < 10 ? '0' : ''}
                                                                        {counter}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="transfer-buttons">
                                                                <div className="buttons-inner">
                                                                    <Button onClick={(e) => setChecked(0)}>
                                                                        Буцах
                                                                    </Button>
                                                                    <Button variant="primary" type="submit" disabled={!otpCheck}>
                                                                        Шилжүүлэх
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </Form>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Col>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName={response.success ? 'success-modal' : 'fail-modal'}
                centered
            >
                <div className="content-inner">
                    <Modal.Header>
                        <div className="image">
                            <div className="image-inner">
                                <img
                                    src={
                                        response.success
                                            ? '/modal-icon-success.svg'
                                            : '/modal-icon-danger.svg'
                                    }
                                />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="body-content">
                            <div className="title">
                                <h5>{t('transfer')} {response.success ? 'амжилттай' : 'амжилтгүй'}</h5>
                            </div>
                            <div className="desc">
                                {response.success ? (
                                    <p>
                                        <strong
                                            style={{
                                                padding: '0 3px',
                                                color: "#5B698E"
                                            }}
                                        >
                                            Таны шилжүүлэг амжилттай хийгдлээ.
                                        </strong>
                                    </p>
                                ) : (
                                    <p>
                                        <strong>{response.info}</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>
                            {response.success ? 'Баярлалаа' : 'Хаах'}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
            <Modal
                show={showPaymentPassword}
                onHide={() => setShowPaymentPassword(false)}
                dialogClassName="save-templates"
                centered
            >
                <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                    <div className="header-title">
                        <h5 style={{ fontSize: "14px" }}>Гүйлгээний пин кодоо оруулна уу</h5>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center">
                        <OtpInput otp={otp1} setOtp={setOtp1} />
                    </div>
                    <div className="d-flex justify-content-end p-0 mt-2">
                        <Link style={{ marginRight: "20px", fontSize: "13px", color: "#8089AC" }} href="/app/settings">Нууц үг сэргээх</Link>
                    </div>
                </Modal.Body>
                <Modal.Footer className='mt-0 pt-0'>
                    <div className="tw-single-button">
                        <Button onClick={() => { if (otp1.join("").length === 4) { handleTransfer() } }}>
                            Шилжүүлэх
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
            {alerts?.show && (
                <FailNotification
                    show={alerts.show}
                    infos={alerts.message}
                    close={closeNotification}
                ></FailNotification>
            )}
        </>
    );
};

export default DynamicConfirm;
