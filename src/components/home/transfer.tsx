"use client";
import authService from "@/service/api";
import { useRequest } from "ahooks";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Alert, Button, Card, Col, Form, FormControl, InputGroup, Row, Tab, Tabs } from "react-bootstrap";
import CurrencyInput from 'react-currency-input-field';
import FailNotification from "../notification/fail-notif";
import { Bank } from "@/types/bank";
import DynamicConfirm from "./dynamicConfirm";
import IctContext from "@/context/ict-context";
import Image from "next/image";

interface SelectedTemplate {
    destAccountNo: string;
    destCustomerName: string;
}

interface CamUserInfo {
    bankName: string;
    username: string;
    accountNo: string;
}


const HomeTransaction = () => {
    const { setTransferInfo } = useContext(IctContext);
    const [sendBankAccount, setSendBankAccount] = useState<string>("");
    const [sendBankUserName, setSendBankUserName] = useState<string>("");
    const [sendBankAmount, setSendBankAmount] = useState<string>("");
    const [sendBankDescription, setSendBankDescription] = useState<string>("");
    const [confirmation, setConfirmation] = useState<boolean>(true);
    const [selectedBank, setSelectedBank] = useState<Bank>({
        code: "",
        nameMn: "",
        nameEn: "",
        fee: 0,
        ibankCode: ""
    });

    const [validated, setValidated] = useState<boolean>(false);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [currentTab, setCurrentTab] = useState<string>('candy');
    const [forDisabled, setForDisabled] = useState<boolean>(false);
    const [lastChecked, setLastChecked] = useState<string>('');
    const [addAmount, setAddAmount] = useState<string>('');
    const [receiverName, setReceiverName] = useState<string>('');
    const [actionType, setActionType] = useState<string>('');
    const [banks, setBanks] = useState<Bank[]>([]);
    const [addAmountFund, setAddAmountFund] = useState<string>('');
    const [camInfoFound, setCamInfoFound] = useState<boolean>(false);
    const [addAmountBank, setAddAmountBank] = useState<string>('');
    const [forDisabledBank, setForDisabledBank] = useState<boolean>(false);

    const [camUserInfo, setCamUserInfo] = useState<CamUserInfo>({
        bankName: '',
        username: '',
        accountNo: '',
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentTab === "bank") {
            setTransferInfo({
                title: "Банкны данс руу шилжүүлэг",
                bank: {
                    sourceAccountNo: selectedBank?.ibankCode,
                    accountName: sendBankUserName,
                    bankName: selectedBank?.nameMn,
                    bankAccount: sendBankAccount,
                    amount: sendBankAmount,
                    description: sendBankDescription
                }
            });
            setConfirmation(false);
        }
        setValidated(true);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value = '' } = e.target;
        const parsedValue = value.replace(/[^\d.]/gi, '');
        setAddAmount(parsedValue);
    };

    const handleOnBlurFund = () =>
        setAddAmountFund(Number(addAmountFund).toFixed(2));

    const handleChangeFund = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value = '' } = e.target;
        const parsedValue = value.replace(/[^\d.]/gi, '');
        setAddAmountFund(parsedValue);
    };

    const handleChangeBank = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value = '' } = e.target;
        const parsedValue = value.replace(/[^\d.]/gi, '');
        setSendBankAmount(parsedValue);
    };

    const checkUsername = async (val: string) => {
        if (!val || val.length !== 8 || val === lastChecked) return null;
    };

    const handleCheck = (value: ChangeEvent<HTMLInputElement>) => {
        if (value?.target.value) {
            setForDisabled(true);
        } else {
            setForDisabled(false);
        }
    };

    const checkBankAction = async (val: string) => {
        if (sendBankAccount?.length === 10 && sendBankAmount?.length > 0 && sendBankDescription?.length > 0 && sendBankUserName?.length > 0) {
            setForDisabledBank(true)
        } else {
            setForDisabledBank(false)
        }
    };

    const clickFunction = async (value: string) => {
        setSendBankAccount(value);
    };



    const handleTab = async (key: string) => {
        setCurrentTab(key);
        if (key == "bank" && banks.length === 0) {
            getBanks.run();
        }
    };

    const getBanks = useRequest(authService.getBanks, {
        manual: true,
        onSuccess: async (data) => {
            setBanks(data.banks);
            setSelectedBank(data.banks[0]);
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const bankToTransfer = useRequest(authService.bankToTransfer, {
        manual: true,
        onSuccess: async (data) => {
        },
        onError: (e) => {
            setAlert({ show: true, message: e.message });
        }
    })

    const handleBankSelect = (selectedBankCode: string) => {
        const selectedBank = banks.find((bank) => bank.code === selectedBankCode);
        if (selectedBank) setSelectedBank(selectedBank);
    };

    const handleFundSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedType = event?.currentTarget?.value;
        setSelectedFundType(selectedType);
    };

    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    const checkCamInfo = async (identifier: string) => {
        // const body = { selectedFundType, identifier };
        // const camInfo = await getCamInfo(body);
        // if (camInfo) {
        //     setCamInfoFound(camInfo.status === 'ACCEPTED');

        //     if (camInfo.status === 'ACCEPTED') {
        //         setCamUserInfo(camInfo);
        //     } else {
        //         setCamUserInfo({
        //             bankName: '',
        //             username: '',
        //             accountNo: '',
        //         });
        //         setAlert({
        //             show: true,
        //             message: camInfo.responseMessage,
        //         });
        //     }
        // } else {
        //     setCamInfoFound(false);
        // }
    };

    return (
        <Col xs={6} className="flex-grow-1" xl={2} lg={2} style={{ paddingLeft: "20px" }} >
            <Row >
                {confirmation ?
                    <Col xl={8}>
                        <Row >
                            <div
                                style={{
                                    margin: 'auto',
                                    padding: '0',
                                }}
                                className="account"
                            >
                                <div className="deposit-tab">
                                    <div className="title">
                                        <h5>Шилжүүлэг хийх</h5>
                                    </div>
                                    <div className="deposit-tab-content">
                                        <Form
                                            noValidate
                                            validated={validated}
                                            name="candy"
                                            onSubmit={handleSubmit}
                                        >
                                            <Tabs
                                                style={{ margin: "32px" }}
                                                id="controlled-tab-example"
                                                defaultActiveKey=""
                                                activeKey={currentTab}
                                                onSelect={(e) => handleTab(e as string)}
                                                className="recent-tab"
                                            >

                                                <Tab
                                                    eventKey="bank"
                                                    title={<span style={{ fontSize: "12px" }}>Банкны данс руу</span>}
                                                >
                                                    <div className="content">
                                                        <div
                                                            style={{
                                                                paddingTop: 'unset',
                                                            }}
                                                            className="title"
                                                        >
                                                            <h5>
                                                                Хүлээн авагч банк
                                                            </h5>
                                                        </div>
                                                        <div className="bank-dropdown">
                                                            <Form.Select
                                                                aria-label="Default select example"
                                                                className="select-bank"
                                                                value={selectedBank?.code}
                                                                required={currentTab === 'bank'}
                                                                name="bankCode"
                                                                onChange={(e) => handleBankSelect(e.target.value)}
                                                            >
                                                                {banks?.map((bank, index) => {
                                                                    return (
                                                                        <option
                                                                            value={bank.code}
                                                                            className="label-item"
                                                                            key={index}
                                                                        >
                                                                            {bank.nameMn}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                            <div className="transfer-title">
                                                                <h5>
                                                                    Хүлээн авагчийн данс
                                                                </h5>
                                                            </div>
                                                            <div className="input-item">
                                                                <InputGroup hasValidation>
                                                                    <Form.Control
                                                                        required={currentTab === 'bank'}
                                                                        name="bankAccount"
                                                                        type="number"
                                                                        placeholder="Хүлээн авах дансны дугаар"
                                                                        value={sendBankAccount}
                                                                        onChange={(e) => {
                                                                            if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                                                                                clickFunction(e.target.value);
                                                                            }
                                                                        }}
                                                                        minLength={10}
                                                                        maxLength={10}
                                                                        pattern="[1-9]{1}[0-9]{7}"
                                                                        autoComplete="off"
                                                                        onBlur={(e) =>
                                                                            checkBankAction(e.target.value)
                                                                        }
                                                                        onWheel={(e) => (e.target as HTMLElement).blur()}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        bvdjvdn
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </div>
                                                            <div className="transfer-title">
                                                                <h5>
                                                                    Хүлээн авагчийн нэр
                                                                </h5>
                                                            </div>
                                                            <div className="input-item">
                                                                <InputGroup hasValidation>
                                                                    <Form.Control
                                                                        required={currentTab === 'bank'}
                                                                        name="sendBankUserName"
                                                                        type="text"
                                                                        placeholder=""
                                                                        value={sendBankUserName}
                                                                        onChange={(e) => {
                                                                            setSendBankUserName(e.target.value);
                                                                        }}
                                                                        onBlur={(e) =>
                                                                            checkBankAction(e.target.value)
                                                                        }
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Хүлээн авах дансны дугаарыг оруулна уу.
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </div>
                                                            <div className="transfer-title">
                                                                <h5>Мөнгөн дүн</h5>
                                                            </div>
                                                            <div className="input-item">
                                                                <InputGroup hasValidation>
                                                                    <CurrencyInput
                                                                        onWheel={(e) => (e.target as HTMLElement).blur()}
                                                                        name="bankAmount"
                                                                        id="bankAmount"
                                                                        data-number-stepfactor="100"
                                                                        value={sendBankAmount}
                                                                        placeholder=""
                                                                        onChange={handleChangeBank}
                                                                        required={currentTab === 'bank'}
                                                                        allowDecimals
                                                                        decimalsLimit={2}
                                                                        disableAbbreviations
                                                                        onBlur={(e) =>
                                                                            checkBankAction(e.target.value)
                                                                        }
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        cvbhdjvbd
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </div>
                                                            <div className="transfer-title">
                                                                <h5>
                                                                    Гүйлгээний утга
                                                                </h5>
                                                            </div>
                                                            <div className="input-item">
                                                                <InputGroup hasValidation>
                                                                    <Form.Control
                                                                        required={currentTab === 'bank'}
                                                                        name="bankDescription"
                                                                        type="text"
                                                                        value={sendBankDescription}
                                                                        placeholder=""
                                                                        onChange={(e) => setSendBankDescription(e.target.value)}
                                                                        onBlur={(e) =>
                                                                            checkBankAction(e.target.value)
                                                                        }
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Гүйлгээний утга
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </div>
                                                        </div>
                                                        <div className="tw-single-button">
                                                            <Button
                                                                disabled={!forDisabledBank}
                                                                type="submit"
                                                                name="transferToBank"
                                                            >
                                                                Шилжүүлэх
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab
                                                    eventKey="candy"
                                                    title={<span style={{ fontSize: "12px" }}>Monpay хэрэглэгч рүү</span>}
                                                >
                                                    <div className="content">
                                                        <div className="transfer-title">
                                                            <h5>Утасны дугаар</h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <FormControl
                                                                onChange={(e) => handleCheck(e as React.ChangeEvent<HTMLInputElement>)}
                                                                required={currentTab === 'candy'}
                                                                name="phoneNumber"
                                                                type="number"
                                                                placeholder=""
                                                                minLength={8}
                                                                maxLength={8}
                                                                pattern="[1-9]{1}[0-9]{7}"
                                                                autoComplete="off"
                                                                onBlur={(e) =>
                                                                    checkUsername(e.target.value)
                                                                }
                                                                onInput={(e) => {
                                                                    const input = e.target as HTMLInputElement;
                                                                    if (input.value.length > 8) {
                                                                        input.value = input.value.slice(0, 8);
                                                                    }
                                                                }}
                                                                onWheel={(e) => (e.target as HTMLElement).blur()}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Утасны дугаар оруулна уу!
                                                            </Form.Control.Feedback>
                                                        </div>
                                                        <div className="transfer-title">
                                                            <h5>
                                                                Хүлээн авагчийн нэр
                                                            </h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <FormControl
                                                                style={{
                                                                    backgroundColor:
                                                                        'rgba(232, 237, 245, 0.32)',
                                                                }}
                                                                required={currentTab === 'candy'}
                                                                name="pin"
                                                                type="text"
                                                                readOnly
                                                                disabled
                                                                placeholder=""
                                                                value={receiverName}
                                                            />
                                                        </div>
                                                        <div className="transfer-title">
                                                            <h5>
                                                                Шилжүүлэх дүн
                                                            </h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <CurrencyInput
                                                                onWheel={(e) => (e.target as HTMLElement).blur()}
                                                                name="amount"
                                                                id="amount"
                                                                data-number-stepfactor="100"
                                                                value={addAmount}
                                                                placeholder=""
                                                                onChange={handleChange}
                                                                required={currentTab === 'candy'}
                                                                allowDecimals
                                                                decimalsLimit={2}
                                                                disableAbbreviations
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Шилжүүлэх дүн оруулна уу!
                                                            </Form.Control.Feedback>
                                                        </div>
                                                        <div className="transfer-title">
                                                            <h5>
                                                                Гүйлгээний утга
                                                            </h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <FormControl
                                                                required={currentTab === 'candy'}
                                                                name="description"
                                                                // defaultValue={
                                                                //     transferInfo?.candy?.description
                                                                // }
                                                                type="text"
                                                                placeholder=""
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Гүйлгээний утга оруулна уу!
                                                            </Form.Control.Feedback>
                                                        </div>
                                                    </div>
                                                    <div className="transfer-buttons">
                                                        <div
                                                            className="buttons-inner"
                                                            style={{
                                                                padding: '0 32px 32px',
                                                            }}
                                                        >
                                                            <Button
                                                                disabled={!forDisabled}
                                                                type="submit"
                                                                name="invoice"
                                                                onClick={(e) => setActionType('invoice')}
                                                            >
                                                                Шилжүүлэх
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab
                                                    style={{ fontSize: "13px" }}
                                                    eventKey="fund"
                                                    title={<span style={{ fontSize: "12px" }}>Monpay мерчант руу</span>}
                                                >
                                                    <div className="content">
                                                        <Row>
                                                            <Col sm={12} lg={6}>
                                                                <div className="grid-form">
                                                                    <div className="transfer-title">
                                                                        <h5>
                                                                            cbdjvbdjv
                                                                        </h5>
                                                                    </div>
                                                                    <div className="input-item">
                                                                        <div className="bank-dropdown">
                                                                            <InputGroup hasValidation>
                                                                                <Form.Select
                                                                                    required={currentTab === 'fund'}
                                                                                    aria-label="Default select example"
                                                                                    className="select-bank"
                                                                                    defaultValue="phone"
                                                                                    name="fundType"
                                                                                    onChange={() => handleFundSelect}
                                                                                >
                                                                                    <option
                                                                                        value="phone"
                                                                                        className="label-item"
                                                                                    >
                                                                                        vbjdvbd
                                                                                    </option>
                                                                                    <option
                                                                                        value="mobile"
                                                                                        className="label-item"
                                                                                    >
                                                                                        bcdjvb
                                                                                    </option>
                                                                                    <option
                                                                                        value="email"
                                                                                        className="label-item"
                                                                                    >
                                                                                        cndvid
                                                                                    </option>
                                                                                </Form.Select>
                                                                                <Form.Control.Feedback type="invalid">
                                                                                    vbdjvbnd
                                                                                </Form.Control.Feedback>
                                                                            </InputGroup>
                                                                        </div>
                                                                    </div>
                                                                    <div className="transfer-title">
                                                                        <h5>
                                                                            bvdjvbjnd
                                                                        </h5>
                                                                    </div>
                                                                    <div className="input-item">
                                                                        <InputGroup hasValidation>
                                                                            <Form.Control
                                                                                style={{
                                                                                    backgroundColor:
                                                                                        'rgba(232, 237, 245, 0.32)',
                                                                                }}
                                                                                required={currentTab === 'fund'}
                                                                                readOnly
                                                                                name="fundBank"
                                                                                placeholder="bvjdbvjd"
                                                                                value={camUserInfo.bankName}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                vbduvbjd
                                                                            </Form.Control.Feedback>
                                                                        </InputGroup>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col sm={12} lg={6}>
                                                                <div className="grid-form">
                                                                    <div>
                                                                        <div className="transfer-title">
                                                                            <h5>
                                                                                cbjdvd
                                                                            </h5>
                                                                        </div>
                                                                        <div className="input-item">
                                                                            <InputGroup hasValidation>
                                                                                <Form.Control
                                                                                    required={currentTab === 'fund'}
                                                                                    type="text"
                                                                                    maxLength={50}
                                                                                    placeholder="cnjsvdv"
                                                                                    name="fundValue"
                                                                                    onBlur={(e) =>
                                                                                        checkCamInfo(e.target.value)
                                                                                    }
                                                                                />
                                                                                <Form.Control.Feedback type="invalid">
                                                                                    bvjdvbd
                                                                                </Form.Control.Feedback>
                                                                            </InputGroup>
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <div className="transfer-title">
                                                                            <h5>
                                                                                cbhbvd
                                                                            </h5>
                                                                        </div>
                                                                        <div className="input-item">
                                                                            <InputGroup hasValidation>
                                                                                <Form.Control
                                                                                    style={{
                                                                                        backgroundColor:
                                                                                            'rgba(232, 237, 245, 0.32)',
                                                                                    }}
                                                                                    required={currentTab === 'fund'}
                                                                                    readOnly
                                                                                    type="text"
                                                                                    name="fundAccount"
                                                                                    placeholder="cbdjvnd"
                                                                                    value={camUserInfo.accountNo}
                                                                                />
                                                                                <Form.Control.Feedback type="invalid">
                                                                                    cbjvnsd
                                                                                </Form.Control.Feedback>
                                                                            </InputGroup>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="transfer-title">
                                                            <h5>
                                                                chdvjbd
                                                            </h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <InputGroup hasValidation>
                                                                <Form.Control
                                                                    style={{
                                                                        backgroundColor:
                                                                            'rgba(232, 237, 245, 0.32)',
                                                                    }}
                                                                    required={currentTab === 'fund'}
                                                                    type="text"
                                                                    readOnly
                                                                    name="fundReceiver"
                                                                    placeholder="bdjvbdv"
                                                                    value={camUserInfo.username}
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    bvhdjvbjdv.
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="transfer-title">
                                                            <h5>cbdhjvbdv</h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <InputGroup hasValidation>
                                                                <CurrencyInput
                                                                    onWheel={(e) => (e.target as HTMLElement).blur()}
                                                                    name="fundAmount"
                                                                    id="fundAmount"
                                                                    data-number-to-fixed="2"
                                                                    data-number-stepfactor="100"
                                                                    value={addAmountFund}
                                                                    placeholder="cbjdvbjd"
                                                                    onChange={handleChangeFund}
                                                                    onBlur={handleOnBlurFund}
                                                                    required={currentTab === 'fund'}
                                                                    allowDecimals
                                                                    decimalsLimit={2}
                                                                    disableAbbreviations
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    vchdvbd.
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="transfer-title">
                                                            <h5>
                                                                vbjdvnd
                                                            </h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <InputGroup hasValidation>
                                                                <Form.Control
                                                                    required={currentTab === 'fund'}
                                                                    type="text"
                                                                    name="fundDescription"
                                                                    placeholder="cbdjvbdv"
                                                                />
                                                                <Form.Control.Feedback type="invalid">
                                                                    cbdjvnd
                                                                </Form.Control.Feedback>
                                                            </InputGroup>
                                                        </div>
                                                        <div className="tw-single-button">
                                                            <Button
                                                                type="submit"
                                                                disabled={!camInfoFound}
                                                            >
                                                                vdvbndknb
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </Tab>
                                            </Tabs>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Col> :
                    <DynamicConfirm />
                }
                <Col style={{ paddingLeft: "20px" }}>
                    <Alert variant="danger" className={`customAlert`}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/svg/transfer-warning.svg" alt="Warning" className="mr-3" />
                            <i className="bi bi-exclamation-triangle-fill me-2">Анхааруулга</i>
                        </div>
                        <hr className="my-2" style={{ borderColor: '#D1D5E4', opacity: 0.5 }} />
                        <span>
                            Нэг удаагийн гүйлгээний дээд хэмжээ 5,000,000₮ байх тул та шилжүүлэх дүнгээ таван саяас доош дүнгээр оруулна уу.
                            <br />
                            <div className="pt-4"> Хэрэв та таван саяас дээш дүнгээр гүйлгээ хийх бол хэсэгчлэн шилжүүлнэ үү.</div>
                        </span>
                    </Alert>

                    <Alert variant="danger" className="auto-transfer">
                        <i className="bi bi-exclamation-triangle-fill me-2">Авто гүйлгээ хийх үйлчилгээ</i>
                        <br />
                        <span>
                            Та авто шилжүүлэг үйлчилгээнд бүртгүүлснээр орлогоо татан төвлөрүүлэх үйлдлийг тодорхой хугацаанд тогтмол, автоматаар хийх боломжтой.
                        </span>
                        <hr className="my-2" style={{ borderColor: '#D1D5E4', opacity: 0.5 }} />
                        <div className="information">
                            Авто шилжүүлэх үйлчилгээний хуудас бөглөх
                            загвар <span>ЭНД ДАРЖ</span> үзнэ үү
                        </div>
                        <div className="auto-transfer-buttons">
                            <div className="buttons-inner">
                                <Button variant="outline-primary" className="d-flex justify-content-center align-items-center gap-1">
                                    <Image
                                        className="ml-2"
                                        src="/svg/table-cloud-output.svg"
                                        alt="Toggle password visibility"
                                        width={24}
                                        height={24}
                                    />
                                    <Col>
                                        Файл татах
                                        <br />
                                        <span>Хувь хүнээр</span>
                                    </Col>
                                </Button>
                                <Button variant="outline-primary" className="d-flex justify-content-center align-items-center gap-1">
                                    <Image
                                        className="ml-2"
                                        src="/svg/table-cloud-output.svg"
                                        alt="Toggle password visibility"
                                        width={24}
                                        height={24}
                                    />
                                    <Col>
                                        Файл татах
                                        <br />
                                        <span>Байгууллагаар</span>
                                    </Col>
                                </Button>
                            </div>
                            <Button variant="primary" className="d-flex justify-content-center align-items-center mt-3 gap-2">
                                <Image
                                    src="/svg/table-cloud-input.svg"
                                    alt="Toggle password visibility"
                                    width={24}
                                    height={24}
                                />
                                Файл оруулах
                            </Button>
                        </div>
                    </Alert>
                </Col>
            </Row >
            {alerts.show && (
                <FailNotification show={alerts.show} infos={alerts.message} close={closeNotification} />
            )}
        </Col >
    )
}

export default HomeTransaction;