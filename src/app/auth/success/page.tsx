"use client";
import { Button, Row, Col, Container } from 'react-bootstrap';
import React from 'react';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import LanguageChange from '@/components/language/language-change';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PasswordSuccess = () => {
    const router = useRouter();
    const t = useTranslations('forgot-password');

    React.useEffect(() => {
        // const phoneNumber = jsCookie.get('phone');
        // if (!!!phoneNumber) return router.push('/forgot-password');
    }, []);

    const handleRoute = () => {
        jsCookie.remove('phone');
        router.push('/auth/login');
    };

    return (
        <Container className="register-confirm" fluid>
            <Row className="tw-form">
                <Col
                    className="tw-image-section d-none d-xl-flex"
                    style={{
                        backgroundImage: `url("/login/Bg.png")`,
                    }}
                    xl={7}
                    xxl={7}
                >
                    <div className="big-image">
                        <div className="image-stack">
                            <Image src="/logo/monpay-logo.png" width={185} height={45} alt={''} />
                        </div>
                    </div>
                </Col>
                <Col className="tw-login-form register-success" xl={5} xxl={5} xs={12}>
                    <LanguageChange />
                    <div className="content">
                        <div className="tw-logo-title">
                            <Image src="/logo/monpay-logo.png" width={185} height={45} alt={''} />
                        </div>
                        <div className="icon-out">
                            <div className="icon-inner">
                                <img src="/svg/register-icon-success.svg" />
                            </div>
                        </div>
                        <div className="title-desc">
                            <span className="top-title">{t('success')}!</span>
                            <div className="message">
                                <span>{t('desc')}</span>
                            </div>
                        </div>
                    </div>
                    <Row>
                        <Col>
                            <div className="tw-form-buttons">
                                <div className="tw-top-button">
                                    <Button onClick={handleRoute}>{t('login')}</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default PasswordSuccess;
