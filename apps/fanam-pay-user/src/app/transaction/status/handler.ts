import {useRouter} from "next/navigation"
import {ROUTE_TRANSACTION} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onBack = () => push(ROUTE_TRANSACTION)
  return {
    onBack,
  }
}
