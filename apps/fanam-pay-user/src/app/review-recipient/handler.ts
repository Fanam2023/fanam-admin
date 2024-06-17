import {useRouter} from "next/navigation"
import {ROUTE_PAYMENT} from "utils"

export const useReviewRecipientHandler = () => {
  const {push} = useRouter()
  const onPayment = () => push(ROUTE_PAYMENT)

  return {
    onPayment,
  }
}
