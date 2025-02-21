import {useCookies, useDateTime} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect} from "react"
import {useMutation} from "@tanstack/react-query"
import {useHomeController} from "controller"
import {useCommon, useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  // const [data, setData] = useState({
  //   index_css_file: "",
  //   manifest_file: "",
  // })
  const {user, bankName: bank_name, updateToken, updateRefreshToken, token} = useSingleton()
  const {getClientToken, getClientId} = useHomeController()
  const {getCookie} = useCookies()
  const {dayjs} = useDateTime()
  const searchParams = useSearchParams()
  const currentHour = dayjs().hour()
  const cookieState = getCookie("state")
  const {AZURE_BASE_URL} = useCommon()

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
  // const {mutate: fetchClientId} = useMutation({
  //   mutationKey: ["bank"],
  //   mutationFn: getClientId,
  //   onSuccess: ({result, errorData}) => {
  //     if (result) {
  //       const {index_css_file, manifest_file, logo_variations} = result || {}
  //       const logo = logo_variations[2]
  //       setData({
  //         index_css_file,
  //         manifest_file,
  //       })
  //     }
  //   },
  // })

  // useEffect(() => {
  //   if (bank_name) {
  //     fetchClientId(bank_name)
  //   }

  //   const cssUrl = data.index_css_file
  //   const linkCss = document.createElement("link")
  //   linkCss.rel = "stylesheet"
  //   linkCss.href = cssUrl
  //   document.head.appendChild(linkCss)
  //   const manifestUrl = data.manifest_file
  //   const linkManifest = document.createElement("link")
  //   linkManifest.rel = "manifest"
  //   linkManifest.href = manifestUrl
  //   document.head.appendChild(linkManifest)
  // }, [bank_name, data?.index_css_file])

  useEffect(() => {
    const authCode = searchParams.get("authCode")
    if (!token) {
      fetchClientToken({
        bank_name: bank_name,
        bankcode_string: authCode,
      })
    }
  }, [token])

  // useEffect(() => {
  //   const authCode = searchParams.get("authCode")
  //   const state = searchParams.get("state")
  //   if (bankName) {
  //     fetchClientId(bankName)
  //   } else if (authCode && state === cookieState) {
  //     fetchClientToken({
  //       bank_name: bank_name,
  //       bankcode_string: authCode,
  //     })
  //     const cssUrl = `${AZURE_BASE_URL}index.css`
  //     const linkCss = document.createElement("link")
  //     linkCss.rel = "stylesheet"
  //     linkCss.href = cssUrl
  //     document.head.appendChild(linkCss)
  //     const manifestUrl = `${AZURE_BASE_URL}manifest.json`
  //     const linkManifest = document.createElement("link")
  //     linkManifest.rel = "manifest"
  //     linkManifest.href = manifestUrl
  //     document.head.appendChild(linkManifest)
  //   }
  // }, [bankName])

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
