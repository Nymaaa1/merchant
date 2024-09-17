"use client";
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import FailNotification from '@/components/notification/fail-notif';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import IctContext from '@/context/ict-context';
import { phoneRegex } from '@/utils/utils';
import authBranchService from '@/service/branch';
import Notification from '@/components/notification/notification';
import OtpInput from '@/components/widget/pinput';
import { useLoading } from '@/context/loading';

const ForgotPasswordConfirm = () => {
    const { setPasswordRecoverOTP, loginType } = useContext(IctContext);
    const t = useTranslations('forgot-password');
    const { setLoading } = useLoading();
    const [counter, setCounter] = useState<number>(60);
    const [phoneMasked, setPhoneMasked] = useState<string>("");
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [phoneEmail, setPhoneEmail] = useState<string>("");
    const [notification, setNotification] = useState<Alert>({ show: false, message: "" });
    const [otp1, setOtp1] = useState(new Array(4).fill(""));
    const [forDisabled, setForDisabled] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const phoneNumber = jsCookie.get('phoneAndEmail');
        if (!!!phoneNumber) return router.push('/auth/forgot-password');
        const masked =
            phoneNumber.length > 4
                ? phoneNumber.substring(0, 2) + '***' + phoneNumber.substring(5)
                : phoneNumber;
        setPhoneMasked(masked);
        setPhoneEmail(phoneNumber);
    }, []);

    useEffect(() => {
        if (otp1.join("").length === 4) {
            setForDisabled(false);
        } else {
            setForDisabled(true);
        }
    }, [otp1]);

    useEffect(() => {
        const timer: NodeJS.Timeout | undefined = counter > 0
            ? setInterval(() => setCounter(prevCounter => prevCounter - 1), 1000)
            : undefined;
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [counter]);

    const otpAction = useRequest(authService.getPasswordOtp, {
        manual: true,
        onSuccess: async (data) => {
            setPasswordRecoverOTP(data.result.state);
            setNotification({ message: data.result.state, show: true });
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    });

    const closeNotification = () => {
        setNotification({ message: "", show: false });
    };

    const branchOtpAction = useRequest(authBranchService.getPasswordOtp, {
        manual: true,
        onSuccess: async (data) => {
            setPasswordRecoverOTP(data.result.state);
            setNotification({ message: data.result.state, show: true });
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const handleSubmit = (event: any) => {
        const form = event.target;
        if (form.checkValidity() === false) {
            event.preventDefault();
        } else {
            event.preventDefault();
            const body = {
                otpValue: otp1.join(""),
                accessValue: phoneEmail,
                accessType: phoneRegex.test(phoneEmail) ? "PHONE" : "EMAIL"
            };
            if (loginType === "creater") {
                postOTPAction.run(body);
            } else {
                postOTPBranchAction.run(body);
            }
        }
    };

    const postOTPAction = useRequest(authService.postPasswordOtp, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setLoading(false);
            jsCookie.set('passwordToken', data.result.passwordToken);
            router.push('/auth/new');
        },
        onError: (e) => {
            setLoading(false);
            setAlert({ show: true, message: e.message });
        }
    })

    const postOTPBranchAction = useRequest(authBranchService.postPasswordOtp, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setLoading(false);
            jsCookie.set('passwordToken', data.result.passwordToken);
            router.push('/auth/new');
        },
        onError: (e) => {
            setLoading(false);
            setAlert({ show: true, message: e.message });
        }
    })

    const closeFailNotification = () => {
        setAlert({ message: "", show: false });
    };

    const retryPin = async () => {
        const values = {
            accessType: phoneRegex.test(phoneEmail) ? "PHONE" : "EMAIL",
            accessValue: phoneEmail,
        };
        if (loginType === "creater") {
            otpAction.run(values);
        } else {
            branchOtpAction.run(values);
        }
        setCounter(60);
    };

    return (
        <Container className="register-confirm" fluid>
            <Row className="tw-form">
                <Col
                    className="tw-image-section d-none d-xl-flex"
                    style={{
                        backgroundImage: `url("/login/Bg.png")`,
                    }}
                    xl={7}
                    xxl={7}
                >
                    <div className="big-image">
                        <div className="image-stack">
                            <Image src="/logo/monpay-logo.png" width={185} height={45} alt={''} />
                        </div>
                    </div>
                </Col>
                <Col className="tw-login-form" xl={5} xxl={5} xs={12}>
                    <div className="tw-logo-title">
                        <Image src="/logo/monpay-logo.png" width={185} height={45} alt={''} />
                        <div className="tw-form-title">
                            <span>{t('password-recover')}</span>
                            <p>
                                <strong>{phoneMasked}</strong> {t('desc-2')}
                            </p>
                        </div>
                    </div>
                    <Form className="tw-register" onSubmit={handleSubmit}>
                        <OtpInput otp={otp1} setOtp={setOtp1} type="number" />
                        <div className="timer">
                            {counter > 0 ? (
                                <span className="timer-text" onClick={retryPin}>
                                    {t('get-code-again')}
                                </span>
                            ) : (
                                <span className="timer-number">
                                    <span>Дахин код авах</span> 00:{counter < 10 ? '0' : ''}
                                    {counter}
                                </span>
                            )}
                        </div>
                        <Row>
                            <Col>
                                <div className="tw-form-buttons">
                                    <div className="tw-top-button">
                                        <Button disabled={forDisabled} type="submit">{t('confirm')}</Button>
                                    </div>
                                    <div className="tw-bottom-button">
                                        <Link href="/auth/forgot-password">
                                            <Button type="submit">{t('back')}</Button>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {notification?.show && (
                <Notification
                    show={notification.show}
                    infos={notification.message}
                    close={closeNotification}
                />
            )}
            {alerts?.show && (
                <FailNotification
                    show={alerts.show}
                    infos={alerts.message}
                    close={closeFailNotification} position={undefined}>
                </FailNotification>
            )}
        </Container>
    );
};

export default ForgotPasswordConfirm;
