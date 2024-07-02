import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useRecipientController} from "controller"
import {CreateRecipientDetails} from "organisms"
import {QUERY_RECIPIENT, ROUTE_RECIPIENTS, ROUTE_REVIEW, routeToRecipientDetails} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const {toggleSlider} = useSlider()
  const [searchQuery, setSearchQuery] = useState("")
  const {getAllRecipient} = useRecipientController()

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Recipient added successfully",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {data: recipients} = useQuery({
    queryKey: [QUERY_RECIPIENT],
    queryFn: getAllRecipient,
  })

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const filteredRecipients = recipients?.filter(
    ({first_name, last_name, email}) =>
      first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const routeToDetails = (recipient_id: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails recipient_id={recipient_id} />,
        title: "Edit Recipient Details",
      })
    } else {
      push(routeToRecipientDetails(recipient_id))
    }
  }

  const onRouteToReview = () => push(ROUTE_REVIEW)

  const onAdd = () => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails />,
        title: "Add Recipient Details",
      })
    } else push(ROUTE_RECIPIENTS)
  }

  return {
    isDesktop,
    recipients: filteredRecipients,
    onRouteToReview,
    onChangeSearch,
    routeToDetails,
    onAdd,
  }
}
