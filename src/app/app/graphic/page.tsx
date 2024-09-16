"use client"
import AgeGroupChart from '@/components/graphic/chart/age';
import SalesByGenderChart from '@/components/graphic/chart/gender';
import SalesDataChart from '@/components/graphic/chart/news';
import PopularityTable from '@/components/graphic/chart/popular';
import TodeySales from '@/components/graphic/chart/sales';
import FailNotification from '@/components/notification/fail-notif';
import { useLoading } from '@/context/loading';
import authService from '@/service/api';
import { GraphicAgeResponse } from '@/types';
import { DistrictGraphicResponse, GenderGraphicResponse, SalesGraphic, SalesPartnerGraphic } from '@/types/demo';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

const ChartPage = () => {
    const { setLoading, setColor } = useLoading();
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [ageList, setAgeList] = useState<GraphicAgeResponse>({ code: 0, info: "", result: [] });
    const [districtList, setDistrictList] = useState<DistrictGraphicResponse>({ intCode: 0, code: "", info: "", result: [] });
    const [genderList, setGenderList] = useState<GenderGraphicResponse>({ intCode: 0, code: "", info: "", result: [] });
    const [briefinfo, setBriefinfo] = useState<SalesGraphic>({ partnerId: 0, sellToday: 0, sellAvg: 0, txnToday: 0, txnAvg: 0, customerToday: 0, customerAvg: 0 });
    const [sales, setSales] = useState<SalesPartnerGraphic[]>([]);
    const [type, setType] = useState<string>("monthly");

    useEffect(() => {
        setColor("#4341CC");
        setLoading(true);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await recentAction.run();
            await getGraphicDistrict.run();
            await getGraphicGender.run();
            await getGraphicBriefinfo.run();
            await getGraphicSales.run(type);
        } catch (error) {
            setAlert({ show: true, message: "Хүсэлт алдаа гарлаа." });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (val: string) => {
        setType(val);
        getGraphicSales.run(val);
    };

    const recentAction = useRequest(authService.getGraphicAge, {
        manual: true,
        onSuccess: async (data) => {
            setAgeList(data);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    });

    const getGraphicDistrict = useRequest(authService.getGraphicDistrict, {
        manual: true,
        onSuccess: async (data) => {
            setDistrictList(data);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    });

    const getGraphicGender = useRequest(authService.getGraphicGender, {
        manual: true,
        onSuccess: async (data) => {
            setGenderList(data);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    });

    const getGraphicBriefinfo = useRequest(authService.getGraphicBriefinfo, {
        manual: true,
        onSuccess: async (data) => {
            setBriefinfo(data.result);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    });

    const getGraphicSales = useRequest(authService.getGraphicSales, {
        manual: true,
        onSuccess: async (data) => {
            setSales(data.result);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    });

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    return (
        <div className='p-10'>
            <Row>
                <Col xl={8} xs={12} lg={8}>
                    <TodeySales briefinfo={briefinfo} />
                </Col>
                <Col xl={4} xs={12} lg={4}>
                    <SalesDataChart sales={sales} type={type} handleChange={handleChange} />
                </Col>
            </Row>
            <Row>
                <Col xl={3} xs={6} lg={3}>
                    <AgeGroupChart ageList={ageList} />
                </Col>
                <Col xl={4} xs={6} lg={4}>
                    <SalesByGenderChart genderList={genderList} />
                </Col>
                <Col xl={5} xs={12} lg={5}>
                    <PopularityTable districtList={districtList} />
                </Col>
            </Row>
            {alerts.show && (
                <FailNotification show={alerts.show} infos={alerts.message} close={closeNotification} />
            )}
        </div>
    );
};

export default ChartPage;
