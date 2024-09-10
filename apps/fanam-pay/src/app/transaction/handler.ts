import {useRouter} from "next/navigation"
import {ROUTE_BENEFICIARIES} from "utils"

export const useHandler = () => {
  const {push} = useRouter()

  const onBack = () => push(ROUTE_BENEFICIARIES)

  return {
    onBack,
  }
}
