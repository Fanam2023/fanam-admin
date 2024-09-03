import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useRef, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {ICountry, IPayloadFxRate, ITransactionData} from "@custom/utils"
import {useLocationController, usePaymentController, useTransactionController} from "controller"
import {useSingleton} from "hooks"
import {CountryPopup} from "organisms"
import {
  PURPOSES_BUSINESS,
  PURPOSES_INDIVIDUAL,
  QUERY_COUNTRIES,
  QUERY_EXCHANGE,
  QUERY_TRANSACTION,
  ROUTE_INVOICE,
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

let debounceTimer: null | NodeJS.Timeout = null

export const useHandler = () => {
  const {push} = useRouter()
  const {getFxRate} = usePaymentController()
  const {getAllCountries} = useLocationController()
  const {createTransaction} = useTransactionController()
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const {user, updateTransData, updateTransId} = useSingleton()
  const isFetched = useRef(false)
  const [data, setData] = useState<ITransactionData>({
    source_amount: "",
    destination_amount: "",
    recipient_account_type: [
      {label: "Personal", isSelected: false},
      {label: "Business", isSelected: false},
    ],
    destination_country: null,
    purpose: null,
    reason: "",
  })
  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)

  const {toggleSlider} = useSlider()

  const {country: sourceCountry, user_accounts = []} = user || {}

  const {source_amount, destination_country, destination_amount, recipient_account_type, purpose, reason} = data

  const isIndividual = recipient_account_type.find(({label, isSelected}) => isSelected && label === "Personal")

  const PURPOSES = isIndividual ? PURPOSES_INDIVIDUAL : PURPOSES_BUSINESS

  const {isClicked} = errState

  const {data: allCountries = []} = useQuery({queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries})

  const {mutate: checkFxRate} = useMutation({
    mutationKey: [QUERY_EXCHANGE],
    mutationFn: getFxRate,
    onSuccess: ({result}) => {
      refreshQuery(QUERY_EXCHANGE)
      if (result) {
        const {source_amount, destination_amount} = result
        setData(prev => ({
          ...prev,
          source_amount: source_amount.toString(),
          destination_amount: destination_amount.toString(),
        }))
        isFetched.current = true
      }
    },
  })

  const {mutate: onCreate} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: createTransaction,
    onSuccess: ({result, errorData}) => {
      if (result) {
        const {transaction_id} = result
        updateTransId(transaction_id)
        updateTransData(result)
        push(ROUTE_INVOICE)
      } else
        toggleNotify({
          title: "Error - Initiate transaction",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    },
  })

  useEffect(() => {
    if (allCountries.length) {
      setData({
        ...data,
        destination_country: allCountries.find(({iso2}) =>
          sourceCountry?.iso2 === "IN" ? iso2 === "US" : iso2 === "IN"
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

    if (!destination_amount && isNaN(parseFloat(source_amount)))
      errState = {...errState, errSourceAmount: "Please enter valid source amount", isValid: false}

    if (!source_amount && isNaN(parseFloat(destination_amount)))
      errState = {...errState, errDestinationAmount: "Please enter valid destination amount", isValid: false}

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

    if (isNaN(parseFloat(source_amount)))
      errState = {...errState, errSourceAmount: "Please enter valid source amount", isValid: false}

    if (isNaN(parseFloat(destination_amount)))
      errState = {...errState, errDestinationAmount: "Please enter valid destination amount", isValid: false}

    if (!recipient_account_type?.some(({isSelected}) => isSelected))
      errState = {...errState, errRecipientType: "Choose valid recipient type", isValid: false}

    if (!purpose) errState = {...errState, errPurpose: "Please choose valid purpose", isValid: false}

    if (!reason) errState = {...errState, errReason: "Please choose valid reason", isValid: false}

    return errState
  }

  useEffect(() => {
    const {isValid} = onValidateFxRate()
    if (isValid && !isFetched.current) {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        let payload: IPayloadFxRate = {
          source_country_code: sourceCountry.iso2,
          destination_country_code: destination_country.iso2,
        }

        if (source_amount) payload.source_amount = source_amount
        else if (destination_amount) payload.destination_amount = destination_amount
        checkFxRate(payload)
      }, 1000)
    }
  }, [source_amount, destination_amount, checkFxRate, destination_country, user])

  const onChangeValue = (value: JSONObject) => {
    isFetched.current = false

    const keys = Object.keys(value)
    if (keys.includes("destination_amount")) value = {...value, source_amount: ""}
    else if (keys.includes("source_amount")) value = {...value, destination_amount: ""}

    setData({...data, ...value})
  }

  const onSelectCountry = (destination_country: ICountry) => {
    setData({...data, destination_country})
    toggleSlider()
  }

  const showCountries = () =>
    toggleSlider({
      children: <CountryPopup countries={allCountries} onSelect={onSelectCountry} selCountry={destination_country} />,
    })

  const onSelectType = (value: Record<string, IFormData[]>) => onChangeValue({...value, purpose: ""})

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      onCreate({
        destination_amount,
        source_amount,
        recipient_account_type: recipient_account_type.find(({isSelected}) => isSelected)?.label,
        destination_country_id: destination_country?.country_id,
        source_country_id: sourceCountry?.country_id,
        sender_account_type: user_accounts?.[0]?.account_type,
        reason,
        purpose: purpose.key as string,
      })
    }
  }

  return {
    data,
    PURPOSES,
    showCountries,
    onChangeValue,
    onSelectType,
    onSubmit,
    sourceCountry,
  }
}
