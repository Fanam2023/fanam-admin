import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useRecipientController, useTransactionController} from "controller"
import {CreateRecipientDetails} from "organisms"
import {ACCOUNT_TYPE, QUERY_RECIPIENT, QUERY_TRANSACTION, ROUTE_RECIPIENT_PREVIEW} from "utils"

export const useHandler = () => {
  const {push, back} = useRouter()
  const {toggleSlider} = useSlider()
  const {getAllRecipient} = useRecipientController()
  const {initiateTransaction} = useTransactionController()
  const [searchQuery, setSearchQuery] = useState("")
  const [selIndex, setSelIndex] = useState(0)

  const selectType = ACCOUNT_TYPE[selIndex].key

  const {data: recipients} = useQuery({
    queryKey: [QUERY_RECIPIENT.concat(selectType)],
    queryFn: () => getAllRecipient(selectType),
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
    toggleSlider({
      children: <CreateRecipientDetails />,
      title: "Add Recipient Details",
    })
  }

  const routeToDetails = (recipient_id: string) => {
    toggleSlider({
      children: <CreateRecipientDetails recipient_id={recipient_id} />,
      title: "Edit Recipient Details",
    })
  }

  const onBack = () => back()

  return {
    recipients: filteredRecipients,
    searchQuery,
    selIndex,
    onChangeSearch,
    routeToDetails,
    onAdd,
    onBack,
    linkRecipient,
    setSelIndex,
  }
}
