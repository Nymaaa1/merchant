interface Alert {
    show: boolean;
    message: string;
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