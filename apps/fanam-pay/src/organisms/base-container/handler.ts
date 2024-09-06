import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useCommon} from "hooks"

export const useHandler = () => {
  const {back} = useRouter()
  const {getFirstLetter} = useCommon()
  const {isDesktop} = useResize()
  const goBack = () => {
    if (back) back()
  }

  return {
    isDesktop,
    goBack,
    getFirstLetter,
  }
}
