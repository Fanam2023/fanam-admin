import {IUser} from "./auth"

export interface IVerifyData {
  pan?: string
  aadhaarNumber?: string
}

export interface IPayLoadPan {
  pan: string
}

export interface IPanSuccessResult {
  verification: string
  id: string
  message: string
  traceId: string
}

export interface IPanResponse {
  user: IUser
  result: IPanSuccessResult
}
