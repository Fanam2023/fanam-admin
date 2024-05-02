export type GenderType = "male" | "female" | "others" | ""

export type UserRole = "Guest" | "User" | "TempUser"

export interface IUserPayload {
  id?: string
  isBlocked?: boolean
}

export interface IUser {
  firstName?: string
  lastName?: string
  gender?: GenderType
  mailId?: string
  mobile: string
  dob?: string
  email: string
}

export interface IUserResponse extends IUserPayload, IUser {}

export interface IDeletedUser extends IUserPayload {
  user: IUser
}

export interface IDeleteUser {
  firstName?: string
  lastName?: string
  mailId?: string
  mobile: string
}

export interface IResponseLogin {
  accessToken: string
  refreshToken: string
  isUserUpdated: boolean
}

export interface ILogOutPayload {
  refreshToken: string | null
  token?: string
  device?: string
}

export interface IJwtUser {
  userId: string
  role: UserRole
  iat: number
  exp: number
  issuer: string
}

export interface IMailSubscription {
  title: string
  description: string
}
