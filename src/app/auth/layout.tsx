"use client"
import authService from "@/service/api";
import { Banner, BannerResponse } from "@/types";
import { useRequest } from "ahooks";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

interface RootLayoutProps {
    children: React.ReactNode;
}
export default function RootLayout({
    children,
}: Readonly<RootLayoutProps>) {
    const [banner, setBanner] = useState<BannerResponse>({ code: "", info: "", intCode: 0, result: [] });

    useEffect(() => {
        if (banner.result.length === 0) {
            bannerAction.run();
        }
    }, [banner]);

    const bannerAction = useRequest(authService.getBanner, {
        manual: true,
        onSuccess: async (data) => {
            setBanner(data);
        },
    });
    return (
        <Container fluid>
  <Row className="tw-form">
    <Col
      className="tw-image-section"
      xs={7} // Ensures it's always 7 columns wide on extra small screens and larger
      xl={7}
      xxl={7}
      style={{
        backgroundImage: `url("/login/Bg.png")`,
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <Carousel>
        {banner.result.map((img, index) => (
          <Carousel.Item key={index}>
            <img
              src={img.imageUrl}
              alt={`Slide ${index + 1}`}
              style={{ width: '100%', height: '100vh', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Col>
    {children}
  </Row>
</Container>

    );
}

