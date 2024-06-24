import {IFormData} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useCountryController} from "controller/country"
import {QUERY_COUNTRY, ROUTE_ATTACHMENT} from "utils"

export const useHandler = (country_id: string | null) => {
  const {push} = useRouter()
  const {getByCountryId} = useCountryController()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
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

  const {data} = useQuery({
    queryKey: [QUERY_COUNTRY, country_id],
    queryFn: () => getByCountryId(country_id),
    enabled: !!country_id,
  })

  return {
    onAdd,
    senderType,
    recipientType,
    onSelectRecipientType,
    onSelectSenderType,
    isSliderVisible,
    setIsSliderVisible,
    data,
  }
}
