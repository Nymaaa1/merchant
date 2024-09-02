import React from 'react';
// import Chart from 'components/charts';
// import FeaturedInfo from 'components/featuredInfo';
// import Transaction from 'components/transaction/transaction';
// import Send from 'components/send/send';
import { Row, Col } from 'react-bootstrap';
import FeaturedInfo from './featureInfo';

const Control = () => {
  return (
    <div
      className="control"
      style={{
        margin: 'auto',
      }}
    >
      <FeaturedInfo />
      <div style={{ marginBottom: '24px' }}>
        <Row>
          <Col lg={9}>
            {/* <Chart /> */}
          </Col>
          <Col className="fast-transfer" lg={3}>
            {/* <Send /> */}
          </Col>
        </Row>
      </div>
      {/* <Transaction /> */}
    </div>
  );
};

export default Control;
