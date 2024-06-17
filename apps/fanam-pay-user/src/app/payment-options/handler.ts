import {useRouter} from "next/navigation"
import {ROUTE_PAYMENT_STATUS} from "utils"

export const usePaymentHandler = () => {
  const {push} = useRouter()
  const onSuccess = () => push(ROUTE_PAYMENT_STATUS)

  return {
    onSuccess,
  }
}
