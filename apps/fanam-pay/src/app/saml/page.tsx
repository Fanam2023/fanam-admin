"use client"

import {useCookies} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"

const Saml = () => {
  const searchParams = useSearchParams()
  const {replace} = useRouter()
  const {setCookie} = useCookies()
  const ssoUrl = searchParams.get("sso_url")

  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    redirectToLogin()
    // axios
    //   .get("http://localhost:3000/callback", {
    //     withCredentials: true,
    //   })
    //   .then(res => {
    //     if (res.data.user?.nameID) {
    //       setEmail(res.data.user.nameID)
    //     } else {
    //       redirectToLogin()
    //     }
    //   })
    //   .catch(err => {
    //     console.error("Authentication error:", err)
    //     redirectToLogin()
    //   })
  }, [])

  const redirectToLogin = () => {
    if (ssoUrl) {
      window.location.replace(ssoUrl)
    } else {
      console.error("SSO URL is missing, unable to redirect.")
    }
  }

  return (
    <section>
      <section>Processing SAML Authentication...</section>
      {email ? <p>Welcome, {email}!</p> : <p>Redirecting to SAML SSO...</p>}
    </section>
  )
}

export default Saml

// import {useSearchParams} from "next/navigation"
// import {useEffect} from "react"

// const SamlLogin = () => {
//   const searchParams = useSearchParams()
//   const ssoUrl = searchParams.get("sso_url") // SAML login URL from Okta

//   useEffect(() => {
//     if (!ssoUrl) {
//       console.error("No SSO URL provided")
//       return
//     }
//     window.location.href = ssoUrl
//   }, [ssoUrl])

//   return <p>Redirecting to SAML login...</p>
// }

// export default SamlLogin
