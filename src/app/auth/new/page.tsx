"use client";
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import MustContainItem from './components/must-contain-tem';
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
import { useLoading } from '@/context/loading';

type CheckValidation = [string, boolean][];

const ForgotNewPassword = () => {
    const { setPasswordRecoverOTP, loginType } = useContext(IctContext);
    const [passwordShown, setPasswordShown] = useState<boolean>(false);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const t = useTranslations('forgot-password');
    const { setLoading } = useLoading();
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const [validated, setValidated] = useState<boolean>(false);
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [token, setToken] = useState<string>("");
    const router = useRouter();

    const validatePassword = () => {
        // has uppercase letter
        if (password1.toLowerCase() != password1) setContainsUL(true);
        else setContainsUL(false);

        // has lowercase letter
        if (password1.toUpperCase() != password1) setContainsLL(true);
        else setContainsLL(false);

        // has number
        if (/\d/.test(password1)) setContainsN(true);
        else setContainsN(false);

        // has 8 characters
        if (password1.length >= 8) setContains8C(true);
        else setContains8C(false);

        // passwords match
        if (password1 !== '' && password1 === password2) setPasswordMatch(true);
        else setPasswordMatch(false);

        // all validations passed
        if (containsUL && containsLL && containsN && contains8C && passwordMatch)
            setAllValid(true);
        else setAllValid(false);
    };

    const [containsUL, setContainsUL] = useState<boolean>(false); // Том үсэг оруулах
    const [containsLL, setContainsLL] = useState<boolean>(false); // Жижиг үсэг оруулах
    const [containsN, setContainsN] = useState<boolean>(false); // Тоон тэмдэгт оруулах
    const [contains8C, setContains8C] = useState<boolean>(false); // Хамгийн багадаа 8 тэмдэгт оруулах
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false); // passwords таарах
    const [allValid, setAllValid] = useState<boolean>(false);

    const mustContainData: CheckValidation = [
        ['Том үсэг оруулах', containsUL],
        ['Жижиг үсэг оруулах', containsLL],
        ['Тоон тэмдэгт оруулах', containsN],
        ['Хамгийн багадаа 8 тэмдэгт оруулах', contains8C],
    ];

    useEffect(() => {
        const phoneNumber = jsCookie.get('phoneAndEmail');
        const token = jsCookie.get('passwordToken');
        if (!!!phoneNumber || !!!token) return router.push('/auth/forgot-password');

        setPhoneNumber(phoneNumber);
        setToken(token);
        validatePassword();
    }, [
        password1,
        password2,
        containsUL,
        containsLL,
        containsN,
        contains8C,
        passwordMatch,
    ]);

    const otpAction = useRequest(authService.changePassword, {
        onBefore: () => {
            setLoading(true);
        },
        manual: true,
        onSuccess: async (data) => {
            setLoading(false);
            setPasswordRecoverOTP("");
            jsCookie.remove('passwordToken');
            jsCookie.remove('phoneAndEmail');
            router.push('/auth/success');
        },
        onError: (e) => {
            setLoading(false);
            setAlert({ show: true, message: e.message });
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.target;
        if (form.checkValidity() === false || !allValid) {
            event.preventDefault();
        } else {
            const body: ChangePasswordModel = {
                accessType: "PHONE",
                newPassword: password1,
                accessValue: phoneNumber,
                passwordTokenValue: token
            };
            if (loginType === "creater") {
                otpAction.run(body);
            } else {
                const branchBody =
                {
                    "type": "BRANCHPHONE",
                    "accessValue": phoneNumber,
                    "passwordTokenValue": token
                }
                // branchOTPAction.run(branchBody);
            }
        }
    };

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    return (
        <>
            <Col className="tw-login-form" xl={5} xxl={5} xs={12}>
                <div className="tw-logo-title">
                    <Image src="/logo/monpay-logo.png" width={185} height={45} alt={''} />
                    <div className="tw-form-title">
                        <span>{t('create-password')}</span>
                    </div>
                </div>
                <Form
                    className="tw-register-set-password"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                >
                    <Form.Group>
                        <InputGroup hasValidation>
                            <InputGroup.Text
                                className="password"
                                id="inputGroupPrepend"
                            ></InputGroup.Text>
                            <Form.Control
                                type={passwordShown ? 'text' : 'password'}
                                className="tw-input tw-password"
                                placeholder={t('enter-password')}
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                onKeyUp={validatePassword}
                            />
                            <span className="icon-on-off" onClick={togglePasswordVisiblity}>
                                <img src={passwordShown ? "/svg/icon-off.svg" : "/svg/icon-on.svg"} />
                            </span>
                            <Form.Control.Feedback type="invalid">
                                {t('enter-password')}!
                            </Form.Control.Feedback>
                        </InputGroup>
                        <InputGroup hasValidation>
                            <InputGroup.Text
                                className="password"
                                id="inputGroupPrepend"
                            ></InputGroup.Text>
                            <Form.Control
                                type={passwordShown ? 'text' : 'password'}
                                className="tw-input tw-password"
                                placeholder={t('repeat-password')}
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                onKeyUp={validatePassword}
                            />
                            <span className="icon-on-off" onClick={togglePasswordVisiblity}>
                                <img src={passwordShown ? "/svg/icon-off.svg" : "/svg/icon-on.svg"} />
                            </span>
                            <Form.Control.Feedback type="invalid">
                                {t('repeat-password')}!
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <div className="requirement-text">
                        {mustContainData.map((data, i) => (
                            <MustContainItem data={data} key={i} />
                        ))}
                    </div>
                    <Row>
                        <Col>
                            <div className="tw-form-buttons">
                                <div className="tw-top-button">
                                    <Button type="submit" disabled={!allValid}>
                                        {t('save')}
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Col>
            {alerts?.show && (
                <FailNotification
                    show={alerts.show}
                    infos={alerts.message}
                    close={closeNotification} position={undefined}>
                </FailNotification>
            )}
        </>
    );
};

export default ForgotNewPassword;
