import { SalesGraphic } from '@/types/demo';
import Image from 'next/image';
import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';


type HelpPartnerdata = {
    image: string,
    name: string,
    url: string,
    video: string
};

type SalesDataProps = {
    briefinfo: SalesGraphic,
}

const TodeySales: React.FC<SalesDataProps> = ({ briefinfo }) => {
    const partnerHelpdata: HelpPartnerdata[] = [{
        image: "/dashboard/demo1.png",
        name: (briefinfo?.txnToday ?? 0).toString()
            .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ','
            ),
        url: "Гүйлгээний тоо",
        video: "#FFE2E5"
    }, {
        image: "/dashboard/demo2.png",
        name: (briefinfo?.customerToday ?? 0).toString()
            .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ','
            ),
        url: "Хэрэглэгчийн тоо",
        video: "#FFF4DE"
    }, {
        image: "/dashboard/demo3.png",
        name: `${(briefinfo?.sellToday ?? 0).toString()
            .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ','
            )} сая`,
        url: "Борлуулалтын дүн",
        video: "#DCFCE7"
    }, {
        image: "/dashboard/demo4.png",
        name: "0",
        url: "Шинэ хэрэглэгч",
        video: "#F3E8FF"
    }];
    return (
        <div className="bg-white rounded-lg p-4 md:p-6 mb-10" style={{ boxShadow: "0px 0px 8px 8px #F8F9FA" }}>
            <div
                className="control"
                style={{
                    height: "302px",
                    margin: 'auto',
                }}>
                <Col>
                    <Col>
                        <div>
                            <h4 style={{ fontSize: "20px" }}>Today’s Sales</h4>
                            <h5 className='mt-3' style={{ fontWeight: "600", fontSize: "16px", color: "#737791" }}>Sales Summery </h5>
                        </div>
                    </Col>
                    <Col className='mt-4'>
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
                                            <h5 style={{ color: '#425166', fontSize: '14px' }} className="mt-4">
                                                {partner.url}
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
