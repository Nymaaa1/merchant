import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';


type HelpPartnerdata = {
    image: string,
    name: string,
    url: string,
    phone: string,
    video: string
};

const TodeySales = () => {
    const partnerHelpdata: HelpPartnerdata[] = [{
        image: "/dashboard/demo1.png",
        name: "200",
        url: "Гүйлгээний тоо",
        phone: "+8% from yesterday",
        video: "#FFE2E5"
    }, {
        image: "/dashboard/demo2.png",
        name: "300",
        url: "Хэрэглэгчийн тоо",
        phone: "+5% from yesterday",
        video: "#FFF4DE"
    }, {
        image: "/dashboard/demo3.png",
        name: "15сая",
        url: "Борлуулалтын дүн",
        phone: "+1,2% from yesterday",
        video: "#DCFCE7"
    }, {
        image: "/dashboard/demo4.png",
        name: "8",
        url: "Шинэ хэрэглэгч",
        phone: "0,5% from yesterday",
        video: "#F3E8FF"
    }];
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 mb-10" style={{ boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
            <div
                className="control"
                style={{
                    height:"302px",
                    margin: 'auto',
                }}>
                <Col>
                    <Col>
                        <div>
                            <h4 style={{ fontSize: "20px" }}>Today’s Sales</h4>
                            <h5 className='mt-2' style={{ fontWeight: "600", fontSize: "16px", color: "#737791" }}>Sales Summery </h5>
                        </div>
                    </Col>
                    <Col className='mt-10'>
                        <div
                            style={{
                                overflowX: 'auto',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <Row className="flex-nowrap">
                                {partnerHelpdata.map((partner, index) => (
                                    <Col className="p-3" key={index} style={{ display: 'inline-block' }}>
                                        <div
                                            className="transaction-template"
                                            style={{
                                                borderRadius: '16px',
                                                backgroundColor: partner.video,
                                                padding: '25px',
                                                width: "180px",
                                                height: "184px",
                                            }}>
                                            <Image src={partner.image} alt='' width={40} height={40} />
                                            <h5 style={{ color: '#151D48', fontSize: '24px' }} className="mt-4">
                                                {partner.name}
                                            </h5>
                                            <h5 style={{ color: '#425166', fontSize: '14px' }} className="mt-2">
                                                {partner.url}
                                            </h5>
                                            <h5 style={{ color: '#4079ED', fontSize: '12px' }} className="mt-1">
                                                {partner.phone}
                                            </h5>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </Col>
                </Col>
            </div>
        </div>
    );
};

export default TodeySales;
