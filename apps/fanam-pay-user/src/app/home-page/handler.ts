import {IFormData} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {ROUTE_ATTACHMENT} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const [senderType, setSenderType] = useState<IFormData[]>([
    {label: "Individual", isSelected: false},
    {label: "Business", isSelected: false},
  ])

  const [recipientType, setRecipientType] = useState<IFormData[]>([
    {label: "Individual", isSelected: false},
    {label: "Business", isSelected: false},
  ])

  const onSelectSenderType = (selectedItems: IFormData[]) => {
    setSenderType(selectedItems)
  }

  const onSelectRecipientType = (selectedItems: IFormData[]) => {
    setRecipientType(selectedItems)
  }

  //route to attachment-page
  const onAdd = () => push(ROUTE_ATTACHMENT)

  return {
    onAdd,
    senderType,
    recipientType,
    onSelectRecipientType,
    onSelectSenderType,
  }
}
