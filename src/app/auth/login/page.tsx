'use client';

import React, { useContext, useState, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Tabs, Tab } from 'react-bootstrap';
import Link from 'next/link';
import IctContext from '@/context/ict-context';
import FailNotification from '@/components/notification/fail-notif';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import { useRouter } from 'next/navigation';
import authBranchService from '@/service/branch';
import { useLoading } from "@/context/loading";

const Login: React.FC = () => {
    const t = useTranslations('login');
    const { setPartner, setBranch, setUserRole, setLoginType, loginType } = useContext(IctContext);
    const [passwordShown, setPasswordShown] = useState(false);
    const [validated, setValidated] = useState(false);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const router = useRouter();
    const { setLoading, setColor } = useLoading();

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const loginAction = useRequest(authService.login, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setPartner(data.result.partner);
            setUserRole("partner");
            authService.setPartner(JSON.stringify(data.result.partner), data.result.token);
            setLoading(false);
            router.push("/app/dashboard");
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        },
        onFinally: () => {
            setLoading(false);
        }
    })

    const branchLoginAction = useRequest(authBranchService.login, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setBranch(data.result.branch);
            setUserRole("branch");
            authBranchService.setBranch(JSON.stringify(data.result.branch), data.result.token);
            setLoading(false);
            router.push("/branch/dashboard");
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        },
        onFinally: () => {
            setLoading(false);
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
        setColor("#ffff")
        if (loginType === "creater") {
            loginAction.run(values);
        } else {
            branchLoginAction.run(values);
        }
    };

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
                </Col>
                <Col className="tw-login-form" xl={5} xxl={5} xs={12}>
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
                            >
                                <Tabs
                                    id="controlled-tab-example"
                                    defaultActiveKey={loginType}
                                    onSelect={(key) => setLoginType(key || 'branch')}
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
                                <Button>Монпэй хамтрагч болох бол <Link href="/auth/request"><span>ЭНД ДАРНА</span></Link> уу!</Button>
                            </div>
                            <div className="help-and-services">
                                <Button><Link href="/auth/help">Тусламж</Link> • <Link href="/auth/faq">FAQ</Link></Button>
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
