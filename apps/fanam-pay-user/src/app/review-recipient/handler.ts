import {useRouter} from "next/navigation"
import {ROUTE_BENEFICIARIES} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onPayment = () => push(ROUTE_BENEFICIARIES)

  return {
    onPayment,
  }
}
