import {createContext} from "react"
import {ISingleton} from "../model"

export const SingletonContext = createContext<ISingleton>({
  user: null,
  token: null,
  refreshToken: null,
  isEditor: false,
  isSuperAdmin: false,
  isValidator: false,
  singOutUser: () => {},
  updateUserData: () => {},
  updateToken: () => {},
  updateRefreshToken: () => {},
})
