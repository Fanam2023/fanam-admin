import {createContext} from "react"
import {ISingleton} from "../model"

export const SingletonContext = createContext<ISingleton>({
  user: null,
  token: null,
  refreshToken: null,
  refetchTransaction: () => {},
  refetchUser: () => {},
  transData: null,
  transId: null,
  updateTransId: () => {},
  updateTransData: () => {},
  singOutUser: () => {},
  updateUserData: () => {},
  updateToken: () => {},
  updateRefreshToken: () => {},
})
