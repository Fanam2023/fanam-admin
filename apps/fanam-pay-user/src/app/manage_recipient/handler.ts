import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {RECIPIENT_LIST, ROUTE_ADD_RECEPIENT, ROUTE_REVIEW} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const onNav = () => push(ROUTE_ADD_RECEPIENT)

  const onRouteToReview = () => push(ROUTE_REVIEW)

  const [isSliderVisible, setIsSliderVisible] = useState(false)

  const recipients = useMemo(
    () => RECIPIENT_LIST.map(({name, accountNumber}) => ({title: name, description: accountNumber})),
    [RECIPIENT_LIST]
  )

  return {
    recipients,
    onNav,
    isSliderVisible,
    setIsSliderVisible,
    onRouteToReview,
  }
}
