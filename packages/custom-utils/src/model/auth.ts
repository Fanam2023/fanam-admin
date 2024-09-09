import {IFile, IFormData} from "@fanam-pkg/core-utils"
import type {AuthenticationResponseJSON, RegistrationResponseJSON} from "@simplewebauthn/types"
import {
  IAttachment,
  ICity,
  ICountry,
  IResponseKYC,
  IState,
  TypeAccount,
  TypeBusiness,
  TypeStatus,
  TypeUserRole,
} from "../model"

export interface IResponseLogin {
  access_token: string
  refresh_token: string
}

export interface IResponseWebAuthRegistrationFinish {
  verified: boolean
  cred_id: string
}

export interface IResponseUpdateUser extends IResponseLogin {
  user: IUser
}

export interface IResponseWebAuthRegistration extends RegistrationResponseJSON {
  challenge: string
}

export interface IResponseWebAuthLogin extends AuthenticationResponseJSON {
  challenge: string
}

export interface IJwtUser {
  user_id: string
  iat: number
  exp: number
  issuer: string
  role: TypeUserRole
}

export interface ILogOutPayload {
  refresh_token: string | null
  token?: string
  device?: string
}

export interface IPayloadLogin {
  countryCode?: string
  phone_no?: string
  email?: string
  pin?: string
}

export interface IPayloadForgotPin {
  country_code?: string | ICountry
  newPin?: string
  confirmPin?: string
  phone_no?: string
}

export interface IUserBase {
  country_code?: ICountry | string
  phone_no?: string
  email?: string
  first_name?: string
  last_name?: string
  account_type?: string
  newPin?: string
  confirmPin?: string
}

export interface IUser {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  address_line_1: string
  address_line_2: string
  zip_code: string
  role?: TypeUserRole
  country: ICountry
  state: IState
  city: ICity
  id_issued_country: ICountry
  id_number: string
  id_type: string
  user_accounts: IResponseBankAccount[]
  kyc_attachments: IAttachment[]
  kyc_details: IResponseKYC[]
  status: TypeStatus
  account_type: TypeAccount
  account_no: string
}

export interface IBaseSyncUser {
  first_name: string
  last_name: string
  email?: string
  phone_no: string
  address_line_1: string
  address_line_2?: string
  zip_code: string
  id_number: string
  id_type: string
  business_type?: TypeBusiness
  kyc?: IFile[]
}

export interface ISyncUserData extends IBaseSyncUser {
  country: IFormData<number> | null
  id_issued_country: IFormData<number> | null
  state: IFormData<number> | null
  city: IFormData<number> | null
  account_type: string
  account_no: string
  business_name: string
  pan: string
  aadhaarNumber: string
}

export interface IPayloadSyncUser extends IBaseSyncUser {
  country_id: number
  id_issued_country_id: number
  state_id: number
  city_id: number
  bank_account?: IPayloadUserBankAccount
  account_no: string
  account_type: string
}

export interface IPayloadUserBankAccount {
  account_no?: string
  account_type: string
}

export interface IResponseBankAccount extends IPayloadUserBankAccount {
  account_id: string
}

export interface IBaseSignUp {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  account_type: string
  country_code?: ICountry | string
}

export interface ISignUpPin {
  newPin: string
  confirmPin: string
}

export interface ILogin {
  phone_no: string
  pin: string
}
export interface IForgotPin {
  newPin?: string
  confirmPin?: string
  phone_no?: string
}
