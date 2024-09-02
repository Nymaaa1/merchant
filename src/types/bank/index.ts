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
