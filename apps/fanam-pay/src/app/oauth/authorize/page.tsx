"use client"

import {useCookies} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect} from "react"

const Oauth = () => {
  const searchParams = useSearchParams()
  const {replace} = useRouter()
  const {setCookie} = useCookies()
  useEffect(() => {
    const grantType = searchParams.get("grant_type")
    const redirectUri = searchParams.get("redirect_uri")
    const clientId = searchParams.get("client_id")
    const clientSecret = searchParams.get("client_secret")
    const scope = searchParams.get("scope")
    const state = searchParams.get("state")
    setCookie("state", state)
    if (grantType !== "client_credentials") {
      alert("Invalid grant type")
    }
    // if (redirectUri !== "redirect_uri") {
    //   alert("Invalid redirect_uri")
    // }
    // if (clientId !== "client_id") {
    //   alert("Invalid client_id")
    // }
    // if (clientSecret !== "client_secret") {
    //   alert("Invalid client_secret")
    // }
    // if (scope !== "scope") {
    //   alert("Invalid scope")
    // }
    else {
      setTimeout(() => {
        const authCode = crypto.randomUUID()
        replace(`${redirectUri}?authCode=${authCode}&state=${state}`)
      }, 3000)
    }
  }, [])
  return <h1>Processing...</h1>
}

export default Oauth
