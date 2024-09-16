interface BankProps {
    id: string,
    name: string
}

interface TransferProps {
    type: string,
    title: string,
    bank: TransferBank,
    monpay: TransferMonpay,
    merchant: TransferMerchant
}

interface TransferMerchant {
    phoneNumber: string,
    userName: string,
    amount: string,
    description: string,
}

interface TransferBank {
    bankName: string,
    bankAccount: string,
    amount: string,
    accountName: string,
    description: string,
    sourceAccountNo: string
}

interface TransferMonpay {
    phoneNumber: string,
    userName: string,
    amount: string,
    description: string,
}

