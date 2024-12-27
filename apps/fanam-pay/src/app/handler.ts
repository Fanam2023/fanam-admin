import {useCookies, useDateTime} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect} from "react"
import {useMutation} from "@tanstack/react-query"
import {useHomeController} from "controller"
import {useCommon, useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user, bankName: bank_name, updateToken, updateRefreshToken} = useSingleton()
  const {getClientToken, getClientId} = useHomeController()
  const {getCookie} = useCookies()
  const {dayjs} = useDateTime()
  const searchParams = useSearchParams()
  const currentHour = dayjs().hour()
  const cookieState = getCookie("state")
  const {AZURE_BASE_URL} = useCommon()
  const bankName = searchParams.get("bank_name")

  //get client token api
  const {mutate: fetchClientToken} = useMutation({
    mutationKey: ["bank-token"],
    mutationFn: getClientToken,
    onSuccess: result => {
      if (result) {
        const {refresh_token, access_token} = result
        updateToken(access_token)
        updateRefreshToken(refresh_token)
      }
    },
  })

  //get clientid clientsecert api
  const {mutate: fetchClientId} = useMutation({
    mutationKey: ["bank"],
    mutationFn: getClientId,
  })

  useEffect(() => {
    const authCode = searchParams.get("authCode")
    const state = searchParams.get("state")
    if (bankName) {
      fetchClientId(bankName)
    } else if (authCode && state === cookieState) {
      fetchClientToken({
        bank_name: bank_name,
        bankcode_string: authCode,
      })
      const cssUrl = `${AZURE_BASE_URL}index.css`
      const linkCss = document.createElement("link")
      linkCss.rel = "stylesheet"
      linkCss.href = cssUrl
      document.head.appendChild(linkCss)
      const manifestUrl = `${AZURE_BASE_URL}manifest.json`
      const linkManifest = document.createElement("link")
      linkManifest.rel = "manifest"
      linkManifest.href = manifestUrl
      document.head.appendChild(linkManifest)
    }
  }, [bankName])

  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return "Good Morning"
    if (currentHour >= 12 && currentHour < 17) return "Good Afternoon"
    if (currentHour >= 17 && currentHour < 21) return "Good Evening"
    return "Good Night"
  }

  const greeting = getGreeting()

  const {status, first_name, kyc_details = [], address_line_1} = user || {}

  const isKYCVerified =
    status === "Active" && kyc_details.length && kyc_details.every(({is_verified}) => is_verified) && address_line_1

  return {
    status,
    first_name,
    isKYCVerified,
    greeting,
    push,
  }
}

export default useHandler
