import {useStorage} from "@fanam-pkg/core-utils"
import {
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser"
import type {PublicKeyCredentialCreationOptionsJSON} from "@simplewebauthn/types"
import {
  API_FORGOTPIN,
  API_GET_PROFILE,
  API_LOGIN,
  API_LOGIN_FINISH,
  API_LOGOUT,
  API_REGISTER_FINISH,
  API_REGISTER_START,
  API_SENDER_KYC,
  API_SIGNUP,
  API_SYNC_USER,
  apiLoginStart,
  IFanamApiError,
  ILogOutPayload,
  IPayloadForgotPin,
  IPayloadLogin,
  IPayloadSyncUser,
  IResponseLogin,
  IResponseUpdateUser,
  IResponseWebAuthLogin,
  IResponseWebAuthRegistration,
  IResponseWebAuthRegistrationFinish,
  IUser,
  IUserBase,
} from "@custom/utils"
import {useSingleton} from "hooks"
import {LS_WEBAUTHN_CRED_ID} from "utils"
import {useApi} from "./api"

export const useAuthController = () => {
  const {postRequest, getRequest, putRequest} = useApi()
  const {updateToken, updateRefreshToken, updateUserData} = useSingleton()
  const {getStorage, setStorage} = useStorage()

  const login = async (payload: IPayloadLogin) => {
    const {result, errorData} = await postRequest<IResponseLogin>(API_LOGIN, payload)

    if (result) {
      const {access_token, refresh_token} = result

      updateToken(access_token)
      updateRefreshToken(refresh_token)

      /* If user enters Username and pin and trying to login */
      await registerWebAuth()
    }
    return {result, errorData}
  }

  const forgotPin = async (payload: IPayloadForgotPin) => {
    const {result, errorData} = await putRequest<IResponseLogin>(API_FORGOTPIN, payload)
    if (result) {
      const {access_token, refresh_token} = result

      updateToken(access_token)
      updateRefreshToken(refresh_token)

      /* If user enters Username and pin and trying to login */
      await registerWebAuth()
    }

    return {result, errorData}
  }

  const loginWebAuth = async () => {
    let response: {result: IResponseLogin | null; errorData: IFanamApiError<IResponseLogin> | null} = {
      result: null,
      errorData: null,
    }

    try {
      const credentialId = getStorage(LS_WEBAUTHN_CRED_ID, true)
      const isAuthenticatorAvailable =
        (await platformAuthenticatorIsAvailable()) && browserSupportsWebAuthn && !!credentialId
      /* Fetch @simple-web's authentication options from server */
      if (isAuthenticatorAvailable) {
        const {result: loginStart, errorData} = await getRequest<IResponseWebAuthLogin, IFanamApiError<IResponseLogin>>(
          apiLoginStart(credentialId)
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
      }
    } catch (error) {
      // ERROR_CEREMONY_ABORTED - AbortError
      response.errorData.message = error?.message || "Something went wrong"
    }

    return response
  }

  const getUser = async () => {
    const {result} = await getRequest<IUser>(API_GET_PROFILE)
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

  const signUp = async (payload: IUserBase) => {
    const {result, errorData} = await postRequest<IResponseUpdateUser>(API_SIGNUP, payload)

    if (result) {
      const {access_token, refresh_token, user} = result
      updateToken(access_token)
      updateRefreshToken(refresh_token)
      updateUserData(user)

      /* If user enters Username and pin and trying to login */
      await registerWebAuth()
    }

    return {result, errorData}
  }

  const registerWebAuth = async () => {
    let response: {result: IResponseUpdateUser | null; errorData: IFanamApiError<IResponseUpdateUser> | null} = {
      result: null,
      errorData: null,
    }

    try {
      /* Create User */
      const isAuthenticatorAvailable = (await platformAuthenticatorIsAvailable()) && browserSupportsWebAuthn

      if (isAuthenticatorAvailable) {
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
          const {errorData, result: finishResult} = await postRequest<
            IResponseWebAuthRegistrationFinish,
            IResponseWebAuthRegistration,
            IFanamApiError<IResponseUpdateUser>
          >(API_REGISTER_FINISH, {...attestation, challenge})

          if (finishResult.verified) {
            setStorage(LS_WEBAUTHN_CRED_ID, finishResult.cred_id, true)
          } else response.errorData = errorData
        } else response.errorData = errorData
      }
    } catch (error) {
      // ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY - NotAllowedError
      // ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED - InvalidStateError
      if (error.code === "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED") {
        loginWebAuth()
      }

      response.errorData.message = error?.message || "Something went wrong"
    }

    return response
  }

  return {
    login,
    loginWebAuth,
    forgotPin,
    getUser,
    logout,
    syncUser,
    signUp,
    registerWebAuth,
  }
}
