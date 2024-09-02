"use client";
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { AutoTabProvider } from 'react-auto-tab';
import FailNotification from '@/components/notification/fail-notif';
import LanguageChange from '@/components/language/language-change';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import IctContext from '@/context/ict-context';
import { phoneRegex } from '@/utils/utils';

const ForgotPasswordConfirm = () => {
    const { setPasswordRecoverOTP } = useContext(IctContext);
    const t = useTranslations('forgot-password');
    const [counter, setCounter] = useState<number>(60);
    const [phoneMasked, setPhoneMasked] = useState<string>("");
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [phoneEmail, setPhoneEmail] = useState<string>("");
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
            router.push('/auth/otp');
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const handleSubmit = (event) => {
        const form = event.target;
        if (form.checkValidity() === false) {
            event.preventDefault();
        } else {
            event.preventDefault();
            const pin = `${form.code1.value}${form.code2.value}${form.code3.value}${form.code4.value}`;
            const body = {
                otpValue: pin,
                accessValue: phoneEmail,
                accessType: phoneRegex.test(phoneEmail) ? "PHONE" : "EMAIL"
            };
            postOTPAction.run(body);
        }
    };

    const postOTPAction = useRequest(authService.postPasswordOtp, {
        manual: true,
        onSuccess: async (data) => {
            alert(data.result.passwordToken);
            jsCookie.set('passwordToken', data.result.passwordToken);
            router.push('/auth/new');
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const handleEnter = (event) => {
        if (event.key.toLowerCase() === 'enter') {
            const form = event.target.form;
            const index = [...form].indexOf(event.target);
            form.elements[index + 1].focus();
            event.preventDefault();
        }
    };

    const closeNotification = () => {
        setAlert({ message: "", show: false });
    };

    const retryPin = async () => {
        const values = {
            accessType: phoneRegex.test(phoneEmail) ? "PHONE" : "EMAIL",
            accessValue: phoneEmail,
        };
        otpAction.run(values);
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
                    <LanguageChange />
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
                        <AutoTabProvider>
                            <div>
                                <ul>
                                    <li>
                                        <div className="input-item">
                                            <Form.Control
                                                name="code1"
                                                type="password"
                                                className="confirm-input"
                                                maxLength={1}
                                                required
                                                tabbable="true"
                                                onKeyDown={handleEnter}
                                                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                                    if (isNaN(Number(event.key))) event.preventDefault();
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
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
                                                required
                                                tabbable="true"
                                                onKeyDown={handleEnter}
                                                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                                    if (isNaN(Number(event.key))) event.preventDefault();
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
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
                                                required
                                                tabbable="true"
                                                onKeyDown={handleEnter}
                                                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                                    if (isNaN(Number(event.key))) event.preventDefault();
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
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
                                                required
                                                tabbable="true"
                                                onKeyDown={handleEnter}
                                                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                                                    if (isNaN(Number(event.key))) event.preventDefault();
                                                }}
                                                autoComplete="off"
                                                inputMode="numeric"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </AutoTabProvider>
                        <div className="timer">
                            {counter === 0 ? (
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
                                        <Button type="submit">{t('confirm')}</Button>
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
            {alerts?.show && (
                <FailNotification
                    show={alerts.show}
                    infos={alerts.message}
                    close={closeNotification} position={undefined}>
                </FailNotification>
            )}
        </Container>
    );
};

export default ForgotPasswordConfirm;
