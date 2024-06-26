import {IFormData, JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {usePaymentController} from "controller"
import {CountryPopup} from "organisms"
import {QUERY_EXCHANGE, ROUTE_ATTACHMENT} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const {getFxRate} = usePaymentController()
  const {refreshQuery} = useReactQuery()
  const [sourceAmount, setSourceAmount] = useState("")
  const [destinationAmount, setDestinationAmount] = useState("")
  const [data, setData] = useState({
    product_code: "BANK",
    source_currency: "INR",
    destination_currency: "",
    destination_amount: "1",
    source_amount: "",
  })
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const {toggleSlider} = useSlider()
  const [senderType, setSenderType] = useState<IFormData[]>([
    {label: "Individual", isSelected: false},
    {label: "Business", isSelected: false},
  ])

  const [recipientType, setRecipientType] = useState<IFormData[]>([
    {label: "Individual", isSelected: false},
    {label: "Business", isSelected: false},
  ])

  const {source_currency, source_amount, destination_currency} = data

  const onSelectSenderType = (selectedItems: IFormData[]) => {
    const updatedLabels = selectedItems
      .map(({isSelected, label}) => (isSelected === true ? label : ""))
      .filter(label => label !== "")
      .toString()
    setSenderType(selectedItems)
    console.log(updatedLabels)
  }

  const onSelectRecipientType = (selectedItems: IFormData[]) => {
    setRecipientType(selectedItems)
  }

  //route to attachment-page
  const onAdd = () => push(ROUTE_ATTACHMENT)

  const {mutate: checkFxRate} = useMutation({
    mutationKey: [QUERY_EXCHANGE],
    mutationFn: getFxRate,
    onSuccess: ({result}) => {
      refreshQuery(QUERY_EXCHANGE)
      if (result) {
        const {destination_amount} = result
        setDestinationAmount(destination_amount)
      }
    },
  })

  const onChangeAmount = (amount: string) => {
    const parsedAmount = parseFloat(amount)
    if (!isNaN(parsedAmount)) {
      setSourceAmount(parsedAmount.toString())
      checkFxRate({
        source_currency,
        source_amount: parsedAmount.toString(),
        destination_currency,
      })
    } else {
      setSourceAmount("")
      setDestinationAmount("")
    }
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onSelectCountry = (destination_currency: string) => onChangeValue({destination_currency})

  const showCountries = () =>
    toggleSlider({children: <CountryPopup onSelect={onSelectCountry} selCurrency={destination_currency} />})

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
    showCountries,
    onChangeValue,
  }
}
