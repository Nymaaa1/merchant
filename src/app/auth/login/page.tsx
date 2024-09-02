'use client';

import React, { useContext, useState, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Tabs, Tab } from 'react-bootstrap';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import IctContext from '@/context/ict-context';
import FailNotification from '@/components/notification/fail-notif';
import LanguageChange from '@/components/language/language-change';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const t = useTranslations('login');
    const { setPartner } = useContext(IctContext);
    const [passwordShown, setPasswordShown] = useState(false);
    const [validated, setValidated] = useState(false);
    const [branch, setBranch] = useState(false);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [currentTab, setCurrentTab] = useState('creater');
    const router = useRouter();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };
    const handleChangeType = () => {
        setBranch(!branch);
    }

    const loginAction = useRequest(authService.login, {
        manual: true,
        onSuccess: async (data) => {
            setPartner(data.result.partner);
            authService.setPartner(JSON.stringify(data.result.partner), data.result.token);
            router.push("/app/dashboard");
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true);
            return;
        }

        const formData = new FormData(form);
        const values = {
            username: formData.get('username') as string,
            password: formData.get('password') as string,
        };
        // setPaswoard(values.password);
        loginAction.run(values);
        // loginAction.run();

        // const resp = await fetch("/api/login", {
        //     method: "POST",
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     })
        // });

        // if (!resp.ok) {
        //     const errorData = await resp.json();
        //     alert("bdjv" + errorData.error);
        // } else {
        //     const data = await resp.json();
        //     alert(JSON.stringify({ data }));
        // }

        // try {
        //     const resp = await axios.post(process.env.MONPAY_API_URL + '/partner/login', body);
        //     const authToken = resp.data.authToken;
        //     alert("cbsjc" + resp.status);
        //     jsCookie.set('auth', authToken, { expires: 1 / 24 / 6 });

        //     const userInfo = await getShortInfo();
        //     setLogin(userInfo.data.result);

        //     if (userInfo.data.result.pin) {
        //         // Redirect to dashboard if pin exists
        //         // router.push('/app/dashboard');
        //     } else {
        //         // Redirect to pin registration if pin doesn't exist
        //         // router.push('/registration/pin');
        //     }
        // } catch (error: any) {
        //     alert("cbsjc" + error.response.data.info);
        //     if (error.response?.status === 408) {
        //         const permToken = error.response.data.permToken;
        //         jsCookie.set('perm', permToken);
        //         // router.push('/registration/personal-info');
        //     }
        //     setAlert({ show: true, message: error.response?.data?.info });
        // }

        // setValidated(true);
    };

    const getShortInfo = async () => {
        // return axiosInstance.get('/api/user/short');
    };

    // Close alert notification
    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    return (
        <Container fluid>
            <Row className="tw-form">
                <Col
                    className="tw-image-section d-none d-xl-flex"
                    style={{
                        backgroundImage: `url("/login/Bg.png")`,
                    }}
                    xl={7}
                    xxl={7}
                >
                    {/* Optional image section */}
                </Col>
                <Col className="tw-login-form" xl={5} xxl={5} xs={12}>
                    <LanguageChange />
                    <div className="tw-logo-title">
                        <Link href="/auth/login">
                            <div>
                                <Image src="/logo/monpay-logo.png" width={185} height={45} alt="Monpay Logo" />
                            </div>
                        </Link>
                        <div className="tw-form-title">
                            <span>{t('title')}</span>
                        </div>
                    </div>
                    <div className="deposit-tab">
                        <div className="deposit-tab-content">
                            <Form
                                validated={validated}
                                name="creater"
                                onSubmit={handleChangeType}
                            >
                                <Tabs
                                    id="controlled-tab-example"
                                    defaultActiveKey="creater"
                                    onSelect={(key) => setCurrentTab(key || 'branch')}
                                    className="recharge-tab"
                                >
                                    <Tab eventKey="creater" title={t('account')} />
                                    <Tab eventKey="branch" title={t('branch')} />
                                </Tabs>
                            </Form>
                        </div>
                    </div>
                    <Form className="tw-register pt-8" noValidate validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                <Form.Control
                                    required
                                    name="username"
                                    type="text"
                                    className="tw-input tw-phone"
                                    placeholder={t('phone')}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {t('validation.phone')}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup hasValidation>
                                <InputGroup.Text
                                    className="password"
                                    id="inputGroupPrepend"
                                ></InputGroup.Text>
                                <Form.Control
                                    required
                                    name="password"
                                    type={passwordShown ? 'text' : 'password'}
                                    className="tw-input tw-password"
                                    placeholder={t('password')}
                                    autoComplete="off"
                                />
                                <span className="icon-on-off" onClick={togglePasswordVisibility}>
                                    <img src={passwordShown ? "/svg/icon-off.svg" : "/svg/icon-on.svg"} alt="Toggle password visibility" />
                                </span>
                                <Form.Control.Feedback type="invalid">
                                    {t('validation.password')}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <div className="tw-recover-password">
                            <Link href="/auth/forgot-password">
                                <Button>{t('recover')}</Button>
                            </Link>
                        </div>
                        <div className="tw-form-buttons">
                            <div className="tw-top-button">
                                <Button type="submit">{t('login')}</Button>
                            </div>
                            <div className="tw-request">
                                <Button> Монпэй хамтрагч болох бол  <Link href="/auth/request"><span>ЭНД ДАРНА</span></Link> уу!</Button>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
            {alerts.show && (
                <FailNotification show={alerts.show} infos={alerts.message} close={closeNotification} />
            )}
        </Container>
    );
};

export default Login;
