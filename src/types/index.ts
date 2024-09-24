import { Transaction } from "./bank";
import { TransactionPagination } from "./branch";
import { AgeCount } from "./demo";


export type Optional<T> = T | undefined | null;

export interface BaseResponse<T> {
  code: number;
  info: string;
  result: T;
}


export interface BaseListResponse<T> {
  code: number;
  info: string;
  result: T[];
}

export interface TransactionListResponse {
  code: number;
  info: string;
  result: Transaction[];
  offset: number;
  limit: number;
  total: number;
  paging: TransactionPagination;
}


export interface GraphicAgeResponse {
  code: number;
  info: string;
  result: AgeCount[];
}

export interface FileResponse {
  uuid: string;
}

export interface PaginationResponse<T> {
  total: number;
  page: number;
  size: number;
  data: Array<T>;
}

export interface ChangePhoneResponse {
  verifiedPhone: string;
  phone: string;
}

export interface DeleteConfirm {
  confirm: string;
}

export interface Banner {
  imageUrl: string;
}

export interface BannerResponse {
  code: string;
  intCode: number;
  info: string;
  result: Banner[];
}


export type SuccessResponse = { success: boolean };

export type SortDirection = "ASC" | "DESC";

