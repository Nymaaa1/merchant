"use client";
import IctContext from '@/context/ict-context';
import authBranchService from '@/service/branch';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const Control = () => {
    const { helpList, setHelpList } = useContext(IctContext);
    const [isPlay, setIsPlay] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);

    useEffect(() => {
        if (helpList.result.length === 0) {
            getHelpList.run();
        }
    }, [helpList]);

    const getHelpList = useRequest(authBranchService.getHelpList, {
        manual: true,
        onSuccess: async (data) => {
            setHelpList(data);
        },
    });

    return (
        <div
            className="control"
            style={{
                fontFamily: "Code Next",
                margin: 'auto',
                paddingRight: "20px",
                paddingLeft: "20px"
            }}
        >
            <Col>
                <Row className="dashboard-features" style={{ marginBottom: '24px' }}>
                    <Col xl={9} xs={12} lg={9}>
                        <div
                            className="transaction-template"
                            style={{
                                borderRadius: '8px',
                                padding: "25px",
                                height: "auto",
                                border: '1px solid #E8EDF5',
                            }}
                        >
                            <h4>Монпэй үйлчилгээг бүх үүрэн холбооны хэрэглэгч авах боломжтой.</h4>
                            <h5 className='mt-4' style={{ fontWeight: "600", fontSize: "13px", color: "#5B698E" }}>Та Монпэй үйлчилгээнд Монпэй апликейшн, вебсайтаар өөрийн мэдээллээ (овог, нэр, регистрийн дугаар, гар утасны дугаар) бүртгүүлэн баталгаажуулсан, эсвэл Мобикомын хэрэглэгч бол 555 дугаарт ON мессеж илгээснээр Монпэй үйлчилгээний бүрэн бус бүртгэлтэй хэрэглэгч болж Монпэй дансаараа дараах хязгаартайгаар гүйлгээ хийх, дансны үлдэгдлээ хянах боломжтой. Та бүрэн бүртгэлтэй хэрэглэгч болохын тулд өөрт ойр байрлах Мобикомын үйлчилгээний салбарт ирж Монпэй үйлчилгээний гэрээ байгуулна уу. </h5>
                            <ul className="list-disc pl-7 mt-8" style={{ fontSize: "13px", fontWeight: "600", color: "#5B698E" }}>
                                <li>Зээлийн хэмжээ: 50,000₮ - 2,500,000₮ хүртэлх</li>
                                <li>1-3 сарын хугацаатай</li>
                                <li>Хүү, Урьдчилгаа, Шимтгэлгүй</li>
                                <li>2-6 хуваан төлөх боломжтой</li>
                            </ul>
                            {/* <Button className='d-flex justify-content-center align-items-center gap-2 mt-3' style={{ borderRadius: "8px", border: "none", backgroundColor: "#4341CC", color: "#ffff", width: "177px", height: "48px" }}>
                                <Image src={"/svg/help-world.svg"} alt='' width={24} height={24} />
                                Сайтаар зочлох
                            </Button> */}
                        </div>
                    </Col>
                    <Col xl={3} xs={12} lg={3}>
                        <div
                            className="transaction-template"
                            style={{
                                borderRadius: '8px',
                                border: '1px solid #E8EDF5',
                                height: "auto",
                            }}
                        >
                            <div className="content">
                                <div className="title">
                                    <h6 style={{ fontSize: "15px" }}>Open API</h6>
                                    <h6 style={{ color: "#8089AC", fontSize: "11px" }}>Хөгжүүлэгч нарт зориулсан</h6>
                                </div>
                                <div className="images" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <h4 style={{ color: "#5B698E", fontSize: "13px", textAlign: "center" }}>
                                            Та Монпэй хөгжүүлэлттэй холбоотой бүх төрлийн зааварчилгааг доорх Site-с мэдээлэл аваарай.
                                        </h4>
                                        <Link href="https://developers.monpay.mn/" target="_blank">
                                            <Button
                                                className="d-flex justify-content-center align-items-center gap-2 mt-3"
                                                style={{ borderRadius: "8px", border: "none", backgroundColor: "#4341CC", color: "#ffff", width: "177px", height: "48px" }}
                                            >
                                                <Image src={"/svg/help-world.svg"} alt="" width={24} height={24} />
                                                Сайтаар зочлох
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row >
                <Col xl={12} xs={12} lg={12} >
                    <div className="transaction-template"
                        style={{
                            paddingTop: "25px",
                        }}>
                        <h5 style={{ fontSize: "19px" }}> Кассын програм хөгжүүлэгч байгууллагууд</h5>
                        <h5 style={{ color: "#8089AC", fontSize: "14px" }}>Кассын системийн тохиргоо, заавар мэдээлэл</h5>
                    </div>
                </Col>
                <div
                    style={{
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <Row className="flex-nowrap">
                        {helpList.result.map((partner, index) => (
                            <Col className="p-3" key={index} style={{ display: 'inline-block' }}>
                                <div
                                    className="transaction-template"
                                    style={{
                                        maxWidth: "288px",
                                        borderRadius: '8px',
                                        padding: '25px',
                                        height: "auto",
                                        border: '1px solid #E8EDF5',
                                    }}
                                >
                                    <div>
                                        <div
                                            style={{
                                                width: '60px',
                                                padding: '10px',
                                                border: '1px solid #E8EDF5',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <img
                                                className="image2"
                                                src={partner.logo}
                                                alt="Bill icon"
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                    </div>
                                    <h5 style={{ color: '#161E34', fontSize: '16px' }} className="mt-8">
                                        {partner.name}
                                    </h5>
                                    <div className="d-flex justify-content-start align-items-center gap-2 mt-2">
                                        <Image src={'/help/url.svg'} alt="" width={16} height={16} />
                                        <Link href={partner.web as unknown as URL} target="_blank">
                                            <h5 style={{ color: '#5B698E', fontSize: '14px' }}>{partner.web}</h5>
                                        </Link>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center gap-2 mt-2">
                                        <Image src={'/help/phone.svg'} alt="" width={16} height={16} />
                                        <h5 style={{ color: '#5B698E', fontSize: '14px' }}>{partner.phone}</h5>
                                    </div>
                                    <div className="mt-4">
                                        {isPlay && index === currentVideo ? (
                                            <iframe
                                                width={237}
                                                height={137}
                                                src={partner.videoUrl}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <>
                                                <Image
                                                    onClick={() => { setIsPlay(true); setCurrentVideo(index); }}
                                                    width={244}
                                                    height={137}
                                                    src={"/help/video.png"}
                                                    alt={"b"}
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Col>
        </div>
    );
};

export default Control;
