"use client";

import { LoginResult } from "@/types/user";
import Cookies from "js-cookie";
import { BaseResponse } from "@/types";
import { BalanceResult } from "@/types/user/balance";
import { BanksResponse } from "@/types/bank";
export const tokenKey = "token";

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
        localStorage.setItem('token', token);
        Cookies.set("partner", partner);
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

    export const getRecent = async (profileId: number): Promise<RecentBody> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/recent', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getToken()}`, },
                    body: JSON.stringify({ "profileId": profileId })
                });
                const data: BaseResponse<RecentBody> = await response.json();
                alert(JSON.stringify(data));
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

    export const getBanks = async (): Promise<BanksResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/bank', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getToken()}`, }
                });
                const data: BaseResponse<BanksResponse> = await response.json();
                alert(JSON.stringify(data));
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
                alert(JSON.stringify(data));
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
                const response = await fetch('/api/password/otp', {
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

    export const handleError = (err: any, reject: any) => {
        if (err instanceof Error) {
            return reject({ message: err.message });
        }
        return reject({ message: "Unhandled error" });
    };

}

export default authService;
