"use client"
import React, { useState, useContext } from 'react';
import {
    Col,
    Row,
    Form,
} from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';
import ProfileChangePass from '@/components/settings/change-password';

const ProfileMain = () => {
    const sidebar = useTranslations('profile-sidebar');

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
                                    <div
                                        className={
                                            'active'
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
                                            <h4>Нэвтрэх нууц үг солих</h4>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Form noValidate>
                                <ProfileChangePass />
                            </Form>
                        </div>
                    </Col>
                </Row >
            </div >
        </Row >
    );
};
export default ProfileMain;
