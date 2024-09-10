import { Transaction } from "./bank";


export type Optional<T> = T | undefined | null;

export interface BaseResponse<T> {
  code: number;
  info: string;
  result: T;
}

export interface TransactionListResponse {
  code: number;
  info: string;
  result: Transaction[];
  offset: number;
  limit: number;
  total: number;
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

export interface DeleteConfirm {
  confirm: string;
}

export type SuccessResponse = { success: boolean };

export type SortDirection = "ASC" | "DESC";
