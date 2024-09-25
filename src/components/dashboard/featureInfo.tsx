"use client"
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Row, Col, Button, Container, Card, Form, InputGroup, Modal } from 'react-bootstrap';
import IctContext from '@/context/ict-context';
import { useTranslations } from 'next-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRequest } from 'ahooks';
import authService from '@/service/api';
import FailNotification from '../notification/fail-notif';
import HomeTable from '../home/table';
import HomeTransaction from '../home/transfer';
import { phoneRegex, thousands } from '@/utils/utils';
import "../../styles/CustomSwitchComponent.css";
import { useLoading } from '@/context/loading';
import { Partner } from '@/types/user';
import OtpInput from '../widget/pinput';
import Link from 'next/link';

const FeaturedInfo = () => {
  const t = useTranslations('dashboard');
  const { partner, cardIndex, setCardIndex, partnerBalance, setPartnerBalance, setTransaction, setPartner } = useContext(IctContext);
  const [show, setShow] = useState<boolean>(false);
  const [transactionType, setTransactionType] = useState<number>(0);
  const [accountSettings, setAccountSettings] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });

  useEffect(() => {
    if (partnerBalance.balanceList.length === 0 && partner) {
      console.log('called = ' + partner?.profileId)
      balanceAction.run(partner?.profileId);
    }
  }, [partnerBalance, partner]);

  const balanceAction = useRequest(authService.getBalance, {
    manual: true,
    onSuccess: async (data) => {
      setPartnerBalance(data);
    },
    onError: (e) => {
      setAlert({ show: true, message: e.message });
    }
  });

  const changeCardIndex = (index: number) => {
    setTransaction({ code: 0, info: "", result: [], offset: 0, limit: 0, total: 0, paging: { count: 0, start: 0, size: 0, maxPage: 0 } });
    setCardIndex(index);
  }

  const toggle = () => {
    const state = show;
    setShow(!state);
  };

  const closeNotification = () => {
    setAlert({ show: false, message: "" });
  };

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
            <Card className="p-3 mb-10" style={{ backgroundColor: '#8089AC', color: '#fff', height: "86px", }} onClick={() => changeCardIndex(0)}>
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
                  <Col key={index} md={12} className="mb-3" onClick={() => { changeCardIndex(index); }}>
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
                                <span style={{ fontSize: 16, maxLines: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
  const { setLoading } = useLoading();
  const { partner, cardIndex, partnerBalance, setPartnerBalance, setPartner } = useContext(IctContext);
  const [showPaymentPassword, setShowPaymentPassword] = useState<boolean>(false);
  const [phoneDeActive, setPhoneDeActive] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [response, setResponse] = useState({ success: false, info: "" });
  const [otp1, setOtp1] = useState(new Array(4).fill(""));
  const [changePhoneRequired, setChangePhoneRequired] = useState<boolean>(false);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(partnerBalance?.balanceList[index]?.nickName ?? "");
    setPhone(partner.phone);
    if(partner.phone===undefined){
      setIsChecked(true);
    }
  }, [partnerBalance]);

  useEffect(() => {
    if (changePhoneRequired) {
      phoneInputRef.current?.focus();
    }
  }, [changePhoneRequired]);

  const converHidePhone = (val: string) => {
    return val?.length > 4
      ? val?.substring(0, 2) + '***' + val?.substring(5)
      : val;
  }

  const changeCheckSwitch = (val: boolean) => {
    if (val) {
      setPhoneDeActive(true);
    }
    // messageGet.run(!isChecked ? partner?.verifiedPhone : "")
  };

  const messageGet = useRequest(authService.messageGet, {
    onBefore: () => {
      setLoading(true);
    },
    manual: true,
    onSuccess: async (data) => {
      setPartner({ ...partner, phone: data.result.phone });
      setPhone(data.result.phone);
      setLoading(false);
      setIsChecked(!isChecked);
    },
    onError: (e) => {
      setLoading(false);
      setShow(true);
      setResponse({ info: e.message, success: false });
    }
  });

  const changeNameAction = () => {
    if (name === "") return;
    changeName.run({
      nickName: name,
      accountNo: partnerBalance?.balanceList[index]?.accountNo ?? ""
    });
  }

  const changePhoneAction = () => {
    if (phoneRegex.test(phone)) {
      setShowPaymentPassword(false);
      changePhone.run("");
    } else return;
  }

  const changeName = useRequest(authService.changeName, {
    onBefore: () => {
      setLoading(true);
    },
    manual: true,
    onSuccess: async (data) => {
      setResponse({ success: true, info: data.result });
      setLoading(false);
      setShow(true);
    },
    onError: (e) => {
      setResponse({ success: false, info: e.message });
      setLoading(false);
      setAlert({ show: true, message: e.message });
    }
  });

  const changePhone = useRequest(authService.changePhone, {
    onBefore: () => {
      setLoading(true);
    },
    manual: true,
    onSuccess: async (data) => {
      setResponse({ success: true, info: data.info });
      setPartner({ ...partner, phone: data.result.phone, verifiedPhone: data.result.verifiedPhone });
      setLoading(false);
      setShow(true);
      alert(JSON.stringify(data));
    },
    onError: (e) => {
      setResponse({ success: false, info: e.message });
      setLoading(false);
      setAlert({ show: true, message: e.message });
    }
  });

  const balanceAction = useRequest(authService.getBalance, {
    manual: true,
    onBefore: () => {
      setLoading(true);
    },
    onSuccess: async (data) => {
      setPartnerBalance(data);
      setLoading(false);
    },
    onError: (e) => {
      setLoading(true);
      setAlert({ show: true, message: e.message });
    }
  });

  const closeNotification = () => {
    setAlert({ show: false, message: "" });
  };

  const handleClose = () => {
    setShow(false);
    if (response.success) {
      setResponse({ info: '', success: false });
      balanceAction.run(partner?.profileId);
    }
  };

  return (
    <>
      <div className='mb-10' >
        {cardIndex === 0 ?
          <>
            <div className="person-title mt-10" >
              <h5 style={{ fontSize: "13px", color: "#5B698E" }}>Дансны нэр</h5>
            </div>
            <div style={{ padding: '8px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <Form.Group as={Row} controlId="customSwitch">
                <Col sm={9}>
                  <Form.Control
                    maxLength={40}
                    plaintext
                    type="text"
                    name="lastname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ paddingLeft: "10px", fontSize: "13px" }}
                    className="custom-placeholder"
                  />
                </Col>
                <Col sm={3} className="d-flex justify-content-end align-items-center" style={{ color: "#4341CC" }} onClick={() => { changeNameAction() }}>
                  Хадгалах
                </Col>
              </Form.Group>
            </div>
            {phone !== "" && phone !== undefined ?
              <>
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
                        placeholder={converHidePhone(phone)}
                        style={{ paddingLeft: "10px", fontSize: "13px" }}
                        className="custom-placeholder"
                      />
                    </Col>
                    <Col sm={3} className="d-flex justify-content-end align-items-center">
                      <label className="switch">
                        <input type="checkbox" checked={isChecked} onChange={() => changeCheckSwitch(false)} />
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
                        disabled={!changePhoneRequired}
                        value={phone + "1"}
                        style={{ paddingLeft: "10px", fontSize: "13px" }}
                        className="custom-placeholder"
                        onChange={(e) => setPhone(e.target.value)}
                        ref={phoneInputRef}
                      />
                    </Col>
                    <Col sm={3} className="d-flex justify-content-end align-items-center" style={{ color: "#4341CC" }} onClick={() => { changePhoneRequired ? (phoneRegex.test(phone) ? (setShowPaymentPassword(!showPaymentPassword), setOtp1(new Array(4).fill(""))) : setAlert({ message: "Дугаар оруулна уу.", show: true })) : (setChangePhoneRequired(!changePhoneRequired)) }}>
                      {changePhoneRequired ? "Хадгалах" : "Засах"}
                    </Col>
                  </Form.Group>
                </div>
              </>
              : <>
                <div className="person-title mt-2">
                  <h5 style={{ fontSize: "13px", color: "#5B698E" }}>
                    Мессеж үйлчилгээг хаах / нээх
                  </h5>
                </div>
                <div style={{ padding: '8px', border: '1px solid #e5e5e5', borderRadius: '8px', backgroundColor: "#D1D5E433" }}>
                  <Form.Group as={Row} controlId="customSwitch" >
                    <Col sm={9}>
                      <Form.Control
                        plaintext
                        readOnly
                        disabled={true}
                        // type="text"
                        name="lastname"
                        value="Бүртгэл байхгүй"
                        style={{ paddingLeft: "10px", fontSize: "13px", color: "#5B698E80" }}
                        className="custom-placeholder"
                      />
                    </Col>
                    <Col sm={3} className="d-flex justify-content-end align-items-center">
                      <label className="switch">
                        <input type="checkbox" checked={isChecked} onChange={() => changeCheckSwitch(true)} />
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
                <div style={{ padding: '8px', border: '1px solid #e5e5e5', borderRadius: '8px', backgroundColor: "#D1D5E433" }}>
                  <Form.Group as={Row} controlId="customSwitch">
                    <Col sm={9}>
                      <Form.Control
                        plaintext
                        readOnly
                        name="lastname"
                        disabled={true}
                        value={"Бүртгэл байхгүй"}
                        style={{ paddingLeft: "10px", fontSize: "13px", color: "#5B698E80" }}
                        className="custom-placeholder"
                      />
                    </Col>
                    <Col sm={3} className="d-flex justify-content-end align-items-center" style={{ color: "#5B698E33", fontSize: "13px" }} onClick={() => { changePhoneRequired ? (phoneRegex.test(phone) ? (setShowPaymentPassword(!showPaymentPassword), setOtp1(new Array(4).fill(""))) : setAlert({ message: "Дугаар оруулна уу.", show: true })) : (setChangePhoneRequired(!changePhoneRequired)) }}>
                      Хадгалах
                    </Col>
                  </Form.Group>
                </div>
              </>
            }
          </> : <>
            <div className="person-title mt-10" >
              <h5 style={{ fontSize: "13px", color: "#5B698E" }}>Дансны нэр</h5>
            </div>
            <div style={{ padding: '8px', border: '1px solid #e5e5e5', borderRadius: '8px' }}>
              <Form.Group as={Row} controlId="customSwitch">
                <Col sm={9}>
                  <Form.Control
                    maxLength={40}
                    plaintext
                    type="text"
                    name="lastname"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ paddingLeft: "10px", fontSize: "13px" }}
                    className="custom-placeholder"
                  />
                </Col>
                <Col sm={3} className="d-flex justify-content-end align-items-center" style={{ color: "#4341CC" }} onClick={() => changeNameAction()}>
                  Хадгалах
                </Col>
              </Form.Group>
            </div>
          </>
        }
      </div >
      <Modal
        show={showPaymentPassword}
        onHide={() => setShowPaymentPassword(false)}
        dialogClassName="save-templates"
        centered
      >
        <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
          <div className="header-title">
            <h5 style={{ fontSize: "14px" }}>Гүйлгээний пин кодоо оруулна уу</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-items-center">
            <OtpInput otp={otp1} setOtp={setOtp1} />
          </div>
          <div className="d-flex justify-content-end p-0 mt-2">
            <Link style={{ fontSize: "13px", color: "#8089AC", paddingRight: "20px" }} href="/app/settings">Нууц үг сэргээх</Link>
          </div>
        </Modal.Body>
        <Modal.Footer className='mt-0 pt-0'>
          <div className="tw-single-button">
            <Button
              onClick={() => { if (otp1.join("").length === 4) { changePhoneAction() } }}
            >
              Хадгалах
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName={response.success ? 'success-modal' : 'fail-modal'}
        centered
      >
        <div className="content-inner">
          <Modal.Header>
            <div className="image">
              <div className="image-inner">
                <img
                  src={
                    response.success
                      ? '/modal-icon-success.svg'
                      : '/modal-icon-danger.svg'
                  }
                />
              </div>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="body-content">
              <div className="title">
                <h5>{response.success ? 'амжилттай' : 'амжилтгүй'}</h5>
              </div>
              <div className="desc">
                {response.success ? (
                  <p>
                    <strong
                      style={{
                        padding: '0 3px',
                        color: "#5B698E"
                      }}
                    >
                      Амжилттай солигдлоо.
                    </strong>
                  </p>
                ) : (
                  <p>
                    <strong>{response.info}</strong>
                  </p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>
              {response.success ? 'Баярлалаа' : 'Хаах'}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
      <Modal
        show={phoneDeActive}
        onHide={() => setPhoneDeActive(false)}
        dialogClassName="save-templates"
        centered
      >
        <Modal.Header closeButton className="d-flex justify-content-between align-items-center">
          <div className="header-title">
            <h5 style={{ fontSize: "14px" }}>Гүйлгээний пин кодоо оруулна уу</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
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
                <input type="checkbox" checked={isChecked} onChange={() => changeCheckSwitch(false)} />
                <span className="slider round"></span>
              </label>
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center align-items-center">
            <OtpInput otp={otp1} setOtp={setOtp1} />
          </div>
          <div className="d-flex justify-content-end p-0 mt-2">
            <Link style={{ fontSize: "13px", color: "#8089AC", paddingRight: "20px" }} href="/app/settings">Нууц үг сэргээх</Link>
          </div>
        </Modal.Body>
        <Modal.Footer className='mt-0 pt-0'>
          <div className="tw-single-button">
            <Button
              onClick={() => { if (otp1.join("").length === 4) { changePhoneAction() } }}
            >
              Хадгалах
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      {
        alerts.show && (
          <FailNotification show={alerts.show} infos={alerts.message} close={closeNotification} />
        )
      }
    </>
  )
};

export default FeaturedInfo;