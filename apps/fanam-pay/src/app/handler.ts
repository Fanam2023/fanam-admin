import {useDateTime} from "@fanam-pkg/core-utils"
import {useTranslation} from "react-i18next"
import {useRouter} from "next/navigation"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user} = useSingleton()
  const {dayjs} = useDateTime()
  const {t} = useTranslation()

  const currentHour = dayjs().hour()

  const getGreeting = () => {
    if (currentHour >= 5 && currentHour < 12) return t("Good Morning")
    if (currentHour >= 12 && currentHour < 17) return t("Good Afternoon")
    if (currentHour >= 17 && currentHour < 21) return t("Good Evening")
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
    t,
  }
}

export default useHandler
