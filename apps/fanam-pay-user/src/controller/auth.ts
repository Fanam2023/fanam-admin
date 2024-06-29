import {API_LOGIN, API_LOGOUT, API_USER, ILogOutPayload, IPayloadLogin, IResponseLogin, IUser} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

export const useAuthController = () => {
  const {postRequest, getRequest} = useApi()
  const {updateToken, updateRefreshToken} = useSingleton()

  const login = async (payload: IPayloadLogin) => {
    const {result, errorData} = await postRequest<IResponseLogin>(API_LOGIN, payload)

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
