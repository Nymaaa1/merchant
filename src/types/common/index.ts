interface Alert {
    show: boolean;
    message: string;
}


type ReponseProps = {
    success: boolean;
    message: string;
    info: string;
}

interface DefaultResponse {
    code: number;
    info: string;
    result: string;
}

interface DatePickerModel {
    offset: number;
    limit: number;
    pagingStart: number;
    maxPage: number;
    beginDate: string;
    endDate: string;
}

interface ContractsExcel {
    "№": number,
    "ГҮЙЛГЭЭНИЙ НЭР": string,
    "ТӨЛӨВ": string,
    "ДҮН": number,
    "ХАРИЛЦСАН ДАНС": string,
    "ОН, САР, ӨДӨР": string,
}

interface EmailBody {
    type: string | null;
    name: string;
    phone: string;
    email: string;
}


interface NameChangeBody {
    nickName: string;
    accountNo: string;
}