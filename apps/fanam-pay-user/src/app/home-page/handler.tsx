import {IFormData, JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {ICountry, ITransactionData} from "@custom/utils"
import {useLocationController, usePaymentController} from "controller"
import {useSingleton} from "hooks"
import {CountryPopup} from "organisms"
import {PURPOSES_BUSINESS, PURPOSES_INDIVIDUAL, QUERY_COUNTRIES, QUERY_EXCHANGE, ROUTE_ATTACHMENT} from "utils"

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

let debounceTimer: null | NodeJS.Timeout = null

export const useHandler = () => {
  const {push} = useRouter()
  const {getFxRate} = usePaymentController()
  const {getAllCountries} = useLocationController()
  const {refreshQuery} = useReactQuery()
  const {user} = useSingleton()
  const [data, setData] = useState<ITransactionData>({
    source_amount: "",
    destination_amount: "",
    recipient_type: [
      {label: "Individual", isSelected: false},
      {label: "Business", isSelected: false},
    ],
    source_country: user?.country || null,
    destination_country: null,
    purpose: "",
    reason: "",
  })
  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)

  const {toggleSlider} = useSlider()

  const {source_country, source_amount, destination_country, destination_amount, recipient_type, purpose, reason} = data

  console.log("scda", recipient_type)
  const isIndividual = recipient_type.find(({label, isSelected}) => isSelected && label === "Individual")

  const PURPOSES = isIndividual ? PURPOSES_INDIVIDUAL : PURPOSES_BUSINESS

  const {isClicked} = errState

  const {data: allCountries = []} = useQuery({queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries})

  useEffect(() => {
    if (allCountries.length) {
      setData({
        ...data,
        destination_country: allCountries.find(({iso2}) =>
          source_country?.iso2 === "IN" ? iso2 === "US" : iso2 === "IN"
        ),
      })
    }
  }, [allCountries])

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onValidateFxRate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
    }

    if (isNaN(parseFloat(source_amount)))
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

    if (isNaN(parseFloat(destination_amount)))
      errState = {...errState, errDestinationAmount: "Please enter valid destination amount", isValid: false}

    if (!recipient_type?.some(({isSelected}) => isSelected))
      errState = {...errState, errRecipientType: "Choose valid recipient type", isValid: false}

    if (!purpose) errState = {...errState, errPurpose: "Please choose valid purpose", isValid: false}

    if (!reason) errState = {...errState, errReason: "Please choose valid reason", isValid: false}

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
        onChangeValue({destination_amount})
      }
    },
  })

  useEffect(() => {
    const {isValid} = onValidateFxRate()
    if (isValid) {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        checkFxRate({
          source_country_code: source_country.iso2,
          destination_country_code: destination_country.iso2,
          source_amount: source_amount,
        })
      }, 500)
    }
  }, [source_amount, checkFxRate, destination_country])

  const onChangeValue = (value: JSONObject) => setData({...data, ...value})

  const onSelectCountry = (destination_country: ICountry) => setData({...data, destination_country})

  const showCountries = () =>
    toggleSlider({
      children: <CountryPopup countries={allCountries} onSelect={onSelectCountry} selCountry={destination_country} />,
    })

  const onSelectType = (value: Record<string, IFormData[]>) => onChangeValue({...value, purpose: ""})

  return {
    onAdd,
    data,
    PURPOSES,
    showCountries,
    onChangeValue,
    onSelectType,
  }
}
