import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useRecipientController} from "controller"
import {CreateRecipientDetails} from "organisms"
import {QUERY_RECIPIENT, ROUTE_ADD_RECIPIENT, routeToRecipientDetails} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const [searchQuery, setSearchQuery] = useState("")
  const {getAllRecipient} = useRecipientController()

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

  return {
    isDesktop,
    recipients: filteredRecipients,
    onChangeSearch,
    routeToDetails,
    onAdd,
  }
}
