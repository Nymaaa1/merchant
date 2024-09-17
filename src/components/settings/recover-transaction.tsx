"use client"
import React, { useContext, useState } from 'react';
import {
    Container,
    Row,
    Form,
    Button,
    InputGroup,
    Modal,
    Col,
} from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import FailNotification from '../notification/fail-notif';
import Notification from '../notification/notification';
import { useTranslations } from 'next-intl';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import IctContext from '@/context/ict-context';
import OtpInput from '../widget/pinput';

const ProfileRecoverTransactionPass = () => {
    const { partner } = useContext(IctContext);
    const [index, setIndex] = useState<number>(0);
    const [alert, setAlert] = useState<Alert>({ show: false, message: "" });
    const [notification, setNotification] = useState<Alert>({ show: false, message: "" });
    const [showModal, setShowModal] = useState<boolean>(false);
    const [otp1, setOtp1] = useState(new Array(4).fill(""));
    const router = useRouter();

    const [password, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [response, setResponse] = useState<DefaultResponse>({ info: "", code: 1, result: "" });
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [allValid, setAllValid] = useState<boolean>(false);

    const converHidePhone = (val: string) => {
        return val.length > 4
            ? val.substring(0, 2) + '***' + val.substring(5)
            : val;
    }

    const passwordSubmit = () => {
        setIndex(1);
        if (!allValid) {
        } else {
            if (password === password2) {
                // balanceAction.run(password, oldPassword);
            } else {
                setAlert({
                    show: true,
                    message: 'passwoard not defined',
                });
            }
        }
    };

    const newOinCode = () => {
        setIndex(2);
    };

    // const balanceAction = useRequest(authService.ProfileRecoverTransactionPassword, {
    //     manual: true,
    //     onSuccess: async (data) => {
    //         setResponse({ info: data.info, code: data.code, result: data.result });
    //         setShowModal(true);
    //         setPassword2('');
    //         setPassword1('');
    //     },
    //     onError: (error) => {
    //         setShowModal(true);
    //         setResponse({
    //             info: error.name,
    //             result: error.message,
    //             code: 1
    //         });
    //     }
    // });

    const handleModal = () => {
        setShowModal(false);
        if (response.code === 0) {
            router.push('/app/dashboard');
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
        // if (password.toLowerCase() != password) {
        //     containsULTemp = true;
        //     setContainsUL(true);
        // } else setContainsUL(false);

        // // has lowercase letter
        // if (password.toUpperCase() != password) {
        //     containsLLTemp = true;
        //     setContainsLL(true);
        // } else setContainsLL(false);

        // // has number
        // if (/\d/.test(password)) {
        //     containsNTemp = true;
        //     setContainsN(true);
        // } else setContainsN(false);

        // // has 8 characters
        // if (password.length >= 8) {
        //     contains8CTemp = true;
        //     setContains8C(true);
        // } else setContains8C(false);

        // // passwords match
        // if (password !== '' && password === password2) {
        //     passwordMatchTemp = true;
        //     setPasswordMatch(true);
        // } else setPasswordMatch(false);

        // // all validations passed
        // if (
        //     containsULTemp &&
        //     containsLLTemp &&
        //     containsNTemp &&
        //     contains8CTemp &&
        //     passwordMatchTemp &&
        //     oldPassword.length > 0
        // )
        // setAllValid(true);
        // else setAllValid(false);
    };

    return (
        <Container fluid>
            {index === 0 ?
                <div className="content">
                    <div
                        className="tw-single-button"
                        style={{ paddingBottom: '10px' }}
                    >
                        <Button onClick={() => passwordSubmit()}>
                            Нууц үг сэргээх
                        </Button>
                    </div>
                </div>
                : index == 1 ?
                    <div className="content">
                        <div className="email-confirm-code setpincode">
                            <div className="label-title">
                                <h5
                                    style={{
                                        marginTop: '0',
                                        marginBottom: '20px',
                                    }}
                                >
                                    Бид таны {converHidePhone(partner?.phone)} дугаарт нууц үг сэргээх кодыг илгээсэн. Баталгаажуулах кодоо оруулна уу
                                </h5>
                            </div>
                            <OtpInput otp={otp1} setOtp={setOtp1} type="number" />
                            <div
                                className="tw-single-button"
                                style={{ paddingBottom: '10px' }}
                            >
                                <Button onClick={() => newOinCode()}>
                                    Баталгаажуулах
                                </Button>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }
            {
                notification?.show && (
                    <Notification
                        show={notification.show}
                        infos={notification.message}
                        close={closeNotification}
                    />
                )
            }
            {
                alert?.show && (
                    <FailNotification
                        show={alert.show}
                        infos={alert.message}
                        close={closeFailNotification}
                    ></FailNotification>
                )
            }
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
                                        <strong>Алдаа</strong>
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
        </Container >
    );
};
export default ProfileRecoverTransactionPass;
