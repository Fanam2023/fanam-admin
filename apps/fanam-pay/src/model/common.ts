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
  singOutUser: () => void
  refetchUser: () => void
  refetchTransaction: () => void
}

export interface ITransfer {
  image: string
  time: string
  charge: string
}

export interface RazorpayOptions {
  key: string
  amount: string
  currency: string
  name: string
  description: string
  image: string
  handler: (response: any) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  notes: {
    address: string
  }
  theme: {
    color: string
  }
}
