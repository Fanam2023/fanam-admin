"use client"

import {useCookies} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"
import axios from "axios"

const Saml = () => {
  const searchParams = useSearchParams()
  const {replace} = useRouter()
  const {setCookie} = useCookies()
  const [email, setEmail] = useState<string>("deepikad@cannydigit.com")
  useEffect(() => {
    console.log("checking authentication by calling /me")

    axios
      .get("http://localhost:3000", {
        withCredentials: true,
      })
      .then(res => {
        console.log(res.data.user, "/me")

        /**
         * if user has no nameID it means that he is not authenticated yet!
         * redirect to login for Okta auth
         */
        if (res.data.user.nameID) {
          setEmail(res.data.user.nameID)
        } else {
          // redirectToLogin()
        }
      })
      .catch(err => {
        console.log(err)
        // redirectToLogin()
      })
  }, [])

  useEffect(() => {
    const grantType = searchParams.get("grant_type")
    const redirectUri = searchParams.get("redirect_uri")
    const state = searchParams.get("state")
    setCookie("state", state)
    if (grantType !== "client_credentials") {
      alert("Invalid grant type")
    } else {
      setTimeout(() => {
        const authCode = crypto.randomUUID()
        replace(`${redirectUri}?authCode=${authCode}&state=${state}`)
      }, 3000)
    }
  }, [])

  // Redirect to login
  const redirectToLogin = () => {
    window.location.replace("https://dev-93877242.okta.com/app/dev-93877242_fanampay_1/exknh06kev42wsJgB5d7/sso/saml")
  }
  return (
    <section>
      <section>Processing...</section>
    </section>
  )
}

export default Saml
