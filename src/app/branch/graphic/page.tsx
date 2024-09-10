// import SalesByGenderChart from '@/components/branch/chart/gender';
import SalesDataChart from '@/components/branch/chart/news';
import PopularityTable from '@/components/branch/chart/popular';
import TodeySales from '@/components/branch/chart/sales';
import dynamic from 'next/dynamic';
import { Col, Row } from 'react-bootstrap';

const AgeGroupChart = dynamic(() => import('@/components/branch/chart/age'), {
    ssr: false,
});

const SalesByGenderChart = dynamic(() => import('@/components/branch/chart/gender'), {
    ssr: false,
});

const ChartPage = () => {
    return (
        <div className='p-10'>
            <Row>
                <Col xl={8} xs={12} lg={8}>
                    <TodeySales />
                </Col>
                <Col xl={4} xs={12} lg={4}>
                    <SalesDataChart />
                </Col>
            </Row>
            <Row>
                <Col xl={3} xs={6} lg={3}>
                    <AgeGroupChart />
                </Col>
                <Col xl={4} xs={6} lg={4}>
                    <SalesByGenderChart />
                </Col>
                <Col xl={5} xs={12} lg={5}>
                    <PopularityTable />
                </Col>
            </Row>
        </div>
    );
};

export default ChartPage;
