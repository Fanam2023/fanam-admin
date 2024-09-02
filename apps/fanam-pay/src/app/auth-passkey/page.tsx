"use client"

import {startAuthentication, startRegistration} from "@simplewebauthn/browser"
import {useState} from "react"
import axios from "axios"
import styles from "./page.module.sass"

export const API_START_PASSKEY = "http://192.168.208.48:3000/auth/register-start"
export const API_COMPLETE_VERIFY = "http://192.168.208.48:3000/auth/register-finish"
export const API_LOGIN_START = "http://192.168.208.48:3000/auth/login-start"
export const API_LOGIN_COMPLETE = "http://192.168.208.48:3000/auth/login-finish"

const AuthPasskey = () => {
  /* This is not required Backend team will store it while implementing */
  const [registrationInfo, setRegistrationInfo] = useState()

  const onRegister = async () => {
    try {
      const {data: startResponse} = await axios.get(API_START_PASSKEY)

      console.log(">>>>>>>>>>>> startResponse: ", startResponse)

      if (startResponse) {
        const attestation = await startRegistration(startResponse)

        console.log(">>>>>>>>>>>> attestation: ", attestation)

        const {challenge} = startResponse

        const finishResponse = await axios.post(API_COMPLETE_VERIFY, {...attestation, challenge})
        setRegistrationInfo(finishResponse?.data?.res?.registrationInfo)
        if (finishResponse.data) alert("Registration done successfully")
        console.log(">>>>>>>>>>>> finishResponse: ", finishResponse)
      }
    } catch (error) {
      console.error(">>>>>>>>>>>>> onRegister error: ", error)
    }
  }

  const onAuthenticate = async () => {
    try {
      console.log(">>>>>>>>>>>> registrationInfo: ", registrationInfo)

      if (registrationInfo) {
        /* This request to be changed as GET while implement */
        const {data: startResponse} = await axios.post(API_LOGIN_START, [registrationInfo])

        console.log(">>>>>>>>>>>> startResponse: ", startResponse)

        if (startResponse) {
          const assessRes = await startAuthentication(startResponse)

          console.log(">>>>>>>>>>>> assessRes: ", assessRes)

          const {challenge} = startResponse
          const {credentialPublicKey, credentialID} = registrationInfo

          const finishResponse = await axios.post(API_LOGIN_COMPLETE, {
            ...assessRes,
            challenge,
            credentialID,
            credentialPublicKey,
          })

          if (finishResponse.data) alert("Logged in successfully")

          console.log(">>>>>>>>>>>> finishResponse: ", finishResponse)
        }
      }
    } catch (error) {
      console.error(">>>>>>>>>>>>> onAuthenticate error: ", error)
    }
  }

  return (
    <section className={styles.page_container}>
      <button onClick={onRegister}>Start Registration</button>
      {!!registrationInfo && <button onClick={onAuthenticate}>Start Authentication</button>}
    </section>
  )
}

export default AuthPasskey
