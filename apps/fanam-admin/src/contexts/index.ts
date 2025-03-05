import {createContext} from "react"
import {ISingleton} from "model"

export const SingletonContext = createContext<ISingleton>({
  user: null,
  token: null,
  refreshToken: null,
  signOutUser: () => {},
  updateUserData: () => {},
  updateToken: () => {},
  updateRefreshToken: () => {},
  refetchMyUser: () => {},
})
