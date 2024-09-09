import {IFormData, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useRecipientController, useTransactionController} from "controller"
import {CreateRecipientDetails} from "organisms"
import {
  QUERY_RECIPIENT,
  QUERY_TRANSACTION,
  ROUTE_ADD_RECIPIENT,
  ROUTE_INVOICE,
  ROUTE_RECIPIENT_PREVIEW,
  routeToRecipientDetails,
} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {getAllRecipient} = useRecipientController()
  const {initiateTransaction} = useTransactionController()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Individual")
  const TYPE: IFormData[] = [
    {label: "Individual", isSelected: selectedType === "Individual"},
    {label: "Business", isSelected: selectedType === "Business"},
  ]

  const onChangeType = (type: string) => {
    setSelectedType(type)
  }

  const {data: recipients} = useQuery({
    queryKey: [QUERY_RECIPIENT.concat(selectedType)],
    queryFn: () => getAllRecipient(selectedType),
  })

  const {mutate: linkRecipient} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: initiateTransaction,
    onSuccess: ({result}) => {
      if (result) push(ROUTE_RECIPIENT_PREVIEW)
    },
  })

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const filteredRecipients = recipients?.filter(
    ({first_name, last_name, email}) =>
      first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onAdd = () => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails />,
        title: "Add Recipient Details",
      })
    } else push(ROUTE_ADD_RECIPIENT)
  }

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

  const onBack = () => push(ROUTE_INVOICE)

  return {
    TYPE,
    isDesktop,
    recipients: filteredRecipients,
    searchQuery,
    onChangeSearch,
    routeToDetails,
    onAdd,
    onBack,
    linkRecipient,
    onChangeType,
  }
}
