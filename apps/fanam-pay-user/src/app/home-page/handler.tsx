import {IFormData, JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {ICountry, ITransactionData} from "@custom/utils"
import {usePaymentController} from "controller"
import {CountryPopup} from "organisms"
import {
  DEFAULT_DESTINATION_COUNTRY,
  DEFAULT_SOURCE_COUNTRY,
  PURPOSES_BUSINESS,
  PURPOSES_INDIVIDUAL,
  QUERY_EXCHANGE,
  ROUTE_ATTACHMENT,
} from "utils"

const DEFAULT_ERR_STATE = {
  errSourceAmount: "",
  errDestinationAmount: "",
  errSourceCountry: "",
  errDestinationCountry: "",
  errRecipientType: "",
  errPurpose: "",
  errReason: "",
  isClicked: false,
  isValid: false,
}

export const useHandler = () => {
  const {push} = useRouter()
  const {getFxRate} = usePaymentController()
  const {refreshQuery} = useReactQuery()
  const [destinationAmount, setDestinationAmount] = useState("")
  const [data, setData] = useState<ITransactionData>({
    source_amount: "",
    destination_amount: "",
    recipient_type: [
      {label: "Individual", isSelected: false},
      {label: "Business", isSelected: false},
    ],
    source_country: DEFAULT_SOURCE_COUNTRY,
    destination_country: DEFAULT_DESTINATION_COUNTRY,
    purpose: "",
    reason: "",
  })
  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)

  const {toggleSlider} = useSlider()

  const {source_country, source_amount, destination_country, destination_amount, recipient_type, purpose, reason} = data

  const isIndividual = recipient_type.find(({label, isSelected}) => isSelected && label === "Individual")

  const PURPOSES = isIndividual ? PURPOSES_INDIVIDUAL : PURPOSES_BUSINESS

  const {isClicked} = errState

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onValidateFxRate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
    }

    if (!isNaN(parseFloat(source_amount)))
      errState = {...errState, errSourceAmount: "Please enter valid source amount", isValid: false}

    if (!source_country?.iso2) errState = {...errState, errSourceCountry: "Choose valid country", isValid: false}

    if (!destination_country?.iso2)
      errState = {...errState, errDestinationCountry: "Choose valid destination country", isValid: false}

    return errState
  }

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isClicked: true,
      isValid: true,
    }

    errState = {...errState, ...onValidateFxRate()}

    if (!isNaN(parseFloat(destination_amount)))
      errState = {...errState, errDestinationAmount: "Please enter valid destination amount", isValid: false}

    if (!recipient_type?.some(({isSelected}) => isSelected))
      errState = {...errState, errRecipientType: "Choose valid recipient type", isValid: false}

    if (!purpose) errState = {...errState, errPurpose: "Please choose valid purpose", isValid: false}

    if (!reason) errState = {...errState, errPurpose: "Please choose valid reason", isValid: false}

    return errState
  }

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

  useEffect(() => {
    const {isValid} = onValidateFxRate()
    if (isClicked && isValid)
      checkFxRate({
        source_country: source_country.iso2,
        source_amount: parseFloat(source_amount),
        destination_country: destination_country.iso2,
      })
  }, [source_amount, checkFxRate, destination_country])

  const onChangeValue = (value: JSONObject) => setData({...data, ...value})

  const onSelectCountry = (destination_country: ICountry) => setData({...data, destination_country})

  const showCountries = () =>
    toggleSlider({children: <CountryPopup onSelect={onSelectCountry} selCountry={destination_country} />})

  const onSelectType = (recipient_type: IFormData[]) => setData({...data, recipient_type, purpose: ""})

  return {
    onAdd,
    data,
    destinationAmount,
    PURPOSES,
    showCountries,
    onChangeValue,
    onSelectType,
  }
}
