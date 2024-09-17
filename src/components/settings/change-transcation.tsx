"use client";
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import FailNotification from '../notification/fail-notif';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import { useLoading } from '@/context/loading';
import OtpInput from '../widget/pinput';


interface PinCodeChangeProps {
    setScreenIndex: (value: number) => void;
}

const PinCodeChange: React.FC<PinCodeChangeProps> = ({ setScreenIndex }) => {
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [show, setShow] = useState<boolean>(false);
    const [forDisabled, setForDisabled] = useState<boolean>(true);
    const router = useRouter();
    const [response, setResponse] = useState<ReponseProps>({ success: false, message: "", info: "" });

    const [otp1, setOtp1] = useState(new Array(4).fill(""));
    const [otp2, setOtp2] = useState(new Array(4).fill(""));
    const [otp3, setOtp3] = useState(new Array(4).fill(""));

    const t = useTranslations('pincode');
    const { setLoading } = useLoading();

    useEffect(() => {
        if (otp1.join("").length === 4 && otp2.join("").length === 4 && otp3.join("").length === 4) {
            setForDisabled(false);
        } else {
            setForDisabled(true);
        }
    }, [otp1, otp2, otp3]);

    const handleSubmit = () => {
        if (otp2.join("") === otp3.join("")) {
            const body: ChangePinCodeModel = {
                pinOld: otp1.join(""),
                pinNew: otp2.join(""),
            };
            balanceAction.run(body);
        } else {
            setAlert({
                show: true,
                message: 'Пин код давталт тохирохгүй байна.',
            });
        }
    };

    const balanceAction = useRequest(authService.changePinCode, {
        manual: true,
        onBefore: () => {
            setLoading(true);
        },
        onSuccess: async (data) => {
            setLoading(false);
            setResponse({ info: data.info, success: true, message: data.result });
            setShow(true);
        },
        onError: (error) => {
            setLoading(false);
            setResponse({ info: error.message, success: false, message: error.message });
            setShow(true);
        },
    });

    const closeFailNotification = () => {
        setAlert({ message: "", show: false });
    };

    const handleModal = () => {
        setShow(false);
        if (response.success) {
            router.push('/app/dashboard');
        }
    };

    return (
        <Container fluid>
            <div className="content">
                <Form
                    noValidate
                    className="email-confirm-code setpincode"
                >

                    <div className="label-title">
                        <h5
                            style={{
                                marginTop: '0',
                            }}
                        >
                            {t('crrnt-pincode')}
                        </h5>
                    </div>
                    <OtpInput otp={otp1} setOtp={setOtp1} type="number" />
                    <>
                        <div className="label-title mt-2">
                            <h5
                                style={{
                                    marginTop: '0',
                                }}
                            >
                                {t('new-pin')}
                            </h5>
                        </div>
                        <OtpInput otp={otp2} setOtp={setOtp2} type="number" />
                        <div className="label-title mt-2">
                            <h5
                                style={{
                                    marginTop: '12px',
                                }}
                            >
                                {t('repeat-new')}
                            </h5>
                        </div>
                        <OtpInput otp={otp3} setOtp={setOtp3} type="number" />
                    </>
                    <div className="settings-buttons mt-10">
                        <div className="buttons-inner">
                            <Button onClick={() =>
                                setScreenIndex(3)
                            }>{t('recover-pin')}</Button>
                            <Button
                                disabled={forDisabled}
                                variant="primary"
                                onClick={handleSubmit}
                            >
                                {t('change')}
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
            {alerts?.show && (
                <FailNotification
                    show={alerts.show}
                    infos={alerts.message}
                    close={closeFailNotification}
                ></FailNotification>
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
                                    <p>Таны пинкод амжилттай солигдлоо</p>
                                ) : (
                                    <p>
                                        <strong>{response.info}</strong>
                                    </p>
                                )}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleModal}>
                            {response.success ? 'Баярлалаа' : 'Хаах'}
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Container>
    );
};

export default PinCodeChange;
