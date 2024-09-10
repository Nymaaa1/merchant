"use client"
import React, { useState, useEffect, useContext } from 'react';
import {
    Col,
    Container,
    Row,
    Form,
    Button,
    InputGroup,
    Modal,
} from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useRouter } from 'next/navigation';
// import SidebarUserProfile from 'components/sidebar/profile';
import FormData from 'form-data';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import FailNotification from '@/components/notification/fail-notif';
import Notification from '@/components/notification/notification';
import Link from 'next/link';
import ProfileChangePass from '@/components/settings/change-password';

const ProfileMain = () => {
    const t = useTranslations('profile');
    const sidebar = useTranslations('profile-sidebar');
    const [show, setShow] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);
    const [showFiled, setShowFiled] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const router = useRouter();

    const [infos, setInfos] = useState<string>('');
    const [alert, setAlert] = useState<Alert>({ show: false, message: "" });
    const [notification, setNotification] = useState<Alert>({ show: false, message: "" });
    const [response, setResponse] = useState({});

    const [user, setUser] = useState();
    const { partner } = useContext(IctContext);
    useEffect(() => {
        // setUser(JSON.parse(localStorage.getItem('user')));
    }, []);

    const [img, setSelectedImage] = useState('');

    const setPhoto = (event) => {
        // if (event.target.files[0].size <= 2000000) {
        //     setSelectedImage(event.target.files[0]);
        //     setShowFiled(false);
        //     setDisabled(true);
        // } else {
        //     setInfos('2МВ-с бага хэмжээтэй зураг сонгоно уу!');
        //     setShowFiled(true);
        //     setShow(false);
        // }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        // if (form.checkValidity() === false) {
        // } else {
        //     const fData = new FormData();
        //     fData.append('firstname', form.firstname.value);
        //     fData.append('lastname', form.lastname.value);
        //     fData.append('image', img);

        //     axios.post(`/api/profile/name`, fData).then(
        //         (resp) => {
        //             user.image = resp?.data?.result?.image;
        //             user.firstName = resp?.data?.result?.firstName;
        //             user.lastName = resp?.data?.result?.lastName;
        //             setResponse({ ...resp.data.info, success: true });
        //             setShow(true);
        //             setLogin(user);
        //             setDisabled(false);
        //         },
        //         (error) => {
        //             if (error.response.data.info) {
        //                 setShow(true);
        //                 setResponse({
        //                     ...error.response?.data,
        //                     success: false,
        //                 });
        //             }

        //             event.stopPropagation();
        //         }
        //     );
        // }
    };
    const closeNotification = () => {
        setAlert({ message: "", show: false });
    };
    const handleTrue = () => {
        setDisabled(true);
    };
    const handleModal = () => {
        setShow(false);
        if (response.success) {
            // router.push('/app/dashboard');
        }

        // router.push('/app/dashboard/account/transfer?type=candy');
    };

    return (
        <Row className="wrapper-row">
            <div
                style={{
                    maxWidth: '768px',
                    margin: 'auto',
                    padding: '0',
                }}
            >
                <Row>
                    <Col xs={12} lg={5}>
                        <div className="sidebar-of-content">
                            <div className="sidebar-content-inner">
                                <div className="sidebar-title">
                                    <h6>{sidebar('settings')}</h6>
                                </div>
                                <ul className="sidebarListAccount">
                                    <div className="top-list">

                                        <div onClick={() => setIndex(0)}
                                            className={
                                                index === 0 ? 'active' : ''
                                            }
                                        >
                                            <li className="li-item">
                                                <div className="item-inner">
                                                    <div className="icon user">
                                                        <img src="/icon-user.svg" />
                                                    </div>
                                                    <span>{t('personal-info')}</span>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setIndex(1)}
                                        className={
                                            index === 1 ? 'active' : ''
                                        }
                                    >
                                        <div className="top-border">
                                            <li className="li-item">
                                                <div className="item-inner">
                                                    <div className="icon password">
                                                        <img src="/icon-password.svg" />
                                                    </div>
                                                    <span>{sidebar('phone-number')}</span>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                    <div
                                        onClick={() => setIndex(2)}
                                        className={
                                            index === 2 ? 'active' : ''
                                        }
                                    >
                                        <li className="li-item">
                                            <div className="item-inner">
                                                <div className="icon more">
                                                    <img src="/icon-more.svg" />
                                                </div>
                                                <span>{sidebar('email')}</span>
                                            </div>
                                        </li>
                                    </div>
                                    <div
                                        onClick={() => setIndex(3)}
                                        className={
                                            index === 3 ? 'active' : ''
                                        }
                                    >
                                        <li className="li-item">
                                            <div className="item-inner">
                                                <div className="icon mobile">
                                                    <img src="/icon-mobile-profile.svg" />
                                                </div>
                                                <span>{sidebar('change-pass')}</span>
                                            </div>
                                        </li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={7} className="tw-user-col">
                        <div className="tw-user-container">
                            <Row>
                                <Col>
                                    <div className="tw-user">
                                        <div className="tw-user-top">
                                            <h4>{index === 0 ? t('personal-info') : index === 1 ? "Нэвтрэх нууц үг солих" : index === 2 ? "Нэвтрэх нууц үг солих" : "Гүйлгээний нууц үг сэргээх"}</h4>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Form noValidate onSubmit={handleSubmit}>
                                {index === 0 ?
                                    <Row>
                                        <Col>
                                            <div className="tw-user-bottom">
                                                <div className="tw-user-form">
                                                    <div className="person-title mt-10">
                                                        <h5>Мерчант нэр</h5>
                                                    </div>
                                                    <div className="input-item">
                                                        <InputGroup >
                                                            <Form.Control
                                                                disabled={true}
                                                                style={{ backgroundColor: "#ffff", height: "48px", borderRadius: "8px" }}
                                                                type="text"
                                                                name="lastname"
                                                                placeholder={partner?.username}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="person-title">
                                                        <h5
                                                            style={{
                                                                marginTop: '12px',
                                                            }}
                                                        >
                                                            Утасны дугаар
                                                        </h5>
                                                    </div>
                                                    <div className="input-item">
                                                        <InputGroup >
                                                            <Form.Control
                                                                disabled={true}
                                                                style={{ backgroundColor: "#ffff", height: "48px", borderRadius: "8px" }}
                                                                type="text"
                                                                name="lastname"
                                                                placeholder={partner?.phone}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className="person-title">
                                                        <h5
                                                            style={{
                                                                marginTop: '12px',
                                                            }}
                                                        >
                                                            И-Мэйл хаяг
                                                        </h5>
                                                    </div>
                                                    <div className="input-item">
                                                        <InputGroup >
                                                            <Form.Control
                                                                disabled={true}
                                                                style={{ backgroundColor: "#ffff", height: "48px", borderRadius: "8px" }}
                                                                type="text"
                                                                name="lastname"
                                                                placeholder={partner?.email}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row> : <ProfileChangePass />
                                }
                            </Form>
                        </div>
                    </Col>
                </Row >
            </div >
        </Row >
    );
};
export default ProfileMain;
