import {IFormData} from "@fanam-pkg/core-utils"
import {TypeUserRole} from "./enum"
import {ICountry} from "./location"

export interface IResponseLogin {
  access_token: string
  refresh_token: string
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
  email: string
}

export interface IUser {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  address_line1: string
  address_line2: string
  zip_code: string
  account_number: string
  role?: TypeUserRole
  country: ICountry
  state: string
  city: string
  account_type: string
}

export interface IBaseSyncUser {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  address_line1: string
  address_line2: string
  zip_code: string
  account_number: string
  id_type: string
}

export interface ISyncUserData extends IBaseSyncUser {
  country: IFormData | null
  id_issued_country: IFormData | null
  state: IFormData | null
  city: IFormData | null
  account_type: IFormData[]
}

export interface IPayloadSyncUser extends IBaseSyncUser {
  country_code: string
  id_issued_country: string
  state: string
  city: string
  account_type: string
}
