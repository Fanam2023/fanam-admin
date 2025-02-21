export interface IUser {
  email: string
  password?: string
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
  signOutUser: () => void
  refetchMyUser: () => void
}

export interface IAttachment {
  fileName?: string
  attachment_id?: string
  mime?: string
  url: string
}
