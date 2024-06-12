import {useRouter} from "next/navigation"
import {ROUTE_PAYMENT} from "utils"

export const useReviewRecipient = () => {
  const {push} = useRouter()
  const onPayment = () => push(ROUTE_PAYMENT)

  return {
    onPayment,
  }
}
