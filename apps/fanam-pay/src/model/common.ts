import {ITransaction, IUser} from "@custom/utils"

export interface IStepper {
  title: string
  description: string
}

export interface ISingletonData {
  user?: IUser | null
  token: string | null
  transId: string | null
  transData: ITransaction | null
  refreshToken: string | null
}

export interface ISingleton extends ISingletonData {
  updateUserData?: (user?: IUser) => void
  updateTransData?: (transaction?: ITransaction) => void
  updateToken: (token?: string) => void
  updateTransId: (transactionId?: string) => void
  updateRefreshToken: (token?: string) => void
  signOutUser: (isSignOutFromAllDevices?: boolean) => void
  refetchUser: () => void
  resetTransaction: () => void
  refetchTransaction: () => void
  isSignOutFromAllDevices?: boolean
}

export interface IExchange {
  destination_country: string
  source_country: string
  rate: string
}
