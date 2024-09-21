"use client"
import React, { useContext } from 'react';
import Link from 'next/link';
import IctContext from '@/context/ict-context';
import { Navbar } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const SidebarControl = () => {
    const t = useTranslations('sidebar');
    const { setLogout } = useContext(IctContext);
    const pathName = usePathname();

    return (
        <Navbar expand="lg" className="dashboard-navbar">
            <Navbar.Toggle className="dashboard-toggle-btn" />
            <Navbar.Offcanvas className="dashboard-offcanvas">
                <div className="sidebar-control">
                    <div className="sidebar-control-inner">
                        <div>
                            <div className="sidebar-logo">
                                <Link href="/app/dashboard">
                                    <img src="/monpay-white-logo.svg" />
                                </Link>
                            </div>
                            <div className="menus">
                                <div className="sidebar-top-menu">
                                    <ul>
                                        <Link href="/app/dashboard">
                                            <div
                                                className={
                                                    pathName === '/app/dashboard' ? 'active' : ''
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
                                        <Link href="/app/act">
                                            <div
                                                className={
                                                    pathName === '/app/act'
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                <div className="li">
                                                    <div className="image">
                                                        <img src="/dashboard/help.svg" />
                                                    </div>
                                                    <div className="image-white">
                                                        <img src="/svg/act-active.svg" />
                                                    </div>
                                                    <span className="title">{t('title.account')}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href="/app/service">
                                            <div
                                                className={
                                                    pathName === '/app/service'
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
                                        <Link href="/app/graphic">
                                            <div
                                                className={
                                                    pathName === '/app/graphic'
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
                                    <Link href="/app/help">
                                        <div
                                            className={
                                                pathName === '/app/help'
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
                                    <Link href="/app/faq">
                                        <div
                                            className={
                                                pathName === '/app/faq'
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
    );
};

export default SidebarControl;
