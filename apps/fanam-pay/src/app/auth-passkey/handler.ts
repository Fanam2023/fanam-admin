import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {startAuthentication, startRegistration} from "@simplewebauthn/browser"
import {useEffect, useState} from "react"
import axios from "axios"
import {useAuthController} from "controller"

export const API_REGISTER_START = "http://192.168.208.48:3000/auth/register-start"
export const API_REGISTER_FINISH = "http://192.168.208.48:3000/auth/register-finish"
export const API_AUTHENTICATION_START = "http://192.168.208.48:3000/auth/login-start"
export const API_AUTHENTICATION_FINISH = "http://192.168.208.48:3000/auth/login-finish"

export const useHandler = () => {
  const {toggleNotify} = useNotifyPopup()
  const {registerWebAuth} = useAuthController()

  /* This is not required Backend team will store it while implementing */
  const [registrationInfo, setRegistrationInfo] = useState()

  useEffect(() => {
    registerWebAuth()
  }, [])

  const onRegister = async () => {
    try {
      const {data: startResponse} = await axios.get(API_REGISTER_START)

      if (startResponse) {
        const attestation = await startRegistration(startResponse)

        const {challenge} = startResponse

        const finishResponse = await axios.post(API_REGISTER_FINISH, {...attestation, challenge})
        setRegistrationInfo(finishResponse?.data?.res?.registrationInfo)
        if (finishResponse.data)
          toggleNotify({
            title: "Registration done successfully",
            type: "success",
          })
      }
    } catch (error) {
      console.error(">>>>>>>>>>>>> onRegister error: ", error)
    }
  }

  const onAuthenticate = async () => {
    try {
      if (registrationInfo) {
        /* This request to be changed as GET while implement */
        const {data: startResponse} = await axios.post(API_AUTHENTICATION_START, [registrationInfo])

        if (startResponse) {
          const assessRes = await startAuthentication(startResponse)

          const {challenge} = startResponse
          const {credentialPublicKey, credentialID} = registrationInfo

          const finishResponse = await axios.post(API_AUTHENTICATION_FINISH, {
            ...assessRes,
            challenge,
            credentialID,
            credentialPublicKey,
          })

          if (finishResponse.data)
            toggleNotify({
              title: "Logged in successfully",
              type: "success",
            })
        }
      }
    } catch (error) {
      console.error(">>>>>>>>>>>>> onAuthenticate error: ", error)
    }
  }

  return {
    registrationInfo,
    onAuthenticate,
    onRegister,
  }
}
