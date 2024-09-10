// types/bank.ts
export interface Bank {
    code: string;
    nameMn: string;
    nameEn: string;
    fee: number;
    ibankCode: string;
}

export interface BanksResponse {
    banks: Bank[];
}


export interface Transaction {
    date: string;
    transactionType: "SELLCOMMERCEDELIVERY" | "SELLCOMMERCE" | "FEE" | "SELL";
    amount: number;
    accountNo: string;
    description: string;
    coopAccountName: string;
    coopAccountNo: string;
}
