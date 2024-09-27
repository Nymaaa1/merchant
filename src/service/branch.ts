"use client";

import { BranchResponse } from "@/types/user";
import Cookies from "js-cookie";
import { BaseResponse } from "@/types";
import { BanksResponse } from "@/types/bank";
import { BranchBalance, ChangePasswordBranchModel, TransactionBranchListResponse } from "@/types/branch";
export const tokenKey = "branchToken";

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


namespace authBranchService {

    //token
    export const hasBranchToken = () => !!Cookies.get(tokenKey);

    export const getBranchToken = () => Cookies.get(tokenKey);

    export const remBranchToken = () => Cookies.remove(tokenKey);

    export const setBranchToken = (token: string) => {
        Cookies.set(tokenKey, token, { expires: 1 });
    };

    export const getBanks = async (): Promise<BanksResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/bank', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getBranchToken()}`, }
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

    export const getBalance = async (accountId: number): Promise<BranchBalance> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/account', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getBranchToken()}`, },
                    body: JSON.stringify({ "profileId": accountId })
                });
                const data: BaseResponse<BranchBalance> = await response.json();
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

    export const login = (body: LoginRequestBody): Promise<BaseResponse<BranchResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });
                const data: BaseResponse<BranchResponse> = await response.json();
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
                const response = await fetch('/api/branch/password', {
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

    export const getRecent = async (accountId: number, params: DatePickerModel): Promise<TransactionBranchListResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/journal', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getBranchToken()}`, },
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

    export const postPasswordOtp = (body: PostPasswordRecover): Promise<BaseResponse<PostPasswordRecoverResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/password/token', {
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

    export const changePassword = (body: any): Promise<BaseResponse<PostPasswordRecoverResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/password/new', {
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

    export const changePasswordSettingsBranch = (body: ChangePasswordBranchModel): Promise<DefaultResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/password/change', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${getBranchToken()}`,
                    },
                    body: JSON.stringify(body),
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


    export const getHelpList = async (): Promise<HelpResponse> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/help', {
                    method: 'GET'
                });
                const data: HelpResponse = await response.json();
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

    export const getUserInfo = async (): Promise<BaseResponse<BranchResponse>> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch('/api/branch/info', {
                    headers: {
                        Authorization: `Bearer ${getBranchToken()}`,
                    },
                    method: 'GET'
                });
                const data: BaseResponse<BranchResponse> = await response.json();
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

export default authBranchService;
