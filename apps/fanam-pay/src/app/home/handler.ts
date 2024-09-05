import {useRouter} from "next/navigation"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user} = useSingleton()
  const {status, first_name} = user || {}

  return {
    status,
    first_name,
    push,
  }
}

export default useHandler
