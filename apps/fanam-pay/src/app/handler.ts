import {useCookies, useDateTime} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect} from "react"
import {useMutation} from "@tanstack/react-query"
import {useHomeController} from "controller"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user, updateToken, updateRefreshToken} = useSingleton()
  const {getClientToken, getClientId} = useHomeController()
  const {getCookie} = useCookies()
  const {dayjs} = useDateTime()
  const searchParams = useSearchParams()
  const currentHour = dayjs().hour()
  const cookieState = getCookie("state")

  const {mutate: fetchClientToken} = useMutation({
    mutationKey: ["bank-token"],
    mutationFn: getClientToken,
    // onSuccess: result => {
    //   if (result) {
    //     const {refresh_token, access_token} = result
    //     updateToken(access_token)
    //     updateRefreshToken(refresh_token)
    //   }
    // },
  })

  const {mutate: fetchClientId} = useMutation({
    mutationKey: ["bank"],
    mutationFn: getClientId,
  })

  useEffect(() => {
    const authCode = searchParams.get("authCode")
    const state = searchParams.get("state")
    const bankName = searchParams.get("bank_name")
    if (bankName) {
      fetchClientId(bankName)
    } else if (authCode && state === cookieState) {
      fetchClientToken({
        bank_name: "Hdfc_bank",
        bankcode_string: authCode,
      })
    }
  }, [])

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
