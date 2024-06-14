import {API_LOGIN, API_LOGOUT, API_USER, ILogOutPayload, IResponseLogin} from "@custom/utils"
import {useSingleton} from "hooks"
import {IUser} from "model"
import {useApi} from "./api"

export const useAuthController = () => {
  const {postRequest, getRequest} = useApi()
  const {updateToken, updateRefreshToken} = useSingleton()

  const login = async () => {
    const {result, errorData} = await postRequest<IResponseLogin>(API_LOGIN, {})

    if (result) {
      const {access_token, refresh_token} = result

      updateToken(access_token)
      updateRefreshToken(refresh_token)
    }
    return {result, errorData}
  }

  const getUser = async () => {
    const {result} = await getRequest<IUser>(API_USER, {})
    return result
  }

  const logout = async (payload: ILogOutPayload) => {
    const {result, errorData} = await postRequest<IResponseLogin>(API_LOGOUT, payload)
    return {result, errorData}
  }

  return {
    login,
    getUser,
    logout,
  }
}
