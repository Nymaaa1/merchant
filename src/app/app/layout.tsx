"use client"
import SidebarControl from "@/components/dashboard/sideBar";
import Topbar from "@/components/dashboard/topBar";
import { usePathname } from "next/navigation";
import React from "react";
import { Col, Container, Row, SSRProvider } from "react-bootstrap";

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({
    children,
}: Readonly<RootLayoutProps>) {
    const pathName = usePathname();
    return (
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
                            <Topbar name={pathName === "/app/dashboard" ? "Үндсэн данс" : pathName === "/app/faq" ? "FAQ" : pathName === "/app/settings" ? "Хэрэглэгчийн тохиргоо" : pathName === "/app/service" ? "Нэмэлт үйлчилгээ" : pathName === "/app/help" ? "Тусламж" : pathName === "/app/graphic" ? "Дашбоард, Демограф" : ""}
                                logo={pathName === "/app/settings" || pathName === "/app/help" ? "/svg/icon-setting.svg" : pathName === "/app/faq" ? "/svg/icon-question.svg" : "/svg/icon-wallet.svg"} />
                        </Col>
                    </Row>
                    <Row style={{ backgroundColor: '#ffffff' }}>
                        {children}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

