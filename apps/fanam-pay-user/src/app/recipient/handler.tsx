import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IRecipient} from "@custom/utils"
import {useRecipientController} from "controller"
import {CreateRecipientDetails} from "organisms"
import {QUERY_RECIPIENT, ROUTE_ADD_RECIPIENT, ROUTE_RECIPIENTS, ROUTE_REVIEW, routeToRecipientDetails} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const [currentRecipient, setCurrentRecipient] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const {getAllRecipient, createRecipient} = useRecipientController()
  const {toggleSlider} = useSlider()

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

  const {mutate} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: createRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Recipients Successfully created")
      else onFailure(errorData.message)
    },
  })

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const filteredRecipients = recipients?.filter(
    recipients =>
      recipients.recipient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipients.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onEditRecipient = (recipient: IRecipient) => {
    setCurrentRecipient(recipient)
    setIsSliderVisible(true)
  }

  const routeToDetails = (recipientId: string) => {
    const recipient = recipients.find(r => r.recipient_id === recipientId)
    if (isDesktop) {
      onEditRecipient(recipient)
    } else {
      push(routeToRecipientDetails(recipientId))
    }
  }

  const onNav = () => push(ROUTE_ADD_RECIPIENT)

  const onRouteToReview = () => push(ROUTE_REVIEW)

  const onAdd = () => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails />,
        title: "Edit Recipient Details",
      })
    } else push(ROUTE_RECIPIENTS)
  }

  return {
    isSliderVisible,
    recipients: filteredRecipients,
    onNav,
    setIsSliderVisible,
    onRouteToReview,
    onChangeSearch,
    mutate,
    currentRecipient,
    routeToDetails,
    onAdd,
  }
}
