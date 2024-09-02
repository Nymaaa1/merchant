"use client"
import React from 'react';
import Topbar from '@/components/dashboard/topBar';
import SidebarControl from '@/components/dashboard/sideBar';
import Control from '@/components/dashboard/control';
import { Container, Col, Row } from 'react-bootstrap';
import { useTranslations } from 'next-intl';
import { SSRProvider } from '@react-aria/ssr';

const Page = () => {
    const t = useTranslations('dashboard');
    return (
        <SSRProvider>
        <Container fluid>
            <Row>
                <Col className="g-0">
                    <SidebarControl />
                </Col>
                <Col lg={10} className="dashboard-right-side">
                    <Row style={{ marginBottom: '32px' }}>
                        <Col
                            style={{
                                borderBottom: '1px solid #E8EDF5',
                                padding: '0',
                            }}
                        >
                            <Topbar
                                name={t('dashboard')}
                                logo="/icon-category-dashboard.svg"
                            />
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: '#ffffff' }}>
                        <Control />
                    </Row>
                </Col>
            </Row>
        </Container>
        </SSRProvider>
    );
};

export default Page;
