import type {AxiosResponse, InternalAxiosRequestConfig} from "axios"

export type JSONValues = string | string[] | number | boolean | Date | File | File[]
export type JSONObject<T = JSONValues | Record<string, JSONValues>> = Record<string, T>
export interface IApiManagerData {
  baseUrl: string
  headers: JSONObject
  interceptRequest: (config: InternalAxiosRequestConfig, isNetworkError: boolean) => InternalAxiosRequestConfig
  interceptResponse: (response: AxiosResponse) => AxiosResponse
  interceptErrorResponse: (err: any) => Promise<any>
}
export interface IFanamApiResponse<R> {
  statusCode: number
  message: string
  result: R
  isEncrypted: boolean
}

export interface IFanamApiError<R> extends IFanamApiResponse<R> {
  error: string
}

// export interface IFanamResponse<D = null, M = null> {
//   data: D
//   meta: M
// }

export interface IFanamApiManager extends IApiManagerData {
  refreshToken: string | null
  refreshTokenEndpoint: string
  updateToken: (token: string) => void
  updateRefreshToken: (token: string) => void
  singOutUser: () => void
}
