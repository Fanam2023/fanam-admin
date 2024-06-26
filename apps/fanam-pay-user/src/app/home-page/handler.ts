import {IFormData, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {usePaymentController} from "controller"
import {useLocationController} from "controller/location"
import {QUERY_COUNTRIES, QUERY_EXCHANGE, ROUTE_ATTACHMENT} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const {getFxRate} = usePaymentController()
  const {refreshQuery} = useReactQuery()
  const {getByCountryId} = useLocationController()
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null)
  const [sourceAmount, setSourceAmount] = useState("")
  const [destinationAmount, setDestinationAmount] = useState("")
  const [formData, setFormData] = useState({
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

  const onAdd = () => push(ROUTE_ATTACHMENT)

  const {data} = useQuery({
    queryKey: [QUERY_COUNTRIES, selectedCountryId],
    queryFn: () => getByCountryId(selectedCountryId),
    enabled: !!selectedCountryId,
  })

  const currency = data?.currency

  const {mutate: checkFxRate} = useMutation({
    mutationKey: [QUERY_EXCHANGE],
    mutationFn: getFxRate,
    onSuccess: ({result}) => {
      refreshQuery(QUERY_EXCHANGE)
      if (result) {
        const {destination_amount} = result
        setDestinationAmount(destination_amount || "")
      }
    },
  })

  useEffect(() => {
    const parsedAmount = parseFloat(sourceAmount)
    const isValidAmount = !isNaN(parsedAmount)
    setSourceAmount(isValidAmount ? parsedAmount.toString() : "")
    setDestinationAmount(isValidAmount ? formData.destination_amount : "")
    if (isValidAmount)
      checkFxRate({
        source_currency: formData.source_currency,
        source_amount: parsedAmount.toString(),
        destination_currency: currency || "USD",
        product_code: formData.product_code,
        destination_amount: formData.destination_amount,
      })
  }, [sourceAmount, formData, currency, checkFxRate])

  const handleClick = (country_id: string) => {
    setSelectedCountryId(country_id)
    setIsSliderVisible(false)
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
    setSourceAmount,
    sourceAmount,
    destinationAmount,
    handleClick,
  }
}
