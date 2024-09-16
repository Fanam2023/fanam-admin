import {useRouter} from "next/navigation"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user} = useSingleton()
  const {status, first_name, kyc_details = []} = user || {}

  const isKYCVerified = status === "Active" && kyc_details.length && kyc_details.every(({is_verified}) => is_verified)

  return {
    status,
    first_name,
    push,
    isKYCVerified,
  }
}

export default useHandler
