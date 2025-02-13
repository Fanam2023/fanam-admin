import {API_ADMIN_LOGIN, API_ADMIN_LOGOUT, IResponseLogin} from "@custom/utils"
import {ILogOutPayload, IPayloadLogin} from "model"
import {useApi} from "./api"

export const useAuthController = () => {
  const {postRequest, getRequest} = useApi()

  const login = async (payload: IPayloadLogin) => {
    const {result, errorData} = await postRequest<IResponseLogin>(API_ADMIN_LOGIN, payload)
    return {result, errorData}
  }

  // const getUser = async () => {
  //   const {result, errorData} = await getRequest<IUser>(API_MY_USER, {})
  //   return {result, errorData}
  // }

  const logout = async (payload: ILogOutPayload) => {
    const {result, errorData} = await postRequest<IResponseLogin>(API_ADMIN_LOGOUT, payload)
    return {result, errorData}
  }

  return {
    login,
    // getUser,
    logout,
  }
}
