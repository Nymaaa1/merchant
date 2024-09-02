"use client"
import SidebarControl from '@/components/dashboard/sideBar';
import React from 'react';
import { Col, Container, Row, Accordion, SSRProvider } from 'react-bootstrap';
import Topbar from '@/components/dashboard/topBar';
import { useTranslations } from 'next-intl';

const Question = () => {
    const t = useTranslations('question');

    return (
        <SSRProvider>
            <Container fluid>
                <Row>
                    <Col className="g-0">
                        <SidebarControl />
                    </Col>
                    <Col lg={10} className="dashboard-right-side">
                        <Row>
                            <Col style={{ borderBottom: '1px solid #E8EDF5' }} className="p-0">
                                <Topbar name={t('help')} logo="/icon-info-topbar.svg" />
                            </Col>
                        </Row>
                        <Row className="wrapper-row app-contract">
                            <div
                                style={{
                                    maxWidth: '1032px',
                                    margin: 'auto',
                                    padding: '0',
                                }}
                            >
                                <Row>
                                    <Col xs={12} lg={3}>
                                        {/* <SidebarContract /> */}
                                    </Col>
                                    <Col xs={12} lg={9}>
                                        <Row className="tw-question-second-row">
                                            <div className="question-bottom">
                                                <div className="question-title">
                                                    <h4>{t('faq')}</h4>
                                                </div>
                                                <div className="tw-question-accordion">
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>
                                                                {t('asks.what')}
                                                            </Accordion.Header>
                                                            <Accordion.Body>{t('asks.a1')}</Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="1">
                                                            <Accordion.Header>{t('asks.q1')}</Accordion.Header>
                                                            <Accordion.Body>{t('asks.a2')}</Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="2">
                                                            <Accordion.Header>{t('asks.q2')}</Accordion.Header>
                                                            <Accordion.Body>{t('asks.a3')}</Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="3">
                                                            <Accordion.Header>{t('asks.q3')}</Accordion.Header>
                                                            <Accordion.Body>{t('asks.a4')}</Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="4">
                                                            <Accordion.Header>{t('asks.q4')}</Accordion.Header>
                                                            <Accordion.Body>{t('asks.a5')}</Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="5">
                                                            <Accordion.Header>{t('asks.q5')}</Accordion.Header>
                                                            <Accordion.Body>{t('asks.a6')}</Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="6">
                                                            <Accordion.Header>{t('asks.q6')}</Accordion.Header>
                                                            <Accordion.Body>{t('asks.a7')}</Accordion.Body>
                                                        </Accordion.Item>
                                                        <Accordion.Item eventKey="7">
                                                            <Accordion.Header>{t('asks.q7')}</Accordion.Header>
                                                            <Accordion.Body>{t('asks.a8')}</Accordion.Body>
                                                        </Accordion.Item>
                                                    </Accordion>
                                                </div>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </SSRProvider>
    );
};
export default Question;
