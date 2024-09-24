"use client";
import React, { useState, useContext } from 'react';
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
    const { partner, cardIndex, partnerBalance, transferInfo, setTransaction, setPartnerBalance } = useContext(IctContext);
    const [otp1, setOtp1] = useState(new Array(4).fill(""));
    const [otp2, setOtp2] = useState(new Array(4).fill(""));
    const { setLoading } = useLoading();
    const [checked, setChecked] = useState<number>(0);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });

    const [response, setResponse] = useState<ReponseProps>({ success: false, message: "", info: "" });
    const [show, setShow] = useState<boolean>(false);
    const [counter, setCounter] = useState<number>(60);
    const router = useRouter();

    const handleBack = () => {
        setShow(true);
        setConfirmation(true);
    };

    const handleShowOTP = () => {
        if (otp1.join("").length === 4) {
            if (transferInfo.type === "bank") {
                // getOTPCode.run(transferInfo.bank.sourceAccountNo);
            } else if (transferInfo.type === "candy") {
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
        } else {
            setAlert({ show: true, message: "Гүйлгээний нууц үг оруулна уу." });
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
        manual: true,
        onSuccess: async (data) => {
            const body: TransferToMonpayModel = transferInfo.type === "candy" ? {
                srcAccountNo: partnerBalance.balanceList[cardIndex].accountNo,
                dstSrc: transferInfo?.monpay?.phoneNumber,
                amount: transferInfo?.monpay?.amount,
                description: transferInfo?.monpay?.description,
                pin: otp1.join(""),
                passwordToken: data.result.passwordToken,
            } : transferInfo.type === "merchant" ? {
                srcAccountNo: partnerBalance.balanceList[cardIndex].accountNo,
                dstSrc: transferInfo?.merchant?.phoneNumber,
                amount: transferInfo?.merchant?.amount,
                description: transferInfo?.merchant?.description,
                pin: otp1.join(""),
                passwordToken: data.result.passwordToken,
            } :
                {
                    srcAccountNo: "",
                    dstSrc: "",
                    amount: "",
                    description: "",
                    pin: otp1.join(""),
                    passwordToken: data.result.passwordToken,
                }
            transferToMonpay.run(body);
        },
        onError: (e) => {
            setChecked(0);
            setAlert({ show: true, message: e.message });
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
                    clearInterval(timer); // Clear the interval when counter reaches 0
                    return 0; // Ensure it doesn't go negative
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
            postOTPCode.run(otp2.join(""));
        }
    };

    const handleClose = () => {
        setShow(false);
        // formreset?.current?.reset();
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
                                                    <div className="content">
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
                                                        <div className="content">
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
                                                            <div className="content">
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
                                                    className="email-confirm-code"
                                                    onSubmit={handleSubmit}
                                                >
                                                    <div className="label-title" style={{ paddingBottom: "10px" }}>
                                                        <h5>Гүйлгээний нууц үг оруулна уу</h5>
                                                    </div>
                                                    <OtpInput otp={otp1} setOtp={setOtp1} type="number" />
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
                                                                <h5>Бид таны {converHidePhone(partner?.phone)} дугаарт кодыг илгээсэн. Баталгаажуулах кодоо оруулна уу</h5>
                                                            </div>
                                                            <OtpInput otp={otp2} setOtp={setOtp2} type="number" />
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
                                                                    <Button variant="primary" type="submit">
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
