"use client";
import React, { useState, FormEvent, useRef } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Modal } from 'react-bootstrap';
import Link from 'next/link';
import FailNotification from '@/components/notification/fail-notif';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useLoading } from '@/context/loading';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import { emailRegex, phoneRegex } from '@/utils/utils';

const Login: React.FC = () => {
    const t = useTranslations('request');
    const ref = useRef<HTMLFormElement>(null);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [validated, setValidated] = useState<boolean>(false);
    const { setLoading, setColor } = useLoading();
    const [show, setShow] = useState<boolean>(false);
    const [response, setResponse] = useState({ success: false, info: "" });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setColor("#4341CC")
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else if (!emailRegex.test(form.email.value)) {
            setAlert({ show: true, message: "И-Мэйл хаяг оруулна уу!" });
            setValidated(true);
        } else if (!phoneRegex.test(form.phone.value)) {
            setAlert({ show: true, message: "Утасны дугаар оруулна уу!" });
            setValidated(true);
        } else if (!(form.comname.value.length > 0)) {
            setAlert({ show: true, message: "Байгууллагын нэр оруулна уу!" });
            setValidated(true);
        } else {
            const phone = form.phone.value;
            const email = form.email.value;
            const name = form.comname.value;

            const body: EmailBody = {
                type: null,
                name: name,
                phone: phone,
                email: email,
            };
            emailSend.run(body);
        }
        setValidated(true);
    };

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    const emailSend = useRequest(authService.email, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setLoading(false);
            setShow(true);
            setResponse({ success: true, info: data.result });
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        },
        onFinally: () => {
            setLoading(false);
        }
    });

    const handleClose = () => {
        setShow(false);
        window.location.reload();
        ref?.current?.reset();
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
                        ref={ref}
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
                                    name="comname"
                                    type="text"
                                    className="tw-input tw-phone"
                                    placeholder={t('name')}
                                    maxLength={100}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Нэр / Байгууллагын нэр оруулна уу!
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
                                <Form.Control
                                    required
                                    name="phone"
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
                                    Утасны дугаар оруулна уу!
                                </Form.Control.Feedback>
                            </InputGroup>
                            <InputGroup hasValidation>
                                <InputGroup.Text
                                    className="password"
                                    id="inputGroupPrepend"
                                ></InputGroup.Text>
                                <Form.Control
                                    required
                                    name="email"
                                    type='text'
                                    className="tw-input tw-password"
                                    placeholder={t('email')}
                                    autoComplete="off"
                                />

                                <Form.Control.Feedback type="invalid">
                                    И-Мэйл хаяг оруулна уу!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <div className="tw-form-buttons">
                            <div className="tw-top-button">
                                <Button type="submit">{t('button')}</Button>
                            </div>
                            <div className="tw-bottom-button">
                                <Link href="/auth/login">
                                    <Button type="submit">Буцах</Button>
                                </Link>
                            </div>
                        </div>
                    </Form>
                </Col>
            </Row>
            {alerts.show && (
                <FailNotification
                    show={alerts.show}
                    infos={alerts.message}
                    close={closeNotification} position={undefined} />
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
                                    <p>
                                        <strong
                                            style={{
                                                padding: '0 3px',
                                                color: "#5B698E"
                                            }}
                                        >
                                            Таны хүсэлт амжилттай илгээгдлээ.
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
        </Container>
    );
};

export default Login;
