import {
  API_LOGIN,
  API_LOGOUT,
  API_SENDER_KYC,
  API_SYNC_USER,
  API_USER,
  ILogOutPayload,
  IPayloadLogin,
  IPayloadSyncUser,
  IResponseLogin,
  IUser,
} from "@custom/utils"
import { useSingleton } from "hooks"
import { useApi } from "./api"

export const useAuthController = () => {
  const {postRequest, getRequest, putRequest} = useApi()
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
    const {result} = await getRequest<IUser>(API_USER)
    return result
  }

  const syncUser = async (payload: IPayloadSyncUser) => {
    const {kyc} = payload
    delete payload.kyc

    let {result, errorData} = await putRequest<IUser>(API_SYNC_USER, payload)

    if (kyc.length && result) {
      const formData = new FormData()
      kyc.forEach(({file}) => {
        formData.append("kyc", file)
      })

      const response = await putRequest<IUser>(API_SENDER_KYC, formData)
      result = response.result
      errorData = response.errorData
    }

    return {result, errorData}
  }

  const logout = async (payload: ILogOutPayload) => {
    const {result, errorData} = await postRequest<IResponseLogin>(API_LOGOUT, payload)
    return {result, errorData}
  }

  return {
    login,
    getUser,
    logout,
    syncUser,
  }
}
