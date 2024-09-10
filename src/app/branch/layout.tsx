"use client"
import { Col, Container, Row, SSRProvider } from "react-bootstrap";
import React, { useContext } from 'react';
import Link from 'next/link';
import IctContext from '@/context/ict-context';
import { Navbar } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import BranchTopbar from "@/components/branch/topBar";

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({
    children,
}: Readonly<RootLayoutProps>) {
    const t = useTranslations('sidebar');
    const { setLogout, branch } = useContext(IctContext);
    const pathName = usePathname();
    return (
        <SSRProvider>
            <Container fluid>
                <Row>
                    <Col className="g-0">
                        <Navbar expand="lg" className="dashboard-navbar">
                            <Navbar.Toggle className="dashboard-toggle-btn" />
                            <Navbar.Offcanvas className="dashboard-offcanvas">
                                <div className="sidebar-control">
                                    <div className="sidebar-control-inner">
                                        <div>
                                            <div className="sidebar-logo">
                                                <Link href="/branch/dashboard">
                                                    <img src="/monpay-white-logo.svg" />
                                                </Link>
                                            </div>
                                            <div className="menus">
                                                <div className="sidebar-top-menu">
                                                    <ul>
                                                        <Link href="/branch/dashboard">
                                                            <div
                                                                className={
                                                                    pathName === '/branch/dashboard' ? 'active' : ''
                                                                }
                                                            >
                                                                <div className="li">
                                                                    <div className="image">
                                                                        <img src="/sidebar-icon-category.svg" />
                                                                    </div>
                                                                    <div className="image-white">
                                                                        <img src="/sidebar-icon-category-white.svg" />
                                                                    </div>
                                                                    <span className="title">{t('title.dashboard')}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <Link href="/branch/service">
                                                            <div
                                                                className={
                                                                    pathName === '/branch/dashboard/s'
                                                                        ? 'active'
                                                                        : ''
                                                                }
                                                            >
                                                                <div className="li">
                                                                    <div className="image">
                                                                        <img src="/dashboard/help.svg" />
                                                                    </div>
                                                                    <div className="image-white">
                                                                        <img src="/dashboard/help.svg" />
                                                                    </div>
                                                                    <span className="title">{t('title.account')}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <Link href="/branch/service">
                                                            <div
                                                                className={
                                                                    pathName === '/branch/service'
                                                                        ? 'active'
                                                                        : ''
                                                                }
                                                            >
                                                                <div className="li">
                                                                    <div className="image">
                                                                        <img src="/sidebar-icon-wallet.svg" />
                                                                    </div>
                                                                    <div className="image-white">
                                                                        <img src="/sidebar-icon-wallet-white.svg" />
                                                                    </div>
                                                                    <span className="title">{t('title.add-service')}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <Link href="/branch/graphic">
                                                            <div
                                                                className={
                                                                    pathName === '/branch/graphic'
                                                                        ? 'active'
                                                                        : ''
                                                                }
                                                            >
                                                                <div className="li">
                                                                    <div className="image">
                                                                        <img src="/dashboard/act.svg" />
                                                                    </div>
                                                                    <div className="image-white">
                                                                        <img src="/svg/demo-active.svg" />
                                                                    </div>
                                                                    <span className="title">{t('title.payment')}</span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="sidebar-bottom-menu">
                                                <ul>
                                                    <Link href="/branch/help">
                                                        <div
                                                            className={
                                                                pathName === '/branch/help'
                                                                    ? 'active'
                                                                    : ''
                                                            }
                                                        >
                                                            <div className="li">
                                                                <div className="image">
                                                                    <img src="/dashboard/dashboard.svg" />
                                                                </div>
                                                                <div className="image-white">
                                                                    <img src="/svg/help-active.svg" />
                                                                </div>
                                                                <span className="title">{t('title.help')}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link href="/branch/faq">
                                                        <div
                                                            className={
                                                                pathName === '/branch/faq'
                                                                    ? 'active'
                                                                    : ''
                                                            }
                                                        >
                                                            <div className="li">
                                                                <div className="image">
                                                                    <img src="/sidebar-icon-setting.svg" />
                                                                </div>
                                                                <div className="image-white">
                                                                    <img src="/sidebar-icon-setting-white.svg" />
                                                                </div>
                                                                <span className="title">{t('title.settings')}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </ul>
                                            </div>
                                            <div className="system-out">
                                                <div className="content" onClick={setLogout}>
                                                    <div className="content-inner">
                                                        <div className="image">
                                                            <img src="/icon-logout.svg" />
                                                        </div>
                                                        <div className="title">
                                                            <span> {t('title.log-out')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Navbar.Offcanvas>
                        </Navbar>
                    </Col>
                    <Col lg={10} className="dashboard-right-side">
                        <Row style={{ marginBottom: '32px' }}>
                            <Col
                                style={{
                                    borderBottom: '1px solid #E8EDF5',
                                    padding: '0',
                                }}
                            >
                                <BranchTopbar name={pathName === "/branch/dashboard" ? branch.name : pathName === "/branch/faq" ? "FAQ" : pathName === "/branch/settings" ? "Хэрэглэгчийн тохиргоо" : pathName === "/app/service" ? "Нэмэлт үйлчилгээ" : pathName === "/branch/help" ? "Тусламж" : pathName === "/branch/graphic" ? "Дашбоард, Демограф" : ""}
                                    logo={pathName === "/branch/settings" || pathName === "/branch/help" ? "/svg/icon-setting.svg" : pathName === "/branch/faq" ? "/svg/icon-question.svg" : "/svg/icon-wallet.svg"} />
                            </Col>
                        </Row>
                        <Row style={{ backgroundColor: '#ffffff' }}>
                            {children}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </SSRProvider>
    );
}

