import {useRouter} from "next/navigation"
import {ROUTE_BENEFICIARIES, ROUTE_TRANSACTION_STATUS} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onSuccess = () => push(ROUTE_TRANSACTION_STATUS)

  const onBack = () => push(ROUTE_BENEFICIARIES)

  return {
    onSuccess,
    onBack,
  }
}
