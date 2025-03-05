import {useCookies, useJWT} from "@fanam-pkg/core-utils"
import type {AxiosInstance} from "axios"
import {API_REFRESH_TOKEN, useFanamApi} from "@custom/utils"
import {useSingleton} from "hooks"
import {COOKIE_ACCESS_TOKEN} from "utils"

export const useApi = () => {
  const {getCookie} = useCookies()
  const {getJwtToken} = useJWT()
  const {signOutUser, refreshToken, updateRefreshToken, updateToken} = useSingleton()
  const {getRequest, postRequest, putRequest, deleteRequest, apiInstance} = useFanamApi({
    refreshToken,
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
    headers: {},
    refreshTokenEndpoint: API_REFRESH_TOKEN,
    updateToken,
    signOutUser,
    updateRefreshToken,
    interceptRequest: config => {
      try {
        let accessToken = getCookie(COOKIE_ACCESS_TOKEN)
        if (!config.headers.has("Authorization")) {
          if (!accessToken) accessToken = getJwtToken({user_id: "GUEST-ID"})

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
