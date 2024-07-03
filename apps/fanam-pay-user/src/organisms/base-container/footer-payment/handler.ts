import {useRouter} from "next/navigation"
import {ROUTE_TRANSACTION_STATUS} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onClick = () => push(ROUTE_TRANSACTION_STATUS)
  return {
    onClick,
  }
}
