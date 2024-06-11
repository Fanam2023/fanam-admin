import {useRouter} from "next/navigation"
import {ROUTE_PAYMENT_STATUS} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onClick = () => push(ROUTE_PAYMENT_STATUS)
  return {
    onClick,
  }
}
