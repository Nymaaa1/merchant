export interface BranchBalanceResult {
    id: number;
    transactionId: number;
    transactionNo: string;
    date: string;
    transactionType: string;
    amount: number;
    balance: number;
    balanceOld: number;
    accountNo: string;
    accountId: number;
    deviceType: string;
    deviceValue: string;
    coopAccountNo: string;
    coopAccountId: number;
    coopDeviceType: string;
    coopDeviceValue: string;
    coopProfileId: number;
    coopAccountName: string;
    coopBranchName: string;
    branchName: string;
    description: string;
    channel: string;
    branchId: number;
    accountName: string;
}

export interface BranchBalance {
    accountNo: string;
    ibanAccount: string;
    accountId: number;
    balance: number;
    balanceDate: string;
    journal: BranchBalanceResult;
}

export interface TransactionDto {
    id: number;
    transactionId: number;
    transactionNo: string;
    date: string;
    transactionType: string;
    amount: number;
    balance: number;
    balanceOld: number;
    accountNo: string;
    accountId: number;
    deviceType: string;
    deviceValue: string;
    coopAccountNo: string;
    coopAccountId: number;
    coopDeviceType: string;
    coopDeviceValue: string;
    coopAccountName: string;
    branchName: string;
    description: string;
    channel: string;
    branchId: number;
    accountName: string;
}

export interface TransactionBranchListResponse {
    code: number;
    info: string;
    result: TransactionDto[];
    offset: number;
    limit: number;
    total: number;
    paging: TransactionPagination;
}

export interface TransactionPagination {
    count: number;
    start: number;
    size: number;
    maxPage: number;
}

export interface ChangePasswordBranchModel {
    credentialOld: string;
    credentialNew: string;
}