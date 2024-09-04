import {useRouter} from "next/navigation"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {push} = useRouter()
  const {user} = useSingleton()
  const {address} = user || {}

  return {
    address,
    push,
  }
}

export default useHandler
