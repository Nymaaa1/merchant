"use client";
import React, { useState, FormEvent } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Link from 'next/link';
import FailNotification from '@/components/notification/fail-notif';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Login: React.FC = () => {
    const t = useTranslations('request')
    const [alert, setAlert] = useState<Alert>({ show: false, message: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const phone = form.phonenumber.value;
            const password = form.password.value;

            const body = {
                phone: phone,
                password: password,
            };
            setLoading(true)
            fetch("/api/email", { method: "POST" }).then(
                response => response.json()
            ).then(
                data => setAlert({ show: true, message: "Амжилттай" })
            ).catch(error =>
                setAlert({
                    show: true,
                    message: error,
                })
            ).finally(() =>
                setLoading(false)
            )
        }
        setValidated(true);
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
                        <Link href="/">
                            <div>
                                <Image src="/logo/monpay-logo.png" width={185} height={45} alt={''} />
                            </div>
                        </Link>
                        <div className="tw-form-title">
                            <span>{t('title')}</span>
                        </div>
                    </div>
                    <Form
                        className="tw-register"
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                <Form.Control
                                    required
                                    name="phonenumber"
                                    type="text"
                                    className="tw-input tw-phone"
                                    placeholder={t('name')}
                                    onKeyPress={(event) => {
                                        if (isNaN(Number(event.key))) event.preventDefault();
                                    }}
                                    maxLength={8}
                                    pattern="[1-9]{1}[0-9]{7}"
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {t('validation.phone')}
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                <Form.Control
                                    required
                                    name="phonenumber"
                                    type="text"
                                    className="tw-input tw-phone"
                                    placeholder={t('phone')}
                                    onKeyPress={(event) => {
                                        if (isNaN(Number(event.key))) event.preventDefault();
                                    }}
                                    maxLength={8}
                                    pattern="[1-9]{1}[0-9]{7}"
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
                                    type='text'
                                    className="tw-input tw-password"
                                    placeholder={t('email')}
                                    autoComplete="off"
                                />

                                <Form.Control.Feedback type="invalid">
                                    {t('validation.password')}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        {!loading ? <div className="tw-form-buttons">
                            <div className="tw-top-button">
                                <Button type="submit">{t('button')}</Button>
                            </div>
                            <div className="tw-bottom-button">
                                <Link href="/auth/login">
                                    <Button type="submit">{t('back')}</Button>
                                </Link>
                            </div>
                        </div> : null}

                    </Form>
                </Col>
            </Row>
            {alert.show && (
                <FailNotification
                    show={alert.show}
                    infos={alert.message}
                    close={closeNotification} position={undefined} />
            )}
        </Container>
    );
};

export default Login;
