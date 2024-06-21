import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useRecipientController} from "controller"
import {QUERY_RECIPIENT, ROUTE_ADD_RECEPIENT, ROUTE_REVIEW} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const {getAllRecipient} = useRecipientController()
  const [searchQuery, setSearchQuery] = useState("")

  const {data: recipients} = useQuery({
    queryKey: [QUERY_RECIPIENT],
    queryFn: getAllRecipient,
  })

  const onNav = () => push(ROUTE_ADD_RECEPIENT)

  const onRouteToReview = () => push(ROUTE_REVIEW)

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const recipientList = useMemo(
    () =>
      recipients
        ?.filter(({recipient_name}) => recipient_name.toLowerCase().includes(searchQuery.toLowerCase()))
        ?.map(({recipient_name, email}) => ({title: recipient_name, description: email})),
    [recipients, searchQuery]
  )

  return {
    isSliderVisible,
    recipientList,
    onNav,
    setIsSliderVisible,
    onRouteToReview,
    onChangeSearch,
  }
}
