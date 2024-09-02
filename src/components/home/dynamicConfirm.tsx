"use client";
import React, { useState, useContext, useRef } from 'react';
import {
    Col,
    Row,
    Button,
    Modal,
    Form,
    InputGroup,
} from 'react-bootstrap';
import { AutoTabProvider } from 'react-auto-tab';
import IctContext from '@/context/ict-context';
import { useRouter } from 'next/navigation';
import FailNotification from '../notification/fail-notif';
import { useTranslations } from 'next-intl';

const DynamicConfirm = () => {
    const { transferInfo } = useContext(IctContext);
    const [password, setPassword] = useState<string>("");
    const [showOTP, setShowOTP] = useState<boolean>(false);
    const [passwordShown, setPasswordShown] = useState(false);

    const [checked, setChecked] = useState(false);
    const [response, setResponse] = useState({});
    const [show, setShow] = useState(false);
    const router = useRouter();
    const [alert, setAlert] = useState({ show: false });
    const t = useTranslations('account');
    const formreset = useRef(null);

    const toggleHandler = (e) => {
        setChecked(e.target.checked);
    };

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const handleBack = () => {
        // router.back('');
    };

    const handleShowOTP = () => {
        // if (password.length > 0) 
        setShowOTP(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // const form = event.currentTarget;
        // if (form.checkValidity() === false) {
        //     setValidated(false);
        //     event.stopPropagation();
        // } else {
        //     setValidated(true);
        //     const pinRange = [...Array(4).keys()];
        //     const pin = '';
        //     pinRange.map((index) => {
        //         pin = pin.concat(form[`code${index + 1}`]?.value);
        //     });
        //     if (!isNaN(pin)) {
        //         const body = createBody(pin);
        //         axios.post('/api/account/transfer-to-bank', body).then(
        //             (resp) => {
        //                 setShow(true);
        //                 setResponse({ ...resp.data.result, success: true });
        //             },
        //             (error) => {
        //                 setShow(true);
        //                 setResponse({
        //                     ...error.response.data,
        //                     success: false,
        //                 });
        //             }
        //         );
        //         if (checked) {
        //             const template = createTemplate(form.template.value);
        //             axios.post('/api/account/transfer-template', template).then(
        //                 (resp) => { },
        //                 (error) => {
        //                     setAlert({
        //                         show: true,
        //                         message: error.response?.data?.info,
        //                     });
        //                     event.stopPropagation();
        //                 }
        //             );
        //         }
        //     } else {
        //         //TODO: Handle invalid pin
        //     }
        // }
        // setValidated(true);
    };

    const createBody = (pin) => {
        // const body = {};
        // const reqBody = transferInfo.bank;
        // body.bankName = reqBody.bankCode;
        // body.bankAccount = reqBody.bankAccount;
        // body.bankAccountName = reqBody.bankAccountName;
        // body.amount = Number(reqBody.amount);
        // body.decription = reqBody.description;
        // body.srcAccountNo = reqBody.srcAccountNo;
        // body.pin = pin;
        // return body;
    };

    const createTemplate = (name) => {
        const body = {};
        const reqBody = transferInfo.bank;
        body.destBankCode = reqBody.bankCode;
        body.destAccountNo = reqBody.bankAccount;
        body.destCustomerName = reqBody.bankAccountName;
        body.destBankName = reqBody.bankName;
        body.decription = reqBody.description;
        body.templateName = name;
        return body;
    };

    const handleClose = () => {
        // setShow(false);
        // formreset.current.reset();
        // if (response.success) {
        //     window.location.reload();
        //     router.push('/app/dashboard');
        // }
    };

    const closeNotification = () => {
        // setAlert(false);
    };

    const nameArray = transferInfo?.bank?.bankName?.split(' ') || [];
    const newStr =
        nameArray.length > 1
            ? nameArray[0] +
            ' ' +
            nameArray[1]?.replace(
                nameArray[1].substr(1, nameArray[1].length - 0),
                nameArray[1].substr(1, nameArray[1].length - 3).replace(/./g, '*')
            )
            : '';
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
                                                </div>

                                                <Form
                                                    ref={formreset}
                                                    className="email-confirm-code"
                                                    onSubmit={handleSubmit}
                                                >
                                                    <div className="label-title" style={{ paddingBottom: "10px" }}>
                                                        <h5>Гүйлгээний нууц үг оруулна уу</h5>
                                                    </div>
                                                    <div className="tw-register input-item">
                                                        <InputGroup hasValidation>
                                                            <Form.Control
                                                                style={{ borderRadius: "10px" }}
                                                                required
                                                                name="bankAccount"
                                                                type={passwordShown ? 'text' : 'password'}
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                autoComplete="off"
                                                            />
                                                            <span className="icon-on-off" onClick={togglePasswordVisibility}>
                                                                <img src={passwordShown ? "/svg/icon-off.svg" : "/svg/icon-on.svg"} alt="Toggle password visibility" />
                                                            </span>
                                                            <Form.Control.Feedback type="invalid">
                                                                Invalid password
                                                            </Form.Control.Feedback>
                                                        </InputGroup>
                                                    </div>
                                                    {showOTP ? <>
                                                        <div className="label-title" style={{ paddingTop: "40px", paddingBottom: "10px" }}>
                                                            <h5>Бид таны 99•••275 дугаарт кодыг илгээсэн. Баталгаажуулах кодоо оруулна уу</h5>
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
                                                                                if (isNaN(event.key))
                                                                                    event.preventDefault();
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
                                                                                if (isNaN(event.key))
                                                                                    event.preventDefault();
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
                                                                                if (isNaN(event.key))
                                                                                    event.preventDefault();
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
                                                                                if (isNaN(event.key))
                                                                                    event.preventDefault();
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
                                                                <span>Дахин код авах уу?</span>
                                                            </div>
                                                        </div>
                                                        <div className="transfer-buttons">
                                                            <div className="buttons-inner">
                                                                <Button onClick={(e) => setShowOTP(false)}>
                                                                    Буцах
                                                                </Button>
                                                                <Button variant="primary" type="submit">
                                                                    Баталгаажуулах код авах
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </>
                                                        :

                                                        <div className="transfer-buttons">
                                                            <div className="buttons-inner">
                                                                <Button onClick={handleBack}>Буцах</Button>
                                                                <Button variant="primary" onClick={handleShowOTP}>
                                                                    Баталгаажуулах код авах
                                                                </Button>
                                                            </div>
                                                        </div>
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
                                <h5>{t('transfer')}</h5>
                                <h5>{response.success ? 'амжилттай' : 'амжилтгүй'}</h5>
                            </div>
                            <div className="desc">
                                {response.success ? (
                                    <p>
                                        {t('your')}
                                        <strong
                                            style={{
                                                padding: '0 3px',
                                            }}
                                        >
                                            {response.transactionId}
                                        </strong>
                                        {t('successfully')}
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
            {alert?.show && (
                <FailNotification
                    show={alert.show}
                    infos={alert.message}
                    close={closeNotification}
                ></FailNotification>
            )}
        </>
    );
};

export default DynamicConfirm;
