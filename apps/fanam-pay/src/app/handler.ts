import {useRouter} from "next/navigation"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user} = useSingleton()
  const {status, first_name, kyc_details = [], address_line_1} = user || {}

  const isKYCVerified =
    status === "Active" && kyc_details.length && kyc_details.every(({is_verified}) => is_verified) && address_line_1

  return {
    status,
    first_name,
    push,
    isKYCVerified,
  }
}

export default useHandler
