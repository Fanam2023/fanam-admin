import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"

const useAuthHandler = () => {
  const {isDesktop} = useResize()
  const {back, push} = useRouter()

  const onBack = (event: {stopPropagation: () => void}) => {
    event.stopPropagation()
    back()
  }

  return {
    isDesktop,
    onBack,
    push,
  }
}

export default useAuthHandler
