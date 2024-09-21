"use client";
import { Container, Row, Col } from 'react-bootstrap';

export default function ComingSoon() {
    return (
        <Container fluid className="coming-soon-container">
            <Row className="d-flex align-items-center justify-content-center" style={{ height: '80vh' }}>
                <Col xs={12} md={6} className="text-center">
                    <h2 style={{ fontFamily: "Code Next" }} >Тун удахгүй...</h2>
                </Col>
            </Row>
        </Container>
    );
}
