// "use client";
// import { BaseResponse } from "@/types";
// import { HttpMethod } from "@/types/enums";
// import auth from "./api";

// export interface IParams {
//     [key: string]: string;
// }

// export interface IHeader {
//     [key: string]: any;
// }

// export interface IBody {
//     [key: string]: any;
// }

// export interface IOption {
//     body?: IBody;
//     headers?: IHeader;
//     params?: IParams;
//     signal?: AbortSignal;
// }

// namespace httpService {
//     export const getAuthorization = () => {
//         const accessToken = auth.getToken() || "";
//         return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
//     };

//     export const setupHeaders = (hasAttachment = false) => {
//         return hasAttachment
//             ? { "Content-Type": "multipart/form-data", ...getAuthorization() }
//             : { "Content-Type": "application/json", ...getAuthorization() };
//     };

//     export const genHeader = (headers: IHeader = {}, hasAttachment?: boolean): HeadersInit => {
//         const baseHeaders = setupHeaders(hasAttachment);

//         const mergedHeaders: Record<string, string> = {
//             ...headers,
//             ...baseHeaders,
//         };

//         Object.keys(mergedHeaders).forEach((key) => {
//             if (mergedHeaders[key] === undefined) {
//                 delete mergedHeaders[key];
//             }
//         });

//         return mergedHeaders;
//     };


//     export const buildQueryString = (params: IParams = {}) => {
//         const query = new URLSearchParams(params).toString();
//         return query ? `?${query}` : "";
//     };

//     export const request = async <T>(url: string, options: RequestInit): Promise<BaseResponse<T>> => {
//         return new Promise<BaseResponse<T>>(async (resolve, reject) => {
//             await fetch(url, options)
//                 .then(async (resp) => {
//                     const data = await resp.json();
//                     if (!resp.ok) {
//                         return data;
//                     }
//                     return data;
//                 })
//                 .catch((err) => {
//                     handleError(err, reject);
//                 });
//         });
//     };

//     export const get = async <T>(url: string, options?: IOption): Promise<T> => {
//         const queryString = buildQueryString(options?.params);
//         return await request<T>(url + queryString, {
//             method: HttpMethod.GET,
//             headers: genHeader(options?.headers),
//             signal: options?.signal,
//         }).then((data) => data.result);
//     };


//     export const post = async <T>(url: string, options?: IOption, hasAttachment?: boolean): Promise<T> => {
//         return await request<T>(url, {
//             method: HttpMethod.POST,
//             headers: genHeader(options?.headers, hasAttachment),
//             body: hasAttachment ? options?.body : JSON.stringify(options?.body),
//             signal: options?.signal,
//         }).then((data) => data.result);
//     };

//     export const put = async <T>(url: string, options?: IOption): Promise<T> => {
//         return await request<T>(url, {
//             method: HttpMethod.PUT,
//             headers: genHeader(options?.headers),
//             body: JSON.stringify(options?.body),
//             signal: options?.signal,
//         }).then((data) => data.result);
//     };

//     export const del = async <T>(url: string, options?: IOption): Promise<T> => {
//         return await request<T>(url, {
//             method: HttpMethod.DELETE,
//             headers: genHeader(options?.headers),
//             body: JSON.stringify(options?.body),
//             signal: options?.signal,
//         }).then((data) => data.result);
//     };

//     export const handleError = (err: any, reject: any) => {
//         if (err instanceof Error) {
//             return reject({ message: err.message });
//         }
//         return reject({ message: "Unhandled error" });
//     };
// }

// export default httpService;
