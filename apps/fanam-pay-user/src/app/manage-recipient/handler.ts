import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useRecipientController} from "controller"
import {QUERY_RECIPIENT, RECIPIENT_LIST, ROUTE_ADD_RECEPIENT, ROUTE_REVIEW} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const {getAllRecipient} = useRecipientController()

  const {data: recipient} = useQuery({
    queryKey: [QUERY_RECIPIENT],
    queryFn: getAllRecipient,
  })

  const onNav = () => push(ROUTE_ADD_RECEPIENT)

  const onRouteToReview = () => push(ROUTE_REVIEW)

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
    recipient,
  }
}
