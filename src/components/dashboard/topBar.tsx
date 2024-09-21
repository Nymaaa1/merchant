"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import Image from 'next/image';

interface TopbarProps {
    name: string;
    logo: string;
}

const Topbar: React.FC<TopbarProps> = ({ name, logo }) => {
    const { partner } = useContext(IctContext);
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
                            <Image src="/logo/monpay-logo.png" width={105} height={45} alt={''} />
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
                                <Dropdown.Item className="d-flex align-items-center mr-8" href='/app/settings'>
                                    <img src="/icon-user.svg" alt="User Icon" />
                                    <span className='ml-3' style={{ color: "#5B698E" }}>Мерчант мэдээлэл</span>
                                </Dropdown.Item>
                                <Dropdown.Divider style={{ color: "#5B698E" }} />
                                <Dropdown.Item className="d-flex align-items-center"
                                    href="/app/settings">
                                    <img src="/svg/app-icon-password.svg" alt="User Icon" />
                                    <span className='ml-3' style={{ color: "#5B698E" }}>Нууц үг солих</span>
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
