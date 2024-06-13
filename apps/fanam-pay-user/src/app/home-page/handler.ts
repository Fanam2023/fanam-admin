import {useRouter} from "next/navigation"
import {ROUTE_ATTACHMENT} from "utils"

export const useHome = () => {
  const {push} = useRouter()
  const onAdd = () => push(ROUTE_ATTACHMENT)

  return {
    onAdd,
  }
}
