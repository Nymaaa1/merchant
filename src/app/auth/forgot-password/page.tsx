"use client";
import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import FailNotification from '@/components/notification/fail-notif';
import { useTranslations } from 'next-intl';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import IctContext from '@/context/ict-context';
import { emailRegex, phoneRegex } from '@/utils/utils';
import authBranchService from '@/service/branch';

const ForgotPassword: React.FC = () => {
    const { setPasswordRecoverOTP, loginType } = useContext(IctContext);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [validated, setValidated] = useState(false);
    const [phoneEmail, setPhoneEmail] = useState<string>("");
    const router = useRouter();
    const t = useTranslations('forgot-password');

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        setValidated(true);
        if (!emailRegex.test(form.number.value) && !phoneRegex.test(form.number.value)) {
            setAlert({ message: "Утасны дугаар эсвэл и-мэйл хаягаа зөв оруулна уу.", show: true });
            return setValidated(true);
        }
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            const phoneNumber = form.number.value;
            setPhoneEmail(phoneNumber);
            const values = {
                accessType: phoneRegex.test(phoneNumber) ? "PHONE" : "EMAIL",
                accessValue: phoneNumber,
            };
            if (loginType === "creater") {
                otpAction.run(values);
            } else {
                branchOTPAction.run(values);
            }
        }
        setValidated(true);
    };

    const otpAction = useRequest(authService.getPasswordOtp, {
        manual: true,
        onSuccess: async (data) => {
            setPasswordRecoverOTP(data.result.state);
            jsCookie.set('phoneAndEmail', phoneEmail);
            router.push('/auth/otp');
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const branchOTPAction = useRequest(authBranchService.getPasswordOtp, {
        manual: true,
        onSuccess: async (data) => {
            setPasswordRecoverOTP(data.result.state);
            jsCookie.set('phoneAndEmail', phoneEmail);
            router.push('/auth/otp');
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

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
                    {/* <div className="big-image">
                        <div className="image-stack">
                            <img className="big-image" src="/login-4-images.png" />
                        </div>
                    </div> */}
                </Col>
                <Col className="tw-login-form forgot-password" xl={5} xxl={5} xs={12}>
                    <div className="tw-logo-title">
                        <Image src="/logo/monpay-logo.png" width={185} height={45} alt={''} />
                        <div className="tw-form-title">
                            <span>{t('password-recover')}</span>
                        </div>
                    </div>
                    <Form noValidate validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group>
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    name="number"
                                    type="text"
                                    className="tw-input"
                                    placeholder={t('phone-number-or-email')}
                                    autoComplete="off"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {t('phone-number-or-email-validation')}.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <div className="tw-form-buttons" style={{ marginTop: "30px" }}>
                            <div className="tw-top-button">
                                <Button type="submit">{t('send-code')}</Button>
                            </div>
                            <div className="tw-bottom-button">
                                <Link href="/auth/login">
                                    <Button>{t('back')}</Button>
                                </Link>
                            </div>
                        </div>
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

export default ForgotPassword;
