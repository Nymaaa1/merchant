"use client"
import React, { useState, useContext, useEffect } from 'react';
import { Row, Col, Button, Container, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import FailNotification from '../notification/fail-notif';
import HomeTable from '../home/table';
import HomeTransaction from '../home/transfer';
import { thousands } from '@/utils/utils';
import "../../styles/CustomSwitchComponent.css";

const FeaturedInfo = () => {
  const t = useTranslations('dashboard');
  const { partner, cardIndex, setCardIndex, partnerBalance, setPartnerBalance } = useContext(IctContext);
  const [show, setShow] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<number>(0);
  const [accountSettings, setAccountSettings] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
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

  const converHidePhone = (val: string) => {
    return val.length > 4
      ? val.substring(0, 2) + '***' + val.substring(5)
      : val;
  }

  return (
    <Container fluid style={{ fontFamily: "Code Next" }}>
      <Row className="d-flex dashboard-features" style={{ marginBottom: '24px' }}>
        <Col xl={3} xs={4} lg={8} style={{ minWidth: "438px" }} >
          {cardIndex === 0 ?
            <div className="mp-wallet background mb-10">
              <div className="content">
                <div className="content-inner">
                  <div className="mp-current-wallet">
                    <div className="content-item">
                      <h6>Дансны үлдэгдэл</h6>
                      <div className={show ? 'hide' : 'show'}>
                        <img onClick={toggle} src="/account-icon-on.svg" />
                      </div>
                    </div>
                    <span>
                      {show
                        ? '***.***'
                        : partnerBalance?.balanceList.length > 0
                          ? partnerBalance.balanceList[0].balance.toString().replace(thousands, ',')
                          : '0.00'}
                      ₮
                    </span>
                  </div>
                  <div className="mp-wallet-id">
                    <h6>{partnerBalance?.balanceList[0]?.nickName ? partnerBalance?.balanceList[0].nickName : t('mp-account')}</h6>
                    <span>{partnerBalance?.balanceList.length > 0 ? partnerBalance?.balanceList[0].accountNo : ""}</span>
                    <CopyToClipboard
                      text={partnerBalance?.balanceList.length > 0 ? partnerBalance?.balanceList[0].accountNo : ""}
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
              <div className="card-buttons">
                <div className="buttons-inner">
                  <Button style={{ backgroundColor: transactionType !== 0 ? "#ffff" : "#4341CC", border: "unset" }} variant={transactionType === 0 ? "primary" : "outline-primary"} onClick={() => setTransactionType(0)}>
                    Гүйлгээний хуулга
                  </Button>
                  <Button style={{ backgroundColor: transactionType !== 1 ? "#ffff" : "", border: "unset" }} variant={transactionType === 1 ? "primary" : "outline-primary"} onClick={() => setTransactionType(1)}>
                    Шилжүүлэх
                  </Button>
                  <Button style={{ backgroundColor: !accountSettings ? "#ffff" : "", border: "unset" }} variant={accountSettings ? "primary" : "outline-primary"} onClick={() => setAccountSettings(!accountSettings)} className="dontchangedcolor d-flex justify-content-center align-items-center">
                    <img src={accountSettings ? "/svg/settings-active.svg" : "/svg/settings.svg"} alt="Toggle password visibility" />
                  </Button>
                </div>
              </div>
            </div>
            :
            <Card className="p-3 mb-10" style={{ backgroundColor: '#8089AC', color: '#fff', height: "86px", }} onClick={() => setCardIndex(0)}>
              <div className="mp-wallet">
                <div className="contents">
                  <div className="content-inner" style={{ paddingLeft: 10 }}>
                    <div className="mp-current-wallet">
                      <div className="content-item">
                        <h6>Дансны үлдэгдэл</h6>
                        <div className={show ? 'hide' : 'show'}>
                          <img onClick={toggle} src="/account-icon-on.svg" />
                        </div>
                      </div>
                      <span style={{ fontSize: 16 }}>
                        {show
                          ? '***.***'
                          : partnerBalance?.balanceList.length > 0
                            ? partnerBalance.balanceList[0].balance.toString().replace(thousands, ',')
                            : '0.00'}
                        ₮
                      </span>
                    </div>
                    <div className="mp-wallet-id">
                      <h6>{partnerBalance?.balanceList[0]?.nickName ? partnerBalance?.balanceList[0].nickName : t('mp-account')}</h6>
                      <span style={{ fontSize: 14, marginTop: 6 }}>{partnerBalance?.balanceList.length > 0 ? partnerBalance?.balanceList[0].accountNo : ""}</span>
                      <CopyToClipboard
                        text={partnerBalance?.balanceList.length > 0 ? partnerBalance?.balanceList[0].accountNo : ""}
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
          }
          <Col >
            {
              cardIndex === 0 && accountSettings ?
                <AccountInfo index={0} />
                :
                <></>
            }
            <h5 className='mb-2'>Бусад данс</h5>
            <Row>
              {partnerBalance?.balanceList.map((account, index) => (
                index === 0 ? <></> :
                  <Col key={index} md={12} className="mb-3" onClick={() => { setCardIndex(index); }}>
                    {index === cardIndex ?
                      <>
                        <div className={`mp-wallet background ${cardIndex === 0 ? "mb-10" : ""}`} >
                          <div className="content">
                            <div className="content-inner">
                              <div className="mp-current-wallet">
                                <div className="content-item">
                                  <h6>Дансны үлдэгдэл</h6>
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
                                <h6>{partnerBalance?.balanceList[cardIndex]?.nickName ? partnerBalance?.balanceList[cardIndex].nickName : t('mp-account')}</h6>
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
                          <div className="card-buttons">
                            <div className="buttons-inner">
                              <Button style={{ backgroundColor: transactionType !== 0 ? "#ffff" : "#4341CC", border: "unset" }} variant={transactionType === 0 ? "primary" : "outline-primary"} onClick={() => setTransactionType(0)}>
                                Гүйлгээний хуулга
                              </Button>
                              <Button style={{ backgroundColor: transactionType !== 1 ? "#ffff" : "", border: "unset" }} variant={transactionType === 1 ? "primary" : "outline-primary"} onClick={() => setTransactionType(1)}>
                                Шилжүүлэх
                              </Button>
                              <Button style={{ backgroundColor: accountSettings ? "#ffff" : "", border: "unset" }} variant={!accountSettings ? "primary" : "outline-primary"} onClick={() => setAccountSettings(!accountSettings)} className="d-flex justify-content-center align-items-center">
                                <img src={!accountSettings ? "/svg/settings-active.svg" : "/svg/settings.svg"} alt="Toggle password visibility" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        {accountSettings && cardIndex !== 0 ?
                          <AccountInfo index={index} />
                          :
                          <></>
                        }
                      </>
                      :
                      <Card className="p-3" style={{ backgroundColor: '#8089AC', color: '#fff', height: "86px", }}>
                        <div className="mp-wallet">
                          <div className="contents">
                            <div className="content-inner" style={{ paddingLeft: 10 }}>
                              <div className="mp-current-wallet">
                                <div className="content-item">
                                  <h6>Дансны үлдэгдэл</h6>
                                  <div className={show ? 'hide' : 'show'}>
                                    <img onClick={toggle} src="/account-icon-on.svg" />
                                  </div>
                                </div>
                                <span style={{ fontSize: 16 }}>
                                  {show
                                    ? '***.***'
                                    : account.balance.toString().replace(thousands, ',') ??
                                    '0.00'}
                                  ₮
                                </span>
                              </div>
                              <div className="mp-wallet-id">
                                <h6>{partnerBalance?.balanceList[index]?.nickName ? partnerBalance?.balanceList[index].nickName : t('mp-account')}</h6>
                                <span style={{ fontSize: 14, marginTop: 6 }}>{account?.accountNo}</span>
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
                    }
                  </Col>
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

type AccountInfoProps = {
  index: number;
};

const AccountInfo: React.FC<AccountInfoProps> = ({ index }) => {
  const { partner, cardIndex, setCardIndex, partnerBalance, setPartnerBalance } = useContext(IctContext);
  const [showPaymentPassword, setShowPaymentPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const converHidePhone = (val: string) => {
    return val.length > 4
      ? val.substring(0, 2) + '***' + val.substring(5)
      : val;
  }

  const changeCheckSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className='mb-10' >
        <div className="person-title mt-10" >
          <h5 style={{ fontSize: "13px", color: "#5B698E" }}>Дансны нэр</h5>
        </div>
        <div className="input-item">
          <InputGroup >
            <Form.Control
              disabled={false}
              style={{ backgroundColor: "#ffff", height: "48px", borderRadius: "8px", paddingLeft: "18px" }}
              type="text"
              name="lastname"
              placeholder={partner?.username}
              className="custom-placeholder"
            />
          </InputGroup>
        </div>
        <div className="person-title mt-2">
          <h5 style={{ fontSize: "13px", color: "#5B698E" }}>
            Мессеж үйлчилгээг хаах / нээх
          </h5>
        </div>
        <div style={{ padding: '8px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
          <Form.Group as={Row} controlId="customSwitch">
            <Col sm={9}>
              <Form.Control
                plaintext
                readOnly
                type="text"
                name="lastname"
                placeholder={converHidePhone(partner?.phone)}
                style={{ paddingLeft: "10px", fontSize: "13px" }}
                className="custom-placeholder"
              />
            </Col>
            <Col sm={3} className="d-flex justify-content-end align-items-center">
              <label className="switch">
                <input type="checkbox" checked={isChecked} onChange={changeCheckSwitch} />
                <span className="slider round"></span>
              </label>
            </Col>
          </Form.Group>
        </div>
        <div className="person-title mt-2">
          <h5 style={{ fontSize: "13px", color: "#5B698E" }}>
            Мессеж дугаар солих
          </h5>
        </div>
        <div style={{ padding: '8px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
          <Form.Group as={Row} controlId="customSwitch">
            <Col sm={9}>
              <Form.Control
                maxLength={8}
                plaintext
                type="number"
                name="lastname"
                defaultValue={partner?.phone}
                style={{ paddingLeft: "10px", fontSize: "13px" }}
                className="custom-placeholder"
              />
            </Col>
            <Col sm={3} className="d-flex justify-content-end align-items-center" style={{ color: "#4341CC" }} onClick={() => setShowPaymentPassword(!showPaymentPassword)}>
              Хадгалах
            </Col>
          </Form.Group>
        </div>
      </div >
      <Modal
        show={showPaymentPassword}
        onHide={() => setShowPaymentPassword(false)}
        dialogClassName="save-template"
        centered
      >
        <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
          <div className="header-title" >
            <h5>Гүйлгээний нууц үг</h5>
          </div>
        </Modal.Header>
        <Modal.Body
          style={{
            paddingBottom: '0',
          }}
        >
          <div className="template-body">
            <div>
              <div>
                <Form.Control
                  className="save-temp-input"
                  type="text"
                  onChange={(e) => {
                    // handleCheck(e);
                    // setUid(e.target?.value);
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="tw-single-button">
            <Button
            // disabled={!forDisabled}
            // onClick={handleSubmitCreate}
            >
              Хадгалах
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
};

export default FeaturedInfo;