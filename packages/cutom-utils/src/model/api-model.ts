import type {InternalAxiosRequestConfig, AxiosResponse, AxiosInstance} from "axios"

export type JSONValues = string | string[] | number | boolean | Date | File | File[]
export type JSONObject<T = JSONValues | Record<string, JSONValues>> = Record<string, T>

export interface IApiResponseData<R, E = JSONObject> {
  data?: R
  response?: AxiosResponse
  error?: JSONObject
  errorResponse?: AxiosResponse
  errorData?: E
  isNetworkError?: boolean
}

export interface IApiManagerData {
  baseUrl: string
  headers: JSONObject
  interceptRequest: (config: InternalAxiosRequestConfig, isNetworkError: boolean) => InternalAxiosRequestConfig
  interceptResponse: (response: AxiosResponse) => AxiosResponse
  interceptErrorResponse: (err: any) => Promise<any>
}

export interface IApiHook {
  apiInstance: AxiosInstance
  postRequest: <P, R, E = JSONObject>(
    endPoint: string,
    data: P,
    headers?: JSONObject
  ) => Promise<IApiResponseData<R, E>>
  getRequest: <R, E = JSONObject>(endPoint: string, headers?: JSONObject) => Promise<IApiResponseData<R, E>>
  putRequest: <P, R, E = JSONObject>(endPoint: string, data: P, headers?: JSONObject) => Promise<IApiResponseData<R, E>>
  deleteRequest: <P, R, E = JSONObject>(
    endPoint: string,
    data?: P,
    headers?: JSONObject
  ) => Promise<IApiResponseData<R, E>>
}

export interface IWnBApiResponse<R> {
  statusCode: number
  message: string
  result: R
  isEncrypted: boolean
}

export interface IWnBApiError<R> extends IWnBApiResponse<R> {
  error: string
}

export interface IWnBResponse<D = null, M = null> {
  data: D
  meta: M
}

export interface IWnbApiManager extends IApiManagerData {
  refreshToken: string | null
  refreshTokenEndpoint: string
  updateToken: (token: string) => void
  updateRefreshToken: (token: string) => void
  singOutUser: () => void
}
