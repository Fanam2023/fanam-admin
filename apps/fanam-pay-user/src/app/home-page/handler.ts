import {IFormData, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useFxController} from "controller"
import {useCountryController} from "controller/country"
import {QUERY_COUNTRY, QUERY_CURRENCY, ROUTE_ATTACHMENT} from "utils"

export const useHandler = (
  country_id: string | null,
  onSuccess: (message: string) => void,
  onFailure: (message: string) => void
) => {
  const {push} = useRouter()
  const {createCurrency} = useFxController()
  const {refreshQuery} = useReactQuery()
  const {getByCountryId} = useCountryController()
  const [sourceAmount, setSourceAmount] = useState("")
  const [destinationAmount, setDestinationAmount] = useState("")
  const [state, setState] = useState({
    product_code: "BANK",
    source_currency: "INR",
    destination_currency: "",
    destination_amount: "1",
    source_amount: "",
  })
  console.log(">>", sourceAmount, destinationAmount)

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

  const currency = data?.currency
  console.log("currency", currency)

  const {mutate} = useMutation({
    mutationKey: [QUERY_CURRENCY],
    mutationFn: createCurrency,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_CURRENCY)
      if (result) {
        const {destination_amount} = result
        setDestinationAmount(destination_amount || "")
        console.log("sdhds", destination_amount)

        onSuccess("Successfully Converted")
      } else {
        onFailure(errorData.message)
      }
    },
  })

  const handleSourceAmountChange = (amount: string) => {
    const parsedAmount = parseFloat(amount)
    if (!isNaN(parsedAmount)) {
      setSourceAmount(parsedAmount.toString())
      if (sourceAmount)
        mutate({
          source_currency: state.source_currency,
          source_amount: parsedAmount.toString(),
          destination_currency: currency || "USD",
          product_code: state.product_code,
          destination_amount: state.destination_amount,
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
    handleSourceAmountChange,
    sourceAmount,
    destinationAmount,
  }
}
