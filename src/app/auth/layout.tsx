"use client"
import authService from "@/service/api";
import { BannerResponse } from "@/types";
import { useRequest } from "ahooks";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  const [banner, setBanner] = useState<BannerResponse>({ code: "", info: "", intCode: 0, result: [] });
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const pathName = usePathname();

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

  const renderCustomIndicators = () => (
    <div className="custom-indicators">
      {banner.result.map((_img, index) => (
        <span
          key={index}
          className={`indicator-dot ${index === activeIndex ? "active animate" : ""}`}
          onClick={() => handleSelect(index)}
        />
      ))}
    </div>
  );

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Container fluid>
      <Row className="tw-form">
        {pathName !== "/auth/faq" && pathName !== "/auth/help" ?
          <Col
            className="tw-image-section p-0 m-0"
            xs={7}
            xl={7}
            xxl={7}
            style={{
              backgroundImage: `url("/login/Bg.png")`,
              height: '100vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          >
            <Carousel
              className="p-0 m-0"
              wrap={false}
              interval={3000}
              prevIcon={""}
              fade={false}
              nextIcon={""}
              indicators={false}
              onSelect={handleSelect}
              activeIndex={activeIndex}
            >
              {banner.result.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="p-0 m-0"
                    src={img.url}
                    alt={`Slide ${index + 1}`}
                    style={{ width: '100%', height: '100vh', objectFit: 'fill' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            {renderCustomIndicators()}
          </Col> : <></>
        }
        {children}
      </Row>
    </Container>

  );
}

