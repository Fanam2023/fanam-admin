export interface IPayloadLogin {
  email: string
  password: string
}

export interface IResponseLogin {
  access_token: string
  refresh_token: string
}

export interface ILogOutPayload {
  refreshToken: string | null
  token?: string
  device?: string
}
