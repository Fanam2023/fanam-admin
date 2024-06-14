import {useAPIManager, useJWT} from "@fanam-pkg/core-utils"
import type {AxiosInstance} from "axios"
import axios from "axios"
import {IFanamApiError, IFanamApiManager, IFanamApiResponse, IJwtUser, IResponseLogin, JSONObject} from "../model"

export const useFanamApi = ({
  refreshToken,
  baseUrl,
  headers = {},
  refreshTokenEndpoint,
  updateToken,
  singOutUser,
  updateRefreshToken,
  interceptRequest,
  interceptErrorResponse,
  interceptResponse,
}: IFanamApiManager) => {
  const {decodeJwtToken} = useJWT()
  const {apiInstance, getRequest, postRequest, putRequest, deleteRequest} = useAPIManager({
    baseUrl: baseUrl,
    headers: headers,
    interceptRequest: interceptRequest,
    interceptResponse: interceptResponse,
    interceptErrorResponse: async err => {
      const {status} = err?.response || {}
      if (status === 401) {
        try {
          if (refreshToken) {
            const {role} = decodeJwtToken(refreshToken) as IJwtUser
            const response = await axios.post(
              `${baseUrl}${refreshTokenEndpoint}`,
              {},
              {headers: {Authorization: `Bearer ${refreshToken}`, role}}
            )
            const apiResult = response.data?.result
            if (apiResult) {
              const {access_token, refresh_token} = apiResult as IResponseLogin
              updateToken(access_token)
              updateRefreshToken(refresh_token)
              err.config.headers["Authorization"] = `Bearer ${access_token}`

              return await apiInstance.request(err.config)
            } else {
              singOutUser()
              return interceptErrorResponse(Promise.reject(response))
            }
          } else {
            singOutUser()
            return interceptErrorResponse(Promise.reject(err))
          }
        } catch (error) {
          console.error(">>>>>>>>>>>>>>> ERROR while refreshing the token: ", error)
          singOutUser()
          return interceptErrorResponse(Promise.reject(error))
        }
      } else if (status === 420) singOutUser()
      return interceptErrorResponse(Promise.reject(err))
    },
  })

  const getApi = async <R = JSONObject, E = IFanamApiError<R>>(url: string, headers?: JSONObject) => {
    const response = await getRequest<IFanamApiResponse<R>, E>(url, headers)

    return {result: response?.data?.result, ...response}
  }

  const postApi = async <R = JSONObject, P = {}, E = IFanamApiError<R>>(url: string, data: P, headers?: JSONObject) => {
    const response = await postRequest<IFanamApiResponse<R>, P, E>(url, data, headers)
    return {result: response?.data?.result, ...response}
  }

  const putApi = async <R = JSONObject, P = {}, E = IFanamApiError<R>>(url: string, data: P, headers?: JSONObject) => {
    const response = await putRequest<IFanamApiResponse<R>, P, E>(url, data, headers)

    return {result: response?.data?.result, ...response}
  }

  const deleteApi = async <R = JSONObject, P = {}, E = IFanamApiError<R>>(
    url: string,
    data?: P,
    headers?: JSONObject
  ) => {
    const response = await deleteRequest<IFanamApiResponse<R>, P, E>(url, data, headers)

    return {result: response?.data?.result, ...response}
  }

  return {
    apiInstance: apiInstance as AxiosInstance,
    getRequest: getApi,
    postRequest: postApi,
    putRequest: putApi,
    deleteRequest: deleteApi,
  }
}
