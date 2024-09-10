export interface Partner {
    profileId: number;
    profileType: string;
    phone: string;
    verifiedPhone: string;
    email: string;
    username: string;
    name: string;
    register: string;
    partnerId: number;
    hasAccountPin: boolean;
}

export interface LoginResult {
    token: string;
    partner: Partner;
}


export interface Branch {
    accountIdMerch: number;
    branchType: string;
    phone: string;
    username: string;
    profileId: number;
    name: string;
    branchId: number;
    hasPinCode: boolean;
}
export interface BranchResponse {
    token: string;
    branch: Branch;
}
