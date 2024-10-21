import { IFile, IFormData } from "@fanam-pkg/core-utils"
import type { AuthenticationResponseJSON, RegistrationResponseJSON } from "@simplewebauthn/types"
import {
  ICity,
  ICountry,
  IResponseKYC,
  IState,
  TypeAccount,
  TypeBusiness,
  TypeBusinessKYC,
  TypeKYC,
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
  refreshToken: string | null
  token?: string
  device?: string
}

export interface IPayloadLogin {
  countryCode?: string
  phone_no?: string
  email?: string
  pin?: string
}

export interface IBaseForgotPin {
  newPin?: string
  confirmPin?: string
  phone_no?: string
}

export interface IForgotPinData extends IBaseForgotPin {
  country?: ICountry
}

export interface IPayloadForgotPin extends IBaseForgotPin {
  country_id?: number
}

export interface IBaseSignup {
  phone_no?: string
  email?: string
  business_name?: string
  first_name?: string
  last_name?: string
  newPin?: string
  confirmPin?: string
}

export interface ISignupData extends IBaseSignup {
  account_type: IFormData<TypeAccount>
  country?: ICountry | null
}

export interface IPayloadSignup extends IBaseSignup {
  country_id: number
  account_type?: TypeAccount
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
  kyc_details: IResponseKYC[]
  status: TypeStatus
  account_type: TypeAccount
  account_no: string
  date_of_birth: string
  business_type: string
  business_name: TypeBusiness
}

export interface IBaseSyncUser {
  first_name: string
  last_name: string
  email?: string
  phone_no: string
  // account_no: string
  address_line_1: string
  address_line_2?: string
  zip_code: string
  kyc_aadhaar?: IFile[]
  kyc_pan?: IFile[]
}

export interface IPayloadBusinessKYC {
  id_number: string
  id_type: TypeKYC | IFormData<TypeKYC>
  kyc: IFile[] | null
  kyc_id?: string
  kyc_type?: TypeBusinessKYC
}

export interface ISyncUserData extends IBaseSyncUser {
  business_name: string
  pan: string
  aadhaarNumber: string
  date_of_birth: string
  country: IFormData<number> | null
  state: IFormData<number> | null
  city: IFormData<number> | null
  account_type: IFormData<TypeAccount>
  business_type?: IFormData<TypeBusiness> | null
  identity_proof?: IPayloadBusinessKYC
  address_proof?: IPayloadBusinessKYC
  authority_proof?: IPayloadBusinessKYC
  business_proof?: IPayloadBusinessKYC
  partners_proof?: IPayloadBusinessKYC[]
}

export interface IPayloadSyncUser extends IBaseSyncUser {
  country_id: number
  state_id: number
  city_id: number
  account_type: TypeAccount
  date_of_birth?: string
  bank_account?: IPayloadUserBankAccount
  business_proofs?: IPayloadBusinessKYC[]
  business_type?: TypeBusiness
  business_name?:string
}

export interface IPayloadUserBankAccount {
  account_no?: string
  account_type: string
}

export interface IResponseBankAccount extends IPayloadUserBankAccount {
  account_id: string
}

// export interface IBaseSignUp {
//   first_name: string
//   last_name: string
//   business_name?: string
//   email: string
//   phone_no: string
//   account_type: IFormData<TypeAccount>
//   country_id?: ICountry | number
// }

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
