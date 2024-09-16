"use client";
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { AutoTabProvider } from 'react-auto-tab';
import FailNotification from '../notification/fail-notif';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import { useLoading } from '@/context/loading';


interface PinCodeChangeProps {
    setScreenIndex: (value: number) => void;
}

const PinCodeChange: React.FC<PinCodeChangeProps> = ({ setScreenIndex }) => {
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [show, setShow] = useState<boolean>(false);
    const [forDisabled, setForDisabled] = useState<boolean>(true);
    const router = useRouter();
    const [response, setResponse] = useState<ReponseProps>({ success: false, message: "", info: "" });
    const [pin1, setPin1] = useState<string>('');
    const [pin2, setPin2] = useState<string>('');
    const [pin3, setPin3] = useState<string>('');
    const [pin4, setPin4] = useState<string>('');
    const [pin5, setPin5] = useState<string>('');
    const [pin6, setPin6] = useState<string>('');
    const [pin7, setPin7] = useState<string>('');
    const [pin8, setPin8] = useState<string>('');
    const [pin9, setPin9] = useState<string>('');
    const [pin10, setPin10] = useState<string>('');
    const [pin11, setPin11] = useState<string>('');
    const [pin12, setPin12] = useState<string>('');

    const t = useTranslations('pincode');
    const { setLoading } = useLoading();

    useEffect(() => {
        if (pin1 && pin2 && pin3 && pin4 && pin5 && pin6 && pin7 && pin8 && pin9 && pin10 && pin11 && pin12) {
            setForDisabled(false);
        } else {
            setForDisabled(true);
        }
    }, [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12]);

    const handleSubmit = () => {
        if (pin5 + pin6 + pin7 + pin8 === pin9 + pin10 + pin11 + pin12) {
            const body: ChangePinCodeModel = {
                pinOld: pin1 + pin2 + pin3 + pin4,
                pinNew: pin5 + pin6 + pin7 + pin8,
            };
            balanceAction.run(body);
        } else {
            setAlert({
                show: true,
                message: 'Пин код давталт тохирохгүй байна.',
            });
        }

    };

    const balanceAction = useRequest(authService.changePinCode, {
        manual: true,
        onBefore: () => {
            setLoading(true);
        },
        onSuccess: async (data) => {
            setResponse({ info: data.info, success: true, message: data.result });
            setShow(true);
        },
        onError: (error) => {
            alert(JSON.stringify(error));
            setResponse({ info: error.message, success: false, message: error.message });
            setShow(true);
        },
        onFinally: () => {
            setLoading(false);
        }
    });

    const closeFailNotification = () => {
        setAlert({ message: "", show: false });
    };

    const handleModal = () => {
        setShow(false);
        if (response.success) {
            router.push('/app/dashboard');
        }
    };

    return (
        <Container fluid>
            <div className="content">
                <Form
                    noValidate
                    className="email-confirm-code setpincode"
                >
                    <>
                        <div className="label-title">
                            <h5
                                style={{
                                    marginTop: '0',
                                }}
                            >
                                {t('crrnt-pincode')}
                            </h5>
                        </div>
                        <div>
                            <AutoTabProvider>
                                <ul>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                type="password"
                                                name="code1"
                                                maxLength={1}
                                                className="confirm-input"
                                                tabbable={true}
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                onChange={(e) => setPin1(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                type="password"
                                                name="code2"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable={true}
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                onChange={(e) => setPin2(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                type="password"
                                                name="code3"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable={true}
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                onChange={(e) => setPin3(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                type="password"
                                                name="code4"
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
                                                onChange={(e) => setPin4(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </AutoTabProvider>
                        </div>
                    </>
                    <>
                        <div className="label-title mt-2">
                            <h5
                                style={{
                                    marginTop: '0',
                                }}
                            >
                                {t('new-pin')}
                            </h5>
                        </div>
                        <AutoTabProvider>
                            <div>
                                <ul>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code5"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin5(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code6"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin6(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code7"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin7(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code8"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin8(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </AutoTabProvider>
                        <div className="label-title mt-2">
                            <h5
                                style={{
                                    marginTop: '12px',
                                }}
                            >
                                {t('repeat-new')}
                            </h5>
                        </div>
                        <AutoTabProvider>
                            <div>
                                <ul>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code9"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin9(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code10"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin10(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code11"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin11(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                required
                                                onKeyPress={(event) => {
                                                    if (isNaN(Number(event.key))) {
                                                        event.preventDefault();
                                                    }
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                                name="code12"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                tabbable="true"
                                                onChange={(e) => setPin12(e.target.value)}
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </AutoTabProvider>
                    </>
                    <div className="settings-buttons mt-10">
                        <div className="buttons-inner">
                            <Button onClick={() => setScreenIndex(3)}>{t('recover-pin')}</Button>
                            <Button
                                disabled={forDisabled}
                                variant="primary"
                                onClick={handleSubmit}
                            >
                                {t('change')}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
            {alerts?.show && (
                <FailNotification
                    show={alerts.show}
                    infos={alerts.message}
                    close={closeFailNotification}
                ></FailNotification>
            )}
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
                                <h5>{response.success ? 'Амжилттай' : 'Амжилтгүй'}</h5>
                            </div>
                            <div className="desc">
                                {response.success ? (
                                    <p>Таны пинкод амжилттай солигдлоо</p>
                                ) : (
                                    <p>
                                        <strong>{response.info}</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleModal}>
                            {response.success ? 'Баярлалаа' : 'Хаах'}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Container>
    );
};

export default PinCodeChange;
