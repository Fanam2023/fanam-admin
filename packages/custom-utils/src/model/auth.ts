import {TypeUserRole} from "./enum"

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

export interface IUser {
  countryCode?: string
  mobile?: string
  name?: string
  email?: string
  imageUrl?: string
  role?: TypeUserRole
}
