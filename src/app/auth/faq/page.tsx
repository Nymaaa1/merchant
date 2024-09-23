"use client"
import React from 'react';
import { Col, Row, Accordion, Container } from 'react-bootstrap';
import { useTranslations } from 'next-intl';
import TopbarNoLogin from '@/components/dashboard/NoLoginTopBar';

const Question = () => {
    const t = useTranslations('question');

    return (
        <Container fluid>
            <Row>
                <Col lg={12}>
                    <Row style={{ marginBottom: '32px' }}>
                        <Col
                            style={{
                                borderBottom: '1px solid #E8EDF5',
                                padding: '0',
                            }}>
                            <TopbarNoLogin />
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: '#ffffff' }}>
                        <Row className="wrapper-row app-contract">
                            <div
                                style={{
                                    maxWidth: '768px',
                                    margin: 'auto',
                                    padding: '0',
                                }}
                            >
                                <Row>
                                    <Col xs={12} lg={12}>
                                        <Row className="tw-question-second-row ml-4">
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
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
export default Question;
