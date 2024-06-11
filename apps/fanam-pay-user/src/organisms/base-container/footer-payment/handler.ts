import {useRouter} from "next/navigation"
import {ROUTE_PAYMENTSTATUS} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onClick = () => push(ROUTE_PAYMENTSTATUS)
  return {
    onClick,
  }
}
