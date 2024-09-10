"use client";
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';

interface TopbarProps {
    name: string;
    logo: string;
}

const Topbar: React.FC<TopbarProps> = ({ name, logo }) => {
    const [notifications, setNotifications] = useState([]);
    const router = useRouter();
    const [displayName, setDisplayName] = useState('');
    const [alert, setAlert] = useState(false);
    const { partner } = useContext(IctContext);
    const t = useTranslations('common');

    return (
        <>
            <div className="topbar-inner mobile">
                <div className="image">
                    <img src={logo} />
                </div>
                <span className="title">{name}</span>
            </div>
            <div className="Topbar">
                <div className="top-left-side">
                    <div className="mobile-logo">
                        <Link href="/#">
                            <img src="/monpay-mobile-logo.svg" />
                        </Link>
                    </div>
                    <div className="topbar-inner">
                        <div className="image ">
                            <img src={logo} />
                        </div>
                        <span className="title">{name}</span>
                    </div>
                </div>
                <div className="top-right-side">
                    <div className="mp-notification">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                                <img
                                    src={
                                        alert
                                            ? '/alert-blue-notif.svg'
                                            : '/topbar-icon-notification.svg'
                                    }
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="mp-notifivation-menu">
                                {/* <div className="mp-medegdel">{t('notif')}</div> */}
                                {partner ? (
                                    notifications &&
                                    notifications.map((notification, i) => {
                                        if (i < 4) {
                                            return (
                                                <Dropdown.Item
                                                    key={i}
                                                    href={
                                                        '/app/dashboard/notification/' +
                                                        notification.notificationId
                                                    }
                                                >
                                                    {notification.isRead ? (
                                                        <>
                                                            <span className="mp-nof-icon"></span>
                                                        </>
                                                    ) : (
                                                        <span className="mp-nof-icon">
                                                            <img src="/new-ind.svg" />
                                                        </span>
                                                    )}
                                                    <div className="mp-notify-data">
                                                        <span className="mp-nof-title">
                                                            {notification.message}
                                                        </span>
                                                        <span className="mp-nof-date">
                                                            {notification.dateUI}
                                                        </span>
                                                    </div>
                                                </Dropdown.Item>
                                            );
                                        }
                                    })
                                ) : (
                                    <></>
                                )}
                                <span className="mp-show-all-nof">
                                    <Link
                                        href={
                                            '/app/dashboard/notification/' +
                                            (notifications ? notifications[0]?.notificationId : '')
                                        }
                                    >
                                        {t('view-all')}
                                    </Link>
                                </span>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="mp-profile-menu">
                        <Dropdown align="end">
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                                <div className="inner d-flex align-items-center">
                                    <div className="info me-2">
                                        <span className="people-phone-number" style={{ fontSize: "16px", color: "#161E34" }}>{partner?.name}</span>
                                    </div>
                                    <div className="avatar position-relative">
                                        <img className="profileImgSmall rounded-circle" src="/topbar-avatar-img.png" alt="Profile" />
                                        <div className="user-icon-verify position-absolute">
                                            <img src="/user-icon-verify.svg" alt="User Verified" />
                                        </div>
                                    </div>
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="information">
                                <li className="text-muted mb-2">Тохиргоо</li>
                                <Dropdown.Item className="d-flex align-items-center mb-8 mr-8">
                                    <img src="/icon-user.svg" alt="User Icon" />
                                    <span className='ml-3' style={{ color: "#5B698E" }}>Мерчант мэдээлэл</span>
                                </Dropdown.Item>
                                <Dropdown.Divider style={{ color: "#5B698E" }} />
                                <Dropdown.Item className="d-flex align-items-center p-0 mt-3"
                                    href="/app/settings">
                                    <Button variant="primary" className="w-100" style={{ borderRadius: "8px" }}>
                                        <Row className="align-items-center g-0">
                                            <Col xs="auto" className='ml-3'>
                                                <img src="/svg/icon-password.svg" alt="User Icon" />
                                            </Col>
                                            <Col className='mr-3'>Нууц үг солих</Col>
                                        </Row>
                                    </Button>
                                </Dropdown.Item >
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Topbar;
