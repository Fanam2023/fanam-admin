import {IUser} from "./auth"

export interface IPayloadPan {
  pan: string
}

export interface IPanResult {
  verification: string
  id: string
  message: string
  traceId: string
}

export interface IResponsePan {
  user: IUser
  result: IPanResult
}

export interface IPayloadRegenerateCaptcha {
  kyc_id: string
}

export interface IPayloadGenerateAadhaarOTP {
  kyc_id: string
  aadhaarNumber: string
  captchaCode: string
}

export interface IPayloadVerifyAadhaarOTP {
  kyc_id: string
  aadhaarNumber: string
  otp: string
}

export interface IPayloadVerifyGST {
  gstin: string
}
