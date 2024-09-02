import {IFile, IFormData} from "@fanam-pkg/core-utils"
import {IAttachment, ICity, ICountry, IState, TypeUserRole} from "../model"

export interface IResponseLogin {
  access_token: string
  refresh_token: string
}

export interface IResponseUpdateUser extends IResponseLogin {
  user: IUser
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
  address: string
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
}

export interface IBaseSyncUser {
  first_name: string
  last_name: string
  email?: string
  phone_no: string
  address: string
  // address_line2: string
  zip_code: string
  id_number: string
  id_type: string
  kyc?: IFile[]
}

export interface ISyncUserData extends IBaseSyncUser {
  country: IFormData | null
  id_issued_country: IFormData | null
  state: IFormData | null
  city: IFormData | null
  account_type: IFormData[]
  account_no: string
}

export interface IPayloadSyncUser extends IBaseSyncUser {
  country_id: number
  id_issued_country_id: number
  state_id: number
  city_id: number
  bank_account: IPayloadUserBankAccount
}

export interface IPayloadUserBankAccount {
  account_no?: string
  account_type: string
}

export interface IResponseBankAccount extends IPayloadUserBankAccount {
  account_id: string
}

export interface ISignUp {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  account_type: string
  newPin: string
  confirmPin: string
  country_code?: ICountry | string
}

export interface ILogin {
  phone_no: string
  pin: string
}
