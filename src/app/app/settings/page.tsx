"use client"
import React, { useState, useContext } from 'react';
import {
    Col,
    Row,
    Form,
    InputGroup,
} from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';
import ProfileChangePass from '@/components/settings/change-password';
import ProfileRecoverTransactionPass from '@/components/settings/recover-transaction';
import PinCodeChange from '@/components/settings/change-transcation';

const ProfileMain = () => {
    const t = useTranslations('profile');
    const sidebar = useTranslations('profile-sidebar');
    const [index, setIndex] = useState<number>(0);
    const { partner } = useContext(IctContext);

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
                                            <h4>{index === 0 ? t('personal-info') : index === 1 ? "Нэвтрэх нууц үг солих" : index === 2 ? "Гүйлгээний нууц үг солих" : "Гүйлгээний нууц үг сэргээх"}</h4>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Form noValidate>
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
                                                                placeholder={partner?.verifiedPhone}
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
                                    </Row> : index == 1 ? <ProfileChangePass /> : index === 2 ? <PinCodeChange setScreenIndex={setIndex} />
                                        : index === 3 ?
                                            <ProfileRecoverTransactionPass />
                                            : <></>
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
