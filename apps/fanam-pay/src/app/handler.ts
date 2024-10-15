import {useRouter} from "next/navigation"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user} = useSingleton()

  const currentHour = new Date().getHours()

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
