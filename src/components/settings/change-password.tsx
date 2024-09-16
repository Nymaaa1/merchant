"use client"
import React, { useContext, useState } from 'react';
import {
    Container,
    Row,
    Form,
    Button,
    InputGroup,
    Modal,
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import FailNotification from '../notification/fail-notif';
import Notification from '../notification/notification';
import { useTranslations } from 'next-intl';
import MustContainItem from '@/app/auth/new/components/must-contain-tem';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import IctContext from '@/context/ict-context';
import authBranchService from '@/service/branch';

type CheckValidation = [string, boolean][];

const ProfileChangePass = () => {
    const t = useTranslations('profile');
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [notification, setNotification] = useState<Alert>({ show: false, message: "" });
    const [oldPassword, setOldPassword] = useState<string>("");
    const [passwordShown, setPasswordShown] = useState(false);
    const { userRole } = useContext(IctContext);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const [showModal, setShowModal] = useState<boolean>(false);
    const router = useRouter();

    const [password, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [response, setResponse] = useState<DefaultResponse>({ info: "", code: 1, result: "" });

    const [containsUL, setContainsUL] = useState<boolean>(false); // Том үсэг оруулах
    const [containsLL, setContainsLL] = useState<boolean>(false); // Жижиг үсэг оруулах
    const [containsN, setContainsN] = useState<boolean>(false); // Тоон тэмдэгт оруулах
    const [contains8C, setContains8C] = useState<boolean>(false); // Хамгийн багадаа 8 тэмдэгт оруулах
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false); // passwords таарах
    const [allValid, setAllValid] = useState<boolean>(false);

    const passwordSubmit = () => {
        if (!allValid) {
        } else {
            if (password === password2) {
                if (userRole === "partner") {
                    balanceAction.run(password, oldPassword);
                } else if (userRole === "branch") {
                    changePasswordBranch.run({ "credentialNew": password, "credentialOld": oldPassword });
                }
            } else {
                setAlert({
                    show: true,
                    message: 'passwoard not defined',
                });
            }
        }
    };

    const balanceAction = useRequest(authService.profileChangePassword, {
        manual: true,
        onSuccess: async (data) => {
            setResponse({ info: data.info, code: data.code, result: data.result });
            setShowModal(true);
            setPassword2('');
            setPassword1('');
        },
        onError: (error) => {
            setShowModal(true);
            setResponse({
                info: error.name,
                result: error.message,
                code: 1
            });
        }
    });

    const changePasswordBranch = useRequest(authBranchService.changePasswordSettingsBranch, {
        manual: true,
        onSuccess: async (data) => {
            setResponse({ info: data.info, code: data.code, result: data.result });
            setShowModal(true);
            setPassword2('');
            setPassword1('');
        },
        onError: (error: any) => {
            setShowModal(true);
            setResponse({
                info: error.data.info,
                result: error.message,
                code: 1
            });
        }
    });

    const handleModal = () => {
        setShowModal(false);
        if (response.code === 0) {
            if (userRole === "partner") {
                router.push('/app/dashboard');
            } else if (userRole === "branch") {
                router.push('/branch/dashboard');
            }
        }
    };

    const closeNotification = () => {
        setNotification({ message: "", show: false });
    };
    const closeFailNotification = () => {
        setAlert({ message: "", show: false });
    };

    const validatePassword = () => {
        let containsULTemp = false;
        let containsLLTemp = false;
        let containsNTemp = false;
        let contains8CTemp = false;
        let passwordMatchTemp = false;
        // has uppercase letter
        if (password.toLowerCase() != password) {
            containsULTemp = true;
            setContainsUL(true);
        } else setContainsUL(false);

        // has lowercase letter
        if (password.toUpperCase() != password) {
            containsLLTemp = true;
            setContainsLL(true);
        } else setContainsLL(false);

        // has number
        if (/\d/.test(password)) {
            containsNTemp = true;
            setContainsN(true);
        } else setContainsN(false);

        // has 8 characters
        if (password.length >= 8) {
            contains8CTemp = true;
            setContains8C(true);
        } else setContains8C(false);

        // passwords match
        if (password !== '' && password === password2) {
            passwordMatchTemp = true;
            setPasswordMatch(true);
        } else setPasswordMatch(false);

        // all validations passed
        if (
            containsULTemp &&
            containsLLTemp &&
            containsNTemp &&
            contains8CTemp &&
            passwordMatchTemp &&
            oldPassword.length > 0
        )
            setAllValid(true);
        else setAllValid(false);
    };

    const mustContainData: CheckValidation = [
        ['Том үсэг оруулах', containsUL],
        ['Жижиг үсэг оруулах', containsLL],
        ['Тоон тэмдэгт оруулах', containsN],
        ['Хамгийн багадаа 8 тэмдэгт оруулах', contains8C],
    ];

    return (
        <Container fluid>
            <Row>
                <div className="content">
                    <div
                        className="tw-register-set-password profile-set-password"
                    // noValidate
                    // validated={validated}
                    // on={passwordSubmit}
                    >
                        <Form.Group>
                            <div className="label-title">
                                <h5>Одоогийн нууц үг</h5>
                            </div>
                            <InputGroup hasValidation className='mb-10'>
                                <Form.Control
                                    type={passwordShown ? 'text' : 'password'}
                                    className="tw-input tw-password"
                                    placeholder="Одоогийн нууц үг оруулах"
                                    value={oldPassword}
                                    name="oldPassword"
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    onKeyUp={validatePassword}
                                />
                                <span
                                    className="icon-on-off"
                                    onClick={togglePasswordVisiblity}
                                >
                                    <img src="/icon-off.svg" />
                                </span>
                                <Form.Control.Feedback type="invalid">
                                    {t('enter-pass')}!
                                </Form.Control.Feedback>
                            </InputGroup>
                            <div className="custom-divider" />
                            <div className="label-title mt-10">
                                <h5>{t('new-pass')}</h5>
                            </div>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type={passwordShown ? 'text' : 'password'}
                                    className="tw-input tw-password"
                                    placeholder="Нууц үгээ оруулах"
                                    value={password}
                                    name="password"
                                    onChange={(e) => setPassword1(e.target.value)}
                                    onKeyUp={validatePassword}
                                />
                                <span
                                    className="icon-on-off"
                                    onClick={togglePasswordVisiblity}
                                >
                                    <img src="/icon-off.svg" />
                                </span>
                                <Form.Control.Feedback type="invalid">
                                    {t('enter-pass')}!
                                </Form.Control.Feedback>
                            </InputGroup>
                            <div className="label-title">
                                <h5
                                    style={{
                                        marginTop: '12px',
                                    }}
                                >
                                    {t('repeat-password')}
                                </h5>
                            </div>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type={passwordShown ? 'text' : 'password'}
                                    className="tw-input tw-password"
                                    placeholder="Нууц үгээ давтан оруулах"
                                    value={password2}
                                    name="password2"
                                    onChange={(e) => setPassword2(e.target.value)}
                                    onKeyUp={validatePassword}
                                />
                                <span
                                    className="icon-on-off"
                                    onClick={togglePasswordVisiblity}
                                >
                                    <img src="/icon-off.svg" />
                                </span>
                                <Form.Control.Feedback type="invalid">
                                    {t('enter-repeat-pass')}!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <div className="requirement-text">
                            {mustContainData.map((data, i) => (
                                <MustContainItem data={data} key={i} />
                            ))}
                        </div>
                        <div
                            className="tw-single-button"
                            style={{ padding: '0' }}
                        >
                            <Button onClick={() => passwordSubmit()} disabled={!allValid}>
                                {t('save-password')}
                            </Button>
                        </div>
                    </div>
                </div>
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
                    close={closeFailNotification}
                ></FailNotification>
            )}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                dialogClassName={response.code === 0 ? 'success-modal' : 'fail-modal'}
                centered
            >
                <div className="content-inner">
                    <Modal.Header>
                        <div className="image">
                            <div className="image-inner">
                                <img
                                    src={
                                        response.code === 0
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
                                <h5>{response.code === 0 ? 'Амжилттай' : 'Амжилтгүй'}</h5>
                            </div>
                            <div className="desc">
                                {response.code === 0 ? (
                                    <p>{"Таны нууц үг амжилттай солигдлоо"}</p>
                                ) : (
                                    <p>
                                        <strong>{response.info ?? "Алдаа"}</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleModal}>
                            {response.code === 0 ? 'Баярлалаа' : 'Хаах'}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Container>
    );
};
export default ProfileChangePass;
