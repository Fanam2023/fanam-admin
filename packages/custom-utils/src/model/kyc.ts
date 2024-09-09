import {IUser} from "./auth"
import {TypeOKycCode} from "./enum"

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

export interface IAadhaarCaptcha {
  captchaImage: string
  captchaRetriesRemaining: number
  id: string
  traceId: string
}

export interface IResponseAadhaarCaptcha {
  user: IUser
  captcha: IAadhaarCaptcha
}

export interface IResponseAadhaarOTP {
  code: TypeOKycCode
  message: string
  traceId: string
}

export interface IResponseAadhaarGenerateOTP {
  user: IUser
  otp: IResponseAadhaarOTP
}

export interface IResponseAadhaarVerifyOTP {
  user: IUser
  result: IResponseAadhaarComplete
}

export interface IResponseAadhaarComplete {
  status: TypeOKycCode
  aadhaar: {
    address: {
      careOf: string
      country: string
      district: string
      house: string
      landmark: string
      locality: string
      pin: string
      postOffice: string
      state: string
      street: string
      subDistrict: string
      vtc: string
    }
    dateOfBirth: string
    email: string
    gender: string
    generatedAt: string
    maskedNumber: string
    name: string
    phone: string
    photo: string
    userProfile: {
      unmaskedEmail: string
      unmaskedPhone: string
    }
    verified: {
      email: boolean
      phone: boolean
      signature: boolean
    }
    xml: {
      fileUrl: string
      validUntil: number
    }
  }
  id: string
}

export interface IPayloadGenerateAadhaarOTP {
  aadhaarNumber: string
  captchaCode: string
}

export interface IPayloadVerifyAadhaarOTP {
  aadhaarNumber: string
  otp: string
}

export interface IPayloadVerifyGST {
  gstin: string
}
