import {useRouter} from "next/navigation"
import {ROUTE_BENEFICIARIES, ROUTE_PAYMENT_STATUS} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onSuccess = () => push(ROUTE_PAYMENT_STATUS)

  const onBack = () => push(ROUTE_BENEFICIARIES)

  return {
    onSuccess,
    onBack,
  }
}
