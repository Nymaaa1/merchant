export interface AccountBalance {
    accountNo: string;
    balance: number;
}

export interface BalanceResult {
    balanceList: AccountBalance[];
    totalBalance: number;
}
