import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"

const useAuthHandler = () => {
  const {isDesktop} = useResize()
  const {back, push} = useRouter()

  return {
    isDesktop,
    back,
    push,
  }
}

export default useAuthHandler
