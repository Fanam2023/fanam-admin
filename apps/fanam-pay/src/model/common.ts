import {ITransaction, IUser, TypeSignOut} from "@custom/utils"

export interface IStepper {
  title: string
  description: string
}

export interface IBankDetails {
  index_css_file: string
  manifest_file: string
  logoVariantons: string
  background_color: string
  accent_color: string
}

export interface ISingletonData {
  user?: IUser | null
  token: string | null
  transId: string | null
  transData: ITransaction | null
  refreshToken: string | null
  bankName: string | null
  bankDetails: IBankDetails | null
}

export interface ISingleton extends ISingletonData {
  updateUserData?: (user?: IUser) => void
  updateTransData?: (transaction?: ITransaction) => void
  updateToken: (token?: string) => void
  updateTransId: (transactionId?: string) => void
  updateRefreshToken: (token?: string) => void
  signOutUser: (action?: TypeSignOut) => void
  refetchUser: () => void
  resetTransaction: () => void
  refetchTransaction: () => void
  updateBankName: (bankName: string) => void
}

export interface IExchange {
  destination_country: string
  source_country: string
  rate: string
}
