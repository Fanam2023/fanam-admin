import {UserRole} from "@custom/utils"

export interface IStepper {
  title: string
  description: string
}

export interface IUser {
  countryCode?: string
  mobile?: string
  name?: string
  email?: string
  imageUrl?: string
  role?: UserRole
}

export interface ISingletonData {
  user?: IUser | null
  token: string | null
  refreshToken: string | null
}

export interface ISingleton extends ISingletonData {
  updateUserData?: (user?: IUser) => void
  updateToken: (token?: string) => void
  updateRefreshToken: (token?: string) => void
  singOutUser: () => void
  isValidator?: boolean
  isEditor?: boolean
  isSuperAdmin?: boolean
}
