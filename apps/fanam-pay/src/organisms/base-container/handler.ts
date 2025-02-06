import {useResize} from "@fanam-pkg/core-utils"
import {useTranslation} from "react-i18next"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useCommon} from "hooks"

export const useHandler = () => {
  const {back} = useRouter()
  const {getFirstLetter} = useCommon()
  const {isDesktop} = useResize()
  const [sideNav, setSideNav] = useState(false)
  const {t} = useTranslation()

  const goBack = () => {
    if (back) back()
  }

  return {
    isDesktop,
    goBack,
    getFirstLetter,
    sideNav,
    setSideNav,
    t,
  }
}
