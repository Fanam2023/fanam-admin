import {IFormData, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {usePaymentController} from "controller"
import {useLocationController} from "controller/location"
import {QUERY_COUNTRIES, QUERY_EXCHANGE, ROUTE_ATTACHMENT} from "utils"

export const useHandler = (country_id: string | null) => {
  const {push} = useRouter()
  const {getFxRate} = usePaymentController()
  const {refreshQuery} = useReactQuery()
  const {getByCountryId} = useLocationController()
  const [sourceAmount, setSourceAmount] = useState("")
  const [destinationAmount, setDestinationAmount] = useState("")
  const [datta, setDatta] = useState({
    product_code: "BANK",
    source_currency: "INR",
    destination_currency: "",
    destination_amount: "1",
    source_amount: "",
  })
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
    queryKey: [QUERY_COUNTRIES, country_id],
    queryFn: () => getByCountryId(country_id),
    enabled: !!country_id,
  })

  const currency = data?.currency

  const {mutate: checkFxRate} = useMutation({
    mutationKey: [QUERY_EXCHANGE],
    mutationFn: getFxRate,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_EXCHANGE)
      if (result) {
        const {destination_amount} = result
        setDestinationAmount(destination_amount || "")
      }
    },
  })

  const onChangeAmount = (amount: string) => {
    const parsedAmount = parseFloat(amount)
    if (!isNaN(parsedAmount)) {
      setSourceAmount(parsedAmount.toString())
      checkFxRate({
        source_currency: datta.source_currency,
        source_amount: parsedAmount.toString(),
        destination_currency: currency || "USD",
        product_code: datta.product_code,
        destination_amount: datta.destination_amount,
      })
    } else {
      setSourceAmount("")
      setDestinationAmount("")
    }
  }

  return {
    onAdd,
    senderType,
    recipientType,
    onSelectRecipientType,
    onSelectSenderType,
    isSliderVisible,
    setIsSliderVisible,
    data,
    onChangeAmount,
    sourceAmount,
    destinationAmount,
  }
}
