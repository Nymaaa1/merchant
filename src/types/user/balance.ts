export interface AccountBalance {
    accountNo: string;
    balance: number;
    accountId: number;
    nickName: string;
}

export interface BalanceResult {
    balanceList: AccountBalance[];
    totalBalance: number;
}
