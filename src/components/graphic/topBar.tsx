"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';

interface BranchTopbarProps {
    name: string;
    logo: string;
}

const BranchTopbar: React.FC<BranchTopbarProps> = ({ name, logo }) => {
    const { branch } = useContext(IctContext);
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
                    <div className="mp-profile-menu">
                        <Dropdown align="end">
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                                <div className="inner d-flex align-items-center">
                                    <div className="info me-2">
                                        <span className="people-phone-number" style={{ fontSize: "16px", color: "#161E34" }}>{branch?.name}</span>
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
                                <Dropdown.Item className="d-flex align-items-center" style={{ padding: "0px", margin: "0px" }}
                                    href="/branch/settings">
                                    <Button variant="primary" style={{ borderRadius: "8px", width: "150px" }}>
                                        <Row className="align-items-center g-0">
                                            <Col xs="auto" className='ml-3'>
                                                <img src="/svg/icon-password.svg" alt="User Icon" />
                                            </Col>
                                            <Col className='mr-3 ml-3'>Нууц үг солих</Col>
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

export default BranchTopbar;
