interface BankProps {
    id: string,
    name: string
}

interface TransferProps {
    title: string,
    bank: TransferBank
}

interface TransferBank {
    bankName: string,
    bankAccount: string,
    amount: string,
    accountName: string,
    description: string,
    sourceAccountNo: string
}

