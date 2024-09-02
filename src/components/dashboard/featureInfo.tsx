"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Button, Container, Card } from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import FailNotification from '../notification/fail-notif';
import HomeTable from '../home/table';
import HomeTransaction from '../home/transfer';
import { thousands } from '@/utils/utils';

const FeaturedInfo = () => {
  const t = useTranslations('dashboard');
  const { partner, cardIndex, setCardIndex, partnerBalance, setPartnerBalance } = useContext(IctContext);
  const [show, setShow] = useState(false);
  const [transactionType, setTransactionType] = useState<number>(0);
  const [copied, setCopied] = useState(false);
  const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });

  useEffect(() => {
    balanceAction.run(partner?.profileId);
  }, []);

  const balanceAction = useRequest(authService.getBalance, {
    manual: true,
    onSuccess: async (data) => {
      setPartnerBalance(data);
    },
    onError: (e) => {
      setAlert({ show: true, message: e.message });
    }
  })

  const toggle = () => {
    const state = show;
    setShow(!state);
  };

  const closeNotification = () => {
    setAlert({ show: false, message: "" });
  };

  return (
    <Container fluid>
      <Row className="d-flex dashboard-features" style={{ marginBottom: '24px' }}>
        <Col xl={3} xs={4} lg={8} style={{ minWidth: "438px" }} >
          <div className="mp-wallet background" style={{ height: "144px", }}>
            <div className="content">
              <div className="content-inner">
                <div className="logo">
                  <img src="/features-icon-monpay.svg" />
                </div>
                <div className="mp-current-wallet">
                  <div className="content-item">
                    <h6>{t('balance')}</h6>
                    <div className={show ? 'hide' : 'show'}>
                      <img onClick={toggle} src="/account-icon-on.svg" />
                    </div>
                  </div>
                  <span>
                    {show
                      ? '***.***'
                      : partnerBalance?.balanceList.length > 0
                        ? partnerBalance.balanceList[cardIndex].balance.toString().replace(thousands, ',')
                        : '0.00'}
                    ₮
                  </span>

                </div>
                <div className="mp-wallet-id">
                  <h6>{t('mp-account')}</h6>
                  <span>{partnerBalance?.balanceList.length > 0 ? partnerBalance?.balanceList[cardIndex].accountNo : ""}</span>
                  <CopyToClipboard
                    text={partnerBalance?.balanceList.length > 0 ? partnerBalance?.balanceList[cardIndex].accountNo : ""}
                    onCopy={() =>
                      alert(
                        !copied ? 'Дансны дугаар амжилттай хуулагдлаа' : null
                      )
                    }
                  >
                    <div className="icon">
                      <img src="/dbicon-copy.svg" />
                    </div>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
          <Col >
            <div className="card-buttons">
              <div className="buttons-inner">
                <Button variant={transactionType === 0 ? "primary" : "outline-primary"} onClick={() => setTransactionType(0)}>
                  Гүйлгээний хуулга
                </Button>
                <Button variant={transactionType === 1 ? "primary" : "outline-primary"} onClick={() => setTransactionType(1)}>
                  Шилжүүлэх
                </Button>
                <Button variant={transactionType === 2 ? "primary" : "outline-primary"} onClick={() => setTransactionType(2)} className="d-flex justify-content-center align-items-center">
                  <img src={transactionType === 2 ? "/svg/settings-active.svg" : "/svg/settings.svg"} alt="Toggle password visibility" />
                </Button>
              </div>
            </div>
            <h5 className='mb-2'>Бусад данс</h5>
            <Row>
              {partnerBalance?.balanceList.map((account, index) => (
                cardIndex !== index ?
                  <Col key={index} md={12} className="mb-3" onClick={() => { setCardIndex(index); }}>
                    <Card className="p-3" style={{ backgroundColor: '#8089AC', color: '#fff', height: "86px", }}>
                      <div className="mp-wallet">
                        <div className="contents">
                          <div className="content-inner">
                            <div className="mp-current-wallet">
                              <div className="content-item">
                                <h6>{t('balance')}</h6>
                                <div className={show ? 'hide' : 'show'}>
                                  <img onClick={toggle} src="/account-icon-on.svg" />
                                </div>
                              </div>
                              <span>
                                {show
                                  ? '***.***'
                                  : account.balance.toString().replace(thousands, ',') ??
                                  '0.00'}
                                ₮
                              </span>
                            </div>
                            <div className="mp-wallet-id">
                              <h6>{t('mp-account')}</h6>
                              <span>{account?.accountNo}</span>
                              <CopyToClipboard
                                text={account?.accountNo}
                                onCopy={() =>
                                  alert(
                                    !copied ? 'Дансны дугаар амжилттай хуулагдлаа' : null
                                  )
                                }
                              >
                                <div className="icon">
                                  <img src="/dbicon-copy.svg" />
                                </div>
                              </CopyToClipboard>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Col> :
                  <></>

              ))}
            </Row>
          </Col>
        </Col>
        {transactionType === 0 ?
          <HomeTable /> : <HomeTransaction />}
      </Row>
      {alerts.show && (
        <FailNotification show={alerts.show} infos={alerts.message} close={closeNotification} />
      )}
    </Container>
  );
};

export default FeaturedInfo;
