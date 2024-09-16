export interface AccountBalance {
    accountNo: string;
    balance: number;
    accountId: number;
}

export interface BalanceResult {
    balanceList: AccountBalance[];
    totalBalance: number;
}
