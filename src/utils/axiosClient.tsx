import axios, { AxiosRequestConfig, Method } from 'axios';
// import { message } from 'antd';
// #region [Response]
export interface BaseResponse {
  code: number
  info: string
  result: unknown
}
// #endregion

// #region [BaseRequest]
interface BaseRequestProps {
  url: string
  method: Method
  params?: unknown
  data?: unknown
  contentType?: string
}

export interface PaginatedResponse {
  data: any[]
  pagination: {
    total: number
    pageCount: number
    start: number
    end: number
    limit: number
  }
}

const catchError = (err: Error, isMe: boolean) => {
  const isLogin = window.location.pathname.startsWith('/auth/login')
  if (isMe) {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh')
    // message.warn({ content: 'Танд хандах эрх байхгүй байна. Дахин нэвтэрнэ үү' })
    if (!isLogin) window.location.replace('/auth/login')
  } else {
    return (err as any).response.data.error_msg;
    // message.warn({ content: (err as any).response.data.error_msg })
  }
}

export const BaseRequest = async (props: BaseRequestProps) => {
  const isMe = props.url === 'users/me'
  const token = localStorage.getItem('token')
  const locale = localStorage.getItem('locale') || 'mn'
  axios.defaults.headers.common.Accept = 'application/json'
  axios.defaults.headers.common['Accept-Language'] = locale || 'mn'
  axios.defaults.headers.common['Content-Type'] = props.contentType ? props.contentType : 'application/json'
  axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`
  const config: AxiosRequestConfig = {
    baseURL: `${process.env.MONPAY_API_UR}`,
    ...props,
  }
  try {
    const responseInstance = await axios(config)
    const response = responseInstance.data as BaseResponse
    if (response.code !== 200) {
      // return response.result;
    }
    return response.result;
  } catch (err: any) {
    catchError(err, isMe)
    throw err
  }
}

export const login = async (data: unknown) => {
  const response = await BaseRequest({
    url: '/partner/login',
    method: 'POST',
    data,
  })
  if (response) {
    const resType = response as { token: string; refresh: string; }
    localStorage.setItem('token', resType.token)
    localStorage.setItem('refresh', resType.refresh)
    return true
  }
  return false
}

// export const me = async () => {
//     const response = await BaseRequest({
//         url: 'users/me',
//         method: 'GET',
//     })
//     return response as SysUser
// }
// // #endregion

// // #region [Category]
// export const listCategory = async (params: any) => {
//     const response = await BaseRequest({
//         url: `/categories?page=${params.current}&limit=${params.pageSize}&sort=-createdAt`,
//         method: 'GET'
//     })

//     return response
// }

// export const createCategory = async (data: unknown) => {
//     const response = await BaseRequest({
//         url: '/categories',
//         method: 'POST',
//         data,
//     })

//     return response
// }

// export const mainCategory = async () => {
//     const response = await BaseRequest({
//         url: `/categories/main`,
//         method: 'GET'
//     })

//     return response
// }

// export const subCategory = async (id: number | 0) => {
//     const response = await BaseRequest({
//         url: `/categories/${id}/sub`,
//         method: 'GET'
//     })

//     return response
// }
// // #endregion

// // #region [Article]
// export const listNews = async (params: any) => {
//     const response = await BaseRequest({
//         url: `/articles?page=${params.current}&limit=${params.pageSize}&sort=-createdAt`,
//         method: 'GET',
//     })

//     return response
// }
