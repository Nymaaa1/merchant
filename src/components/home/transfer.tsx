"use client";
import authService from "@/service/api";
import { useRequest } from "ahooks";
import { ChangeEvent, FormEvent, use, useContext, useEffect, useRef, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";
import CurrencyInput from 'react-currency-input-field';
import FailNotification from "../notification/fail-notif";
import { Bank } from "@/types/bank";
import DynamicConfirm from "./dynamicConfirm";
import IctContext from "@/context/ict-context";
import Image from "next/image";
import { useLoading } from "@/context/loading";

const HomeTransaction = () => {
    const { setTransferInfo } = useContext(IctContext);
    const { setLoading, setColor } = useLoading();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //Bank to transfer
    const [sendBankAccount, setSendBankAccount] = useState<string>("");
    const [sendBankUserName, setSendBankUserName] = useState<string>("");
    const [sendBankAmount, setSendBankAmount] = useState<string>("");
    const [sendBankDescription, setSendBankDescription] = useState<string>("");
    const [confirmation, setConfirmation] = useState<boolean>(true);
    const [forDisabledBank, setForDisabledBank] = useState<boolean>(false);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [selectedBank, setSelectedBank] = useState<Bank>({
        code: "",
        nameMn: "",
        nameEn: "",
        fee: 0,
        bic: ""
    });

    //Transfer to Monpay
    const [receiverNameMonpay, setReceiverNameMonpay] = useState<string>('');
    const [forDisabledMonpay, setForDisabledMonpay] = useState<boolean>(false);
    const [sendToMonpayAmount, setSendToMonpayAmount] = useState<string>("");
    const [sendToMonpayDescription, setSendToMonpayDescription] = useState<string>("");
    const [sendToMonpayPhone, setSendToMonpayPhone] = useState<string>("");

    //Transfer to Merchant
    const [receiverNameMerchant, setReceiverNameMerchant] = useState<string>('');
    const [forDisabledMerchant, setForDisabledMerchant] = useState<boolean>(false);
    const [sendToMerchantAmount, setSendToMerchantAmount] = useState<string>("");
    const [sendToMerchantDescription, setSendToMerchantDescription] = useState<string>("");
    const [sendToMerchantPhone, setSendToMerchantPhone] = useState<string>("");

    const [validated, setValidated] = useState<boolean>(false);
    const [alerts, setAlert] = useState<Alert>({ show: false, message: "" });
    const [currentTab, setCurrentTab] = useState<string>('candy');
    const [lastChecked, setLastChecked] = useState<string>('');
    const [addAmountFund, setAddAmountFund] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDownload = (type: string) => {
        const fileUrl = `/auto-transfer/${type}.pdf`;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `monpay-${type}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        setColor("#4341CC");
        if (currentTab === "bank") {
            if (sendBankAccount?.length === 10 && sendBankAmount?.length > 0 && sendBankDescription?.length > 0 && sendBankUserName?.length > 0) {
                setForDisabledBank(true);
            } else {
                setForDisabledBank(false);
            }
        } else if (currentTab === "candy") {
            if (sendToMonpayPhone?.length === 8 && sendToMonpayAmount?.length > 0 && sendToMonpayDescription?.length > 0 && receiverNameMonpay?.length > 0) {
                setForDisabledMonpay(true);
            } else {
                setForDisabledMonpay(false);
            }
        } else if (currentTab === "merchant") {
            if (sendToMerchantPhone?.length === 11 && sendToMerchantAmount?.length > 0 && sendToMerchantDescription?.length > 0 && receiverNameMerchant?.length > 0) {
                setForDisabledMerchant(true);
            } else {
                setForDisabledMerchant(false);
            }
        }
    }, [currentTab, sendBankAccount, sendBankAmount, sendBankDescription, sendBankUserName, sendToMonpayPhone, sendToMonpayAmount, sendToMonpayDescription, receiverNameMonpay, receiverNameMerchant, sendToMerchantAmount, sendToMerchantDescription, sendToMerchantPhone]);

    useEffect(() => {
        if (selectedFile) {
            handleUpload();
        }
    }, [selectedFile]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (currentTab === "bank") {
            setTransferInfo({
                type: "bank",
                title: "Банкны данс руу шилжүүлэг",
                bank: {
                    sourceAccountNo: selectedBank?.bic,
                    accountName: sendBankUserName,
                    bankName: selectedBank?.nameMn,
                    bankAccount: sendBankAccount,
                    amount: sendBankAmount,
                    description: sendBankDescription
                }, monpay: {
                    phoneNumber: "",
                    userName: "",
                    amount: "",
                    description: ""
                },
                merchant: {
                    phoneNumber: "",
                    userName: "",
                    amount: "",
                    description: ""
                }
            });
            setConfirmation(false);
        } else if (currentTab === "candy") {
            setTransferInfo({
                type: "candy",
                title: "Monpay хэрэглэгч рүү хийх шилжүүлэг",
                bank: {
                    sourceAccountNo: "",
                    accountName: "",
                    bankName: "",
                    bankAccount: "",
                    amount: "",
                    description: ""
                },
                merchant: {
                    phoneNumber: "",
                    userName: "",
                    amount: "",
                    description: ""
                },
                monpay: {
                    phoneNumber: sendToMonpayPhone,
                    userName: receiverNameMonpay,
                    amount: sendToMonpayAmount,
                    description: sendToMonpayDescription
                }
            });
            setConfirmation(false);
        } else if (currentTab === "merchant") {
            setTransferInfo({
                type: "merchant",
                title: "Monpay мерчант данс руу шилжүүлэг",
                bank: {
                    sourceAccountNo: "",
                    accountName: "",
                    bankName: "",
                    bankAccount: "",
                    amount: "",
                    description: ""
                },
                merchant: {
                    phoneNumber: sendToMerchantPhone,
                    userName: receiverNameMerchant,
                    amount: sendToMerchantAmount,
                    description: sendToMerchantDescription
                },
                monpay: {
                    phoneNumber: "",
                    userName: "",
                    amount: "",
                    description: ""
                }
            });
            setConfirmation(false);
        }
        setValidated(true);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value = '' } = e.target;
        const parsedValue = value.replace(/[^\d.]/gi, '');
        setSendToMonpayAmount(parsedValue);
    };

    const handleChangeMerchant = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { value = '' } = e.target;
        const parsedValue = value.replace(/[^\d.]/gi, '');
        setSendToMerchantAmount(parsedValue);
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
        setSendToMonpayPhone(value?.target.value);
        if (value?.target.value.length === 8) {
            getMonpayUserName.run(value?.target.value);
        }
    };

    const handleCheckMerchant = (value: ChangeEvent<HTMLInputElement>) => {
        setSendToMerchantPhone(value?.target.value);
        if (value?.target.value.length === 11) {
            getMonpayUserName.run(value?.target.value);
        }
    };

    const getMonpayUserName = useRequest(authService.getMonpayUserName, {
        onBefore: () => {
            setLoading(true)
        },
        manual: true,
        onSuccess: async (data) => {
            if (data.result !== "NoName") {
                if (currentTab === "candy") {
                    setReceiverNameMonpay(data.result);
                } else if (currentTab === "merchant") {
                    setReceiverNameMerchant(data.result);
                }
            } else {
                setReceiverNameMonpay("");
            }
        },
        onError: (e) => {
            setReceiverNameMonpay("");
            setAlert({ show: true, message: e.message });
        },
        onFinally: () => {
            setLoading(false)
        }
    })

    const clickFunction = async (value: string) => {
        setSendBankAccount(value);
    };

    const handleTab = async (key: string) => {
        setCurrentTab(key);
        if (key == "bank") {
            setReceiverNameMerchant("");
            setReceiverNameMonpay("");
            setSendToMerchantAmount("");
            setSendToMerchantDescription("");
            setSendToMerchantPhone("");
            setSendToMonpayAmount("");
            setSendToMonpayDescription("");
            setSendToMonpayPhone("");
            if (banks.length === 0) {
                getBanks.run();
            }
        } else if (key === "candy") {
            setSendBankAmount("");
            setReceiverNameMerchant("");
            setSendToMerchantAmount("");
            setSendToMerchantDescription("");
            setSendToMerchantPhone("");
            setSendBankAccount("");
            setSendBankDescription("");
            setSendBankUserName("");
        } else if (key === "merchant") {
            setSendBankAmount("");
            setReceiverNameMonpay("");
            setSendToMonpayAmount("");
            setSendToMonpayDescription("");
            setSendToMonpayPhone("");
            setSendBankAccount("");
            setSendBankDescription("");
            setSendBankUserName("");
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

    const handleButtonClick = () => {
        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        fileInput.click();
    };


    const closeNotification = () => {
        setAlert({ show: false, message: "" });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        alert(event.target.files)
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            alert(JSON.stringify(formData));
            console.log('File to upload:', selectedFile);
        }
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
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Гүйлгээний утга
                                                                    </Form.Control.Feedback>
                                                                </InputGroup>
                                                            </div>
                                                        </div>
                                                        <div className="transfer-buttons mt-10">
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
                                                            <Form.Control
                                                                onChange={handleCheck}
                                                                required={currentTab === 'candy'}
                                                                name="phoneNumber"
                                                                type="number"
                                                                value={sendToMonpayPhone}
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
                                                            <Form.Control
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
                                                                value={receiverNameMonpay}
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
                                                                value={sendToMonpayAmount}
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
                                                            <Form.Control
                                                                required={currentTab === 'candy'}
                                                                name="description"
                                                                value={sendToMonpayDescription}
                                                                type="text"
                                                                placeholder=""
                                                                onChange={(e) => setSendToMonpayDescription(e.target.value)}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Гүйлгээний утга оруулна уу!
                                                            </Form.Control.Feedback>
                                                        </div>
                                                        <div className="transfer-buttons mt-10">
                                                            <div className="tw-single-button">
                                                                <Button
                                                                    disabled={!forDisabledMonpay}
                                                                    type="submit"
                                                                    name="transferToBank"
                                                                >
                                                                    Шилжүүлэх
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Tab>
                                                <Tab
                                                    style={{ fontSize: "13px" }}
                                                    eventKey="merchant"
                                                    title={<span style={{ fontSize: "12px" }}>Monpay мерчант руу</span>}
                                                >
                                                    <div className="content">
                                                        <div className="transfer-title">
                                                            <h5>Мерчантын дансны дугаар</h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <Form.Control
                                                                onChange={handleCheckMerchant}
                                                                required={currentTab === 'merchant'}
                                                                name="phoneNumber"
                                                                type="number"
                                                                value={sendToMerchantPhone}
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
                                                                    if (input.value.length > 11) {
                                                                        input.value = input.value.slice(0, 11);
                                                                    }
                                                                }}
                                                                onWheel={(e) => (e.target as HTMLElement).blur()}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Мерчантын дансны дугаар оруулна уу!
                                                            </Form.Control.Feedback>
                                                        </div>
                                                        <div className="transfer-title">
                                                            <h5>
                                                                Хүлээн авагчийн нэр
                                                            </h5>
                                                        </div>
                                                        <div className="input-item">
                                                            <Form.Control
                                                                style={{
                                                                    backgroundColor:
                                                                        'rgba(232, 237, 245, 0.32)',
                                                                }}
                                                                required={currentTab === 'merchant'}
                                                                name="pin"
                                                                type="text"
                                                                readOnly
                                                                disabled
                                                                placeholder=""
                                                                value={receiverNameMerchant}
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
                                                                value={sendToMerchantAmount}
                                                                placeholder=""
                                                                onChange={handleChangeMerchant}
                                                                required={currentTab === 'merchant'}
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
                                                            <Form.Control
                                                                required={currentTab === 'merchant'}
                                                                name="description"
                                                                value={sendToMerchantDescription}
                                                                type="text"
                                                                placeholder=""
                                                                onChange={(e) => setSendToMerchantDescription(e.target.value)}
                                                            />
                                                            <Form.Control.Feedback type="invalid">
                                                                Гүйлгээний утга оруулна уу!
                                                            </Form.Control.Feedback>
                                                        </div>
                                                        <div className="transfer-buttons mt-10">
                                                            <div className="tw-single-button">
                                                                <Button
                                                                    disabled={!forDisabledMerchant}
                                                                    type="submit"
                                                                    name="transferToBank"
                                                                >
                                                                    Шилжүүлэх
                                                                </Button>
                                                            </div>
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
                    <DynamicConfirm setConfirmation={setConfirmation} />
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
                                <Button variant="outline-primary" className="d-flex justify-content-center align-items-center gap-1" onClick={() => handleDownload('user')}>
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
                                <Button variant="outline-primary" className="d-flex justify-content-center align-items-center gap-1" onClick={() => handleDownload('company')}>
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
                            <div>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Button variant="primary" className="d-flex justify-content-center align-items-center mt-3 gap-2"
                                     onClick={handleButtonClick}
                                    >
                                        <Image
                                            src="/svg/table-cloud-input.svg"
                                            alt="Toggle password visibility"
                                            width={24}
                                            height={24}
                                        />
                                        Файл оруулах
                                    </Button>
                                    <Form.Control
                                        type="file"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                </Form.Group>

                            </div>
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