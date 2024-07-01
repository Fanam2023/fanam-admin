import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
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
  const [recipientId, setRecipientId] = useState<string | null>(null)
  const {getAllRecipient, createRecipient, updateRecipient, getByRecipientId} = useRecipientController()

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

  const {mutate: addRecipient} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: createRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Recipients Successfully created")
      else onFailure(errorData.message)
    },
  })

  const {mutate: onUpdate} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: updateRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Recipient Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const {data: recipient} = useQuery({
    queryKey: [QUERY_RECIPIENT],
    queryFn: () => getByRecipientId(recipientId),
  })

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const filteredRecipients = recipients?.filter(
    recipients =>
      recipients.recipient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipients.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  console.log(recipientId, "recipientId")

  const routeToDetails = (id: string) => {
    console.log("id", id)
    setRecipientId(id)
    if (isDesktop) {
      toggleSlider({
        children: (
          <CreateRecipientDetails
            onClickCreate={payload => payload && onUpdate({...payload, recipient_id: recipientId})}
            recipient={recipient}
          />
        ),
        title: "Edit Recipient Details",
      })
    } else {
      push(routeToRecipientDetails(recipientId))
    }
  }

  const onRouteToReview = () => push(ROUTE_REVIEW)

  const onAdd = () => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails onClickCreate={addRecipient} />,
        title: "Add Recipient Details",
      })
    } else push(ROUTE_RECIPIENTS)
  }

  return {
    isDesktop,
    recipients: filteredRecipients,
    onRouteToReview,
    onChangeSearch,
    addRecipient,
    routeToDetails,
    onAdd,
  }
}
