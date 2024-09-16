"use client";

import { LoginResult } from "@/types/user";
import Cookies from "js-cookie";
import { BaseListResponse, BaseResponse, GraphicAgeResponse, TransactionListResponse } from "@/types";
import { BalanceResult } from "@/types/user/balance";
import { BanksResponse } from "@/types/bank";
import { DistrictGraphicResponse, GenderGraphicResponse, SalesGraphic, SalesPartnerGraphic } from "@/types/demo";
import { TransactionBranchListResponse } from "@/types/branch";
export const tokenKey = "partnerToken";

class ApiError extends Error {
    public status: number;
    public data: any;

    constructor(message: string, status: number, data: any) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}

namespace authService {

    export const hasToken = () => !!Cookies.get(tokenKey);

    export const getToken = () => Cookies.get(tokenKey);

    export const getPartner = () => Cookies.get("partner");

    export const remToken = () => Cookies.remove(tokenKey);

    export const remoPartner = () => Cookies.remove("partner");

    export const setPartner = (partner: string, token: string) => {
        localStorage.setItem('partner', partner);
        Cookies.set(tokenKey, token, { expires: 12 });
        localStorage.setItem(tokenKey, token);
        Cookies.set("partner", partner);
        localStorage.setItem("partnerRole", "partner");
    };

    export const getBalance = async (profileId: number): Promise<BalanceResult> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/account/balance', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "profileId": profileId })
                });
                const data: BaseResponse<BalanceResult> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data.result);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getRecent = async (profileId: number, params: DatePickerModel): Promise<TransactionListResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/recent', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "profileId": profileId })
                });
                const data: TransactionListResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const profileChangePassword = async (password: string, passwordOld: string): Promise<DefaultResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/password', {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "password": password, "passwordOld": passwordOld })
                });
                const data: DefaultResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getBanks = async (): Promise<BanksResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/bank', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getToken()}`, }
                });
                const data: BaseResponse<BanksResponse> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data.result);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const bankToTransfer = async (srcAccountNo: string, bankName: string, bankAccount: string, bankAccountName: string, amount: string, description: string, pin: string): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/bank/transfer', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({
                        srcAccountNo: srcAccountNo,
                        bankName: bankName,
                        bankAccount: bankAccount,
                        bankAccountName: bankAccountName,
                        amount: amount,
                        description: description,
                        pin: pin,
                    }),
                });
                const data: BaseResponse<any> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data.result);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const login = (body: LoginRequestBody): Promise<BaseResponse<LoginResult>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                const data: BaseResponse<LoginResult> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getPasswordOtp = (body: LoginPasswordRecover): Promise<BaseResponse<LoginPasswordRecoverResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/password/otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                const data: BaseResponse<LoginPasswordRecoverResponse> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const postPasswordOtp = (body: PostPasswordRecover): Promise<BaseResponse<PostPasswordRecoverResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/password/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                const data: BaseResponse<PostPasswordRecoverResponse> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const changePassword = (body: ChangePasswordModel): Promise<BaseResponse<PostPasswordRecoverResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/password/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                const data: BaseResponse<PostPasswordRecoverResponse> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getMonpayUserName = async (phoneNumber: string): Promise<DefaultResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/transfer/getMonpayUserName', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "phoneNumber": phoneNumber })
                });
                const data: DefaultResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getGraphicAge = async (): Promise<GraphicAgeResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/demo/age', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                });
                const data: GraphicAgeResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getGraphicDistrict = async (): Promise<DistrictGraphicResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/demo/district', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                });
                const data: DistrictGraphicResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getGraphicGender = async (): Promise<GenderGraphicResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/demo/gender', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                });
                const data: GenderGraphicResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getGraphicBriefinfo = async (): Promise<BaseResponse<SalesGraphic>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/demo/sales', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                });
                const data: BaseResponse<SalesGraphic> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getGraphicSales = async (type: string): Promise<BaseResponse<SalesPartnerGraphic[]>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/demo/salespartner', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "type": type })
                });
                const data: BaseResponse<SalesPartnerGraphic[]> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getBranchTableData = async (accountId: number, params: DatePickerModel): Promise<TransactionBranchListResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/merchant', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "accountId": accountId, "beginDate": params.beginDate, "endDate": params.endDate, "pagingStart": params.pagingStart })
                });
                const data: TransactionBranchListResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };


    export const getPartnerDetialTransaction = async (accountId: number, params: DatePickerModel): Promise<TransactionBranchListResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/recent/partner', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "accountId": accountId, "beginDate": params.beginDate, "endDate": params.endDate, "pagingStart": params.pagingStart })
                });
                const data: TransactionBranchListResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const getOTPCode = async (): Promise<DefaultResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/transfer/otp', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                });
                const data: DefaultResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const postOTPCode = async (pinCode: string): Promise<BaseResponse<PostPasswordRecoverResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/transfer/otp', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "otpValue": pinCode })
                });
                const data: BaseResponse<PostPasswordRecoverResponse> = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const transferToMonpay = async (body: TransferToMonpayModel): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/transfer/monpay', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify(body)
                });
                const data = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const changePinCode = async (body: ChangePinCodeModel): Promise<DefaultResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/password/pinchange', {
                    method: 'PUT',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify(body)
                });
                const data: DefaultResponse = await response.json();
                if (!response.ok) {
                    reject(new ApiError(data.info, response.status, data));
                } else {
                    resolve(data);
                }
            } catch (error) {
                if (error instanceof ApiError) {
                    console.error(`API Error [${error.status}]: ${error.message}`, error.data);
                } else {
                    console.error('Unexpected Error:', error);
                }
                reject(error);
            }
        });
    };

    export const handleError = (err: any, reject: any) => {
        if (err instanceof Error) {
            return reject({ message: err.message });
        }
        return reject({ message: "Unhandled error" });
    };

}

export default authService;
