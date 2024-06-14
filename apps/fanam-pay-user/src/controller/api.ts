import {useCookies} from "@fanam-pkg/core-utils"
import type {AxiosInstance} from "axios"
import "@custom/utils"
import {useSingleton} from "hooks"
import {COOKIE_ACCESS_TOKEN} from "../utils"

export const useApi = () => {
  const {getCookie} = useCookies()
  const {singOutUser, refreshToken, updateRefreshToken, updateToken} = useSingleton()
  const {getRequest, postRequest, putRequest, deleteRequest, apiInstance} = useCaterApi({
    refreshToken,
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
    headers: {},
    refreshTokenEndpoint: API_REFRESH_TOKEN,
    updateToken,
    singOutUser,
    updateRefreshToken,
    interceptRequest: config => {
      try {
        const accessToken = getCookie(COOKIE_ACCESS_TOKEN)
        if (!config.headers.has("Authorization")) {
          config.headers.set("Authorization", `Bearer ${accessToken}`)
        }
      } catch (error) {
        console.error(">>>>>>>>>>>>>>>>>> interceptRequest Errors", config, error)
      }
      return config
    },
    interceptErrorResponse: response => response,
    interceptResponse: error => error,
  })

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    apiInstance: apiInstance as AxiosInstance,
  }
}
