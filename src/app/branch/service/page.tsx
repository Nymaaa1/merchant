"use client";
import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap';

const HomePage = () => {
    const serviceMonpayPlus: string[] = ["", "", ""];
    const [showPaymentPassword, setShowPaymentPassword] = useState<boolean>(false);
    const [validated, setValidated] = useState(false);

    return (
        <Container fluid>
            <Row className="wrapper-row">
                <div
                    style={{
                        margin: 'auto',
                        paddingLeft: '40px',
                        paddingRight: "40px",
                    }}
                >
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 rounded-lg flex flex-col justify-between" style={{ color: "#5B698E", backgroundColor: "#DCFDFF" }} >
                                <div>
                                    <h2 style={{ color: "#15A3AA", fontSize: "32px" }}>MONPAY PLUS ҮЙЛЧИЛГЭЭ</h2>
                                    <h4 style={{ color: "#5B698E", fontSize: "22px" }}>Хүүгүй, Урьдчилгаагүй 2-6 хуваан төлөх боломж </h4>
                                    <p style={{ fontSize: "14px", fontWeight: "600" }} className='mt-10'>
                                        Хэрэглэгч та MonPay Plus үйлчилгээ ашиглан бараа бүтээгдэхүүн
                                        худалдаан авахдаа MonPay апп-аа оруул QR кодыг уншуулан өөрт
                                        тохируулах 2-6 хуваан төлөх боломжтой.
                                    </p>
                                    <p style={{ fontSize: "14px", fontWeight: "600" }}> Урт хугацаат зээлийн үндсэн мэдээлэл:</p>
                                    <p style={{ fontSize: "14px", fontWeight: "600" }}>Зээлийн хэмжээ: 50,000₮ -2,500,000₮ хүртэлх</p>
                                    <ul className="list-disc pl-7 mb-4" style={{ fontSize: "14px", fontWeight: "600" }}>
                                        <li>Зээлийн хэмжээ: 50,000₮ - 2,500,000₮ хүртэлх</li>
                                        <li>1-3 сарын хугацаатай</li>
                                        <li>Хүү, Урьдчилгаа, Шимтгэлгүй</li>
                                        <li>2-6 хуваан төлөх боломжтой</li>
                                    </ul>
                                    <p className="mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>Урт хугацаат зээлийн шалгуур:</p>
                                    <ul className="list-disc pl-7" style={{ fontSize: "14px", fontWeight: "600" }}>
                                        <li>18 нас хүрсэн Монгол улсын иргэн байх;</li>
                                        <li>Цахим мөнгөний гэрээ байгуулсан;</li>
                                        <li>Богино хугацаат зээлийн эрх нээх гэрээ байгуулсан;</li>
                                        <li>Өр, орлогын харьцаа хэтрээгүй;</li>
                                        <li>Зээлийн Мэдээллийн Санд хэвийнээс бусад зээлгүй;</li>
                                    </ul>
                                    <p className="mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>
                                        Хэрэглэгч та дээр дурдсан шалгууруудыг хангасан дараах зааврын
                                        дагуу MonPay Plus үйлчилгээгээ аваарай.
                                    </p>
                                </div>
                                <div
                                    style={{
                                        overflowX: 'auto',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <Row className="flex-nowrap g-2">
                                        {serviceMonpayPlus.map((service, index) => (
                                            <Col key={index} style={{ display: 'inline-block', gap: "2px" }}>
                                                <div className='mt-10' style={{ height: "209px", width: "209px", backgroundColor: "#BBDEE0", borderRadius: "8px" }}></div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                                <Row className='mt-10'>
                                    <Col className='d-flex align-items-center'>
                                        <p className="mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>
                                            Та MonPay Plus үйлчилгээнд нэгдэх бол хүсэлт илгээж бидэнтэй холбогдох боломжтой.
                                        </p>
                                    </Col>
                                    <Col className='d-flex justify-content-end align-items-center'>
                                        <Button style={{ borderRadius: "8px", border: "none", backgroundColor: "#15A3AA", color: "#ffff", width: "225px", height: "48px" }} onClick={() => setShowPaymentPassword(!showPaymentPassword)}>
                                            Хүсэлт илгээх →
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                            <div className="p-10 rounded-lg flex flex-col justify-between" style={{ color: "#5B698E", backgroundColor: 'rgba(255, 134, 80, 0.1)' }} >
                                <div>
                                    <h2 style={{ color: "#FF8650", fontSize: "32px" }}>MONPAY AWWW</h2>
                                    <h4 style={{ color: "#5B698E", fontSize: "22px" }}>Онлайн худалдааны платпорм</h4>
                                    <p style={{ fontSize: "14px", fontWeight: "600" }} className='mt-10'>
                                        Хэрэглэгч та MonPay Plus үйлчилгээг ашиглан бараа бүтээгдэхүүн худалдан авахдаа MonPay апп-аараа ороод QR кодыг уншуулан өөрт тохируулан 2-6 хуваан төлөх боломжтой.
                                    </p>
                                    <p style={{ fontSize: "14px", fontWeight: "600" }}>Урт хугацаат зээлийн үндсэн мэдээлэл:</p>
                                    <p style={{ fontSize: "14px", fontWeight: "600" }}>Зээлийн хэмжээ: 50,000₮ -2,500,000₮ хүртэлх</p>
                                    <ul className="list-disc pl-7 mb-4" style={{ fontSize: "14px", fontWeight: "600" }}>
                                        <li>Зээлийн хэмжээ: 50,000₮ - 2,500,000₮ хүртэлх</li>
                                        <li>1-3 сарын хугацаатай</li>
                                        <li>Хүү, Урьдчилгаа, Шимтгэлгүй</li>
                                        <li>2-6 хуваан төлөх боломжтой</li>
                                    </ul>
                                    <p className="mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>Урт хугацаат зээлийн шалгуур:</p>
                                    <ul className="list-disc pl-7" style={{ fontSize: "14px", fontWeight: "600" }}>
                                        <li>18 нас хүрсэн Монгол улсын иргэн байх;</li>
                                        <li>Цахим мөнгөний гэрээ байгуулсан;</li>
                                        <li>Богино хугацаат зээлийн эрх нээх гэрээ байгуулсан;</li>
                                        <li>Өр, орлогын харьцаа хэтрээгүй;</li>
                                        <li>Зээлийн Мэдээллийн Санд хэвийнээс бусад зээлгүй;</li>
                                    </ul>
                                    <p className="mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>
                                        Хэрэглэгч та дээр дурдсан шалгууруудыг хангасан дараах зааврын
                                        дагуу MonPay Plus үйлчилгээгээ аваарай.
                                    </p>
                                </div>
                                <div
                                    style={{
                                        overflowX: 'auto',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <Row className="flex-nowrap g-2">
                                        {serviceMonpayPlus.map((service, index) => (
                                            <Col key={index} style={{ display: 'inline-block', gap: "2px" }}>
                                                <div className='mt-10' style={{ height: "209px", width: "209px", backgroundColor: "#F9E3DB", borderRadius: "8px" }}></div>
                                            </Col>
                                        ))}
                                    </Row>
                                </div>
                                <Row className='mt-10'>
                                    <Col className='d-flex align-items-center'>
                                        <p className="mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>
                                            Та MonPay AWWW үйлчилгээнд нэгдэх бол хүсэлт илгээж бидэнтэй холбогдох боломжтой.
                                        </p>
                                    </Col>
                                    <Col className='d-flex justify-content-end align-items-center'>
                                        <Button style={{ borderRadius: "8px", border: "none", backgroundColor: "#FF8650", color: "#ffff", width: "225px", height: "48px" }}>
                                            Хүсэлт илгээх →
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
            </Row>
            <Modal
                show={showPaymentPassword}
                onHide={() => setShowPaymentPassword(false)}
                dialogClassName="save-template"
                centered
            >
                <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
                    <div className="header-title" >
                        <h5>Илгээх мэдээлэл</h5>
                    </div>
                </Modal.Header>
                <Modal.Body
                    style={{
                        paddingBottom: '0',
                    }}
                >
                    <Form noValidate validated={validated} onSubmit={() => { }}>
                        <Form.Group>
                            <div className="template-body">
                                <div className="tw-user-bottom">
                                    <div className="tw-user-form">
                                        <div className="person-title">
                                            <h5>Нэр / Байгууллагын нэр</h5>
                                        </div>
                                        <div className="input-item">
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    className="save-temp-input"
                                                    type="text"
                                                    onChange={(e) => {
                                                        // handleCheck(e);
                                                        // setUid(e.target?.value);
                                                    }}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="person-title">
                                            <h5>Утасны дугаар</h5>
                                        </div>
                                        <div className="input-item">
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    className="save-temp-input"
                                                    type="number"
                                                    maxLength={8}
                                                    plaintext
                                                    onChange={(e) => {
                                                        // handleCheck(e);
                                                        // setUid(e.target?.value);
                                                    }}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="person-title">
                                            <h5>И-Мэйл хаяг</h5>
                                        </div>
                                        <div className="input-item">
                                            <InputGroup hasValidation>
                                                <Form.Control
                                                    className="save-temp-input"
                                                    type="text"
                                                    onChange={(e) => {
                                                        // handleCheck(e);
                                                        // setUid(e.target?.value);
                                                    }}
                                                />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="tw-form-buttons" style={{ marginTop: "30px" }}>
                                        <div className="tw-single-button">
                                            <Button type="submit">Хүсэлт илгээх</Button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default HomePage;
