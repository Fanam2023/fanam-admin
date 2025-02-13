export interface IPayloadLogin {
  userName: string
  password: string
}

export interface IResponseLogin {
  accessToken: string
  refreshToken: string
}

export interface ILogOutPayload {
  refreshToken: string | null
  token?: string
  device?: string
}
