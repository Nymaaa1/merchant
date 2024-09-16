"use client";
import React, { useState, useContext } from 'react';
import {
    Col,
    Row,
    Button,
    Modal,
    Form,
} from 'react-bootstrap';
import { AutoTabProvider } from 'react-auto-tab';
import IctContext from '@/context/ict-context';
import { useRouter } from 'next/navigation';
import FailNotification from '../notification/fail-notif';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import { useLoading } from '@/context/loading';

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
    const { partner, cardIndex, partnerBalance, transferInfo } = useContext(IctContext);
    const [pin1, setPin1] = useState<string>("");
    const [pin2, setPin2] = useState<string>("");
    const [pin3, setPin3] = useState<string>("");
    const [pin4, setPin4] = useState<string>("");
    const { setLoading } = useLoading();
    const [checked, setChecked] = useState<number>(0);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });

    const [response, setResponse] = useState<ReponseProps>({ success: false, message: "", info: "" });
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();

    const handleBack = () => {
        setShow(true);
        setConfirmation(true);
    };

    const handleShowOTP = () => {
        if (pin1 && pin2 && pin3 && pin4) {
            if (transferInfo.type === "bank") {
                // getOTPCode.run(transferInfo.bank.sourceAccountNo);
            } else if (transferInfo.type === "candy") {
                getOTPCode.run();
            } else if (transferInfo.type === "merchant") {
                getOTPCode.run();
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
                pin: pin1 + pin2 + pin3 + pin4,
                passwordToken: data.result.passwordToken,
            } : transferInfo.type === "merchant" ? {
                srcAccountNo: partnerBalance.balanceList[cardIndex].accountNo,
                dstSrc: transferInfo?.merchant?.phoneNumber,
                amount: transferInfo?.merchant?.amount,
                description: transferInfo?.merchant?.description,
                pin: pin1 + pin2 + pin3 + pin4,
                passwordToken: data.result.passwordToken,
            } :
                {
                    srcAccountNo: "",
                    dstSrc: "",
                    amount: "",
                    description: "",
                    pin: pin1 + pin2 + pin3 + pin4,
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
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            event.preventDefault();
            const pin: string = `${form.code1.value}${form.code2.value}${form.code3.value}${form.code4.value}`;
            postOTPCode.run(pin);
        }
    };

    const handleClose = () => {
        setShow(false);
        // formreset?.current?.reset();
        window.location.reload();
        if (response.success) {
            window.location.reload();
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
                                                    <AutoTabProvider>
                                                        <ul>
                                                            <li>
                                                                <div className="input-item">
                                                                    <Form.Control
                                                                        name="c"
                                                                        type="password"
                                                                        className="confirm-input"
                                                                        maxLength={1}
                                                                        onChange={(e) => { setPin1(e.target.value) }}
                                                                        tabbable="true"
                                                                        onKeyPress={(event) => {
                                                                            if (isNaN(Number(event.key))) {
                                                                                event.preventDefault();
                                                                            }
                                                                        }}
                                                                        autoComplete="off"
                                                                        inputMode="numeric"
                                                                        required
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="input-item">
                                                                    <Form.Control
                                                                        name="c"
                                                                        type="password"
                                                                        className="confirm-input"
                                                                        maxLength={1}
                                                                        onChange={(e) => { setPin2(e.target.value) }}
                                                                        tabbable="true"
                                                                        onKeyPress={(event) => {
                                                                            if (isNaN(Number(event.key))) {
                                                                                event.preventDefault();
                                                                            }
                                                                        }}
                                                                        autoComplete="off"
                                                                        inputMode="numeric"
                                                                        required
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="input-item">
                                                                    <Form.Control
                                                                        name="c"
                                                                        onChange={(e) => { setPin3(e.target.value) }}
                                                                        type="password"
                                                                        className="confirm-input"
                                                                        maxLength={1}
                                                                        tabbable="true"
                                                                        onKeyPress={(event) => {
                                                                            if (isNaN(Number(event.key))) {
                                                                                event.preventDefault();
                                                                            }
                                                                        }}
                                                                        autoComplete="off"
                                                                        inputMode="numeric"
                                                                        required
                                                                    />
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="input-item">
                                                                    <Form.Control
                                                                        name="c"
                                                                        onChange={(e) => { setPin4(e.target.value) }}
                                                                        type="password"
                                                                        className="confirm-input"
                                                                        maxLength={1}
                                                                        tabbable="true"
                                                                        onKeyPress={(event) => {
                                                                            if (isNaN(Number(event.key))) {
                                                                                event.preventDefault();
                                                                            }
                                                                        }}
                                                                        autoComplete="off"
                                                                        inputMode="numeric"
                                                                        required
                                                                    />
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </AutoTabProvider>
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
                                                                <h5>Бид таны {converHidePhone(partner.verifiedPhone)} дугаарт кодыг илгээсэн. Баталгаажуулах кодоо оруулна уу</h5>
                                                            </div>
                                                            <AutoTabProvider>
                                                                <ul>
                                                                    <li>
                                                                        <div className="input-item">
                                                                            <Form.Control
                                                                                name="code1"
                                                                                type="password"
                                                                                className="confirm-input"
                                                                                maxLength={1}
                                                                                tabbable="true"
                                                                                onKeyPress={(event) => {
                                                                                    if (isNaN(Number(event.key))) {
                                                                                        event.preventDefault();
                                                                                    }
                                                                                }}
                                                                                autoComplete="off"
                                                                                inputMode="numeric"
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="input-item">
                                                                            <Form.Control
                                                                                name="code2"
                                                                                type="password"
                                                                                className="confirm-input"
                                                                                maxLength={1}
                                                                                tabbable="true"
                                                                                onKeyPress={(event) => {
                                                                                    if (isNaN(Number(event.key))) {
                                                                                        event.preventDefault();
                                                                                    }
                                                                                }}
                                                                                autoComplete="off"
                                                                                inputMode="numeric"
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="input-item">
                                                                            <Form.Control
                                                                                name="code3"
                                                                                type="password"
                                                                                className="confirm-input"
                                                                                maxLength={1}
                                                                                tabbable="true"
                                                                                onKeyPress={(event) => {
                                                                                    if (isNaN(Number(event.key))) {
                                                                                        event.preventDefault();
                                                                                    }
                                                                                }}
                                                                                autoComplete="off"
                                                                                inputMode="numeric"
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <div className="input-item">
                                                                            <Form.Control
                                                                                name="code4"
                                                                                type="password"
                                                                                className="confirm-input"
                                                                                maxLength={1}
                                                                                tabbable="true"
                                                                                onKeyPress={(event) => {
                                                                                    if (isNaN(Number(event.key))) {
                                                                                        event.preventDefault();
                                                                                    }
                                                                                }}
                                                                                autoComplete="off"
                                                                                inputMode="numeric"
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </AutoTabProvider>
                                                            <div className="confirm-bank">
                                                                <div className="save-template">
                                                                    <span onClick={retryPin}>
                                                                        Дахин код авах уу?
                                                                    </span>
                                                                </div>
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
