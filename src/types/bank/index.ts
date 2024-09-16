// types/bank.ts
export interface Bank {
    code: string;
    nameMn: string;
    nameEn: string;
    fee: number;
    bic: string;
}

export interface BanksResponse {
    banks: Bank[];
    responseMessage: string;
    responseCode: string;
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
