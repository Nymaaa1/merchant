import { User } from "./user";

export type Optional<T> = T | undefined | null;

export interface Base {
  uuid: string;
  created_date: Date;
  modified_date: Date;
  creator: User;
  modifier: User;
}

export interface BaseResponse<T> {
  code: number;
  info: string;
  result: T;
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
