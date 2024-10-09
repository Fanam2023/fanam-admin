import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import {useEffect} from "react"

export const BrowserBackNavigation = () => {
  const router = useRouter()
  const {toggleNotify} = useNotifyPopup()

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname)

    const handlePopState = (event: PopStateEvent) => {
      window.history.go(1)
      toggleNotify({
        title: "Disabled",
        description: "Back navigation is disabled on this page.",
        type: "error",
      })
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [router])

  return null
}
