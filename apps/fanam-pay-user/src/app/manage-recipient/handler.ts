import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useRecipientController} from "controller"
import {QUERY_RECIPIENT, ROUTE_ADD_RECEPIENT, ROUTE_REVIEW} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const {getAllRecipient} = useRecipientController()

  const {data: recipients} = useQuery({
    queryKey: [QUERY_RECIPIENT],
    queryFn: getAllRecipient,
  })

  const onNav = () => push(ROUTE_ADD_RECEPIENT)

  const onRouteToReview = () => push(ROUTE_REVIEW)

  const recipientList = useMemo(
    () => recipients?.map(({recipient_name, phone_no}) => ({title: recipient_name, description: phone_no})),
    [recipients]
  )

  return {
    onNav,
    isSliderVisible,
    setIsSliderVisible,
    onRouteToReview,
    recipientList,
  }
}
