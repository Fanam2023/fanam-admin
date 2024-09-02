import {startAuthentication, startRegistration} from "@simplewebauthn/browser"
import type {PublicKeyCredentialCreationOptionsJSON} from "@simplewebauthn/types"
import {
  API_LOGIN,
  API_LOGIN_FINISH,
  API_LOGIN_START,
  API_LOGOUT,
  API_REGISTER_FINISH,
  API_REGISTER_START,
  API_SENDER_KYC,
  API_SIGNUP,
  API_SYNC_USER,
  API_USER,
  IFanamApiError,
  ILogOutPayload,
  IPayloadLogin,
  IPayloadSyncUser,
  IResponseLogin,
  IResponseUpdateUser,
  IResponseWebAuthLogin,
  IResponseWebAuthRegistration,
  IUser,
  IUserBase,
} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

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

  const loginWebAuth = async () => {
    let response: {result: IResponseLogin | null; errorData: IFanamApiError<IResponseLogin> | null} = {
      result: null,
      errorData: null,
    }

    try {
      /* Fetch @simple-web's authentication options from server */
      const {result: loginStart, errorData} = await getRequest<IResponseWebAuthLogin, IFanamApiError<IResponseLogin>>(
        API_LOGIN_START
      )
      if (loginStart) {
        /* Fetch @simple-web's authentication assessment */
        const assessment = await startAuthentication(loginStart)

        const {challenge} = loginStart

        /* Complete @simple-web's login and get access-token */
        const {result: finishReg, errorData} = await postRequest<
          IResponseLogin,
          IResponseWebAuthLogin,
          IFanamApiError<IResponseLogin>
        >(API_LOGIN_FINISH, {...assessment, challenge})

        if (finishReg) {
          const {access_token, refresh_token} = finishReg

          updateToken(access_token)
          updateRefreshToken(refresh_token)
          response.result = finishReg
        } else response.errorData = errorData
      } else response.errorData = errorData
    } catch (error) {
      response.errorData.message = error?.message || "Something went wrong"
      console.error(">>>>>>>>>>>>> Failed in LoginWebAuthentication error: ", error)
    }

    return response
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

  const logout = async (payload: ILogOutPayload) => await postRequest<IResponseLogin>(API_LOGOUT, payload)

  const signUp = async (payload: IUserBase) => await postRequest<IResponseUpdateUser>(API_SIGNUP, payload)

  const signUpWebAuth = async (payload: IUserBase) => {
    let response: {result: IResponseUpdateUser | null; errorData: IFanamApiError<IResponseUpdateUser> | null} = {
      result: null,
      errorData: null,
    }

    try {
      /* Create User */
      const {result, errorData} = await postRequest<IResponseUpdateUser>(API_SIGNUP, payload)

      if (result) {
        /* Fetch @simple-web Start Registration options from Server */
        const {result: regStart, errorData} = await getRequest<
          PublicKeyCredentialCreationOptionsJSON,
          IFanamApiError<IResponseUpdateUser>
        >(API_REGISTER_START)
        if (regStart) {
          /* Fetch @simple-web's registration attestation */
          const attestation = await startRegistration(regStart)

          const {challenge} = regStart

          /* Complete @simple-web's registration and get User details and access-token */
          const {result: finishReg, errorData} = await postRequest<
            IResponseUpdateUser,
            IResponseWebAuthRegistration,
            IFanamApiError<IResponseUpdateUser>
          >(API_REGISTER_FINISH, {...attestation, challenge})

          if (finishReg) response.result = finishReg
          else response.errorData = errorData
        } else response.errorData = errorData
      } else response.errorData = errorData
    } catch (error) {
      response.errorData.message = error?.message || "Something went wrong"
      console.error(">>>>>>>>>>>>> Failed in SignupWebAuthentication error: ", error)
    }

    return response
  }

  return {
    login,
    loginWebAuth,
    getUser,
    logout,
    syncUser,
    signUp,
    signUpWebAuth,
  }
}
