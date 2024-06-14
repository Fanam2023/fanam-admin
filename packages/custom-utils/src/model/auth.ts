import {UserRole} from "./enum"

export interface IResponseLogin {
  access_token: string
  refresh_token: string
}

export interface IJwtUser {
  user_id: string
  iat: number
  exp: number
  issuer: string
  role: UserRole
}

export interface ILogOutPayload {
  refresh_token: string | null
  token?: string
  device?: string
}
