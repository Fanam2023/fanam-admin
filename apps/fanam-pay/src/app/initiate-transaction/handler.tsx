import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_VALID_NUMBER, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {ChangeEvent, useEffect, useRef, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import useRazorpay from "react-razorpay"
import {useSlider} from "@custom/ui"
import {ICountry, IPayloadFxRate, IResponseOrder, ITransactionData} from "@custom/utils"
import {usePaymentController, useTransactionController} from "controller"
import {useSingleton} from "hooks"
import {CountryPopup} from "organisms"
import {
  PURPOSES_BUSINESS,
  PURPOSES_INDIVIDUAL,
  QUERY_EXCHANGE,
  QUERY_TRANSACTION,
  ROUTE_REVIEW_SEND,
  routeToTransactionDetail,
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
  const {updateTransaction} = useTransactionController()
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const [Razorpay] = useRazorpay()
  const {user, transId, transData} = useSingleton()
  const isFetched = useRef(false)
  const [data, setData] = useState<ITransactionData>({
    source_amount: "",
    destination_amount: "",
    destination_country: null,
    source_country: null,
  })
  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)
  const [selectedCharge, setSelectedCharge] = useState<string>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const {recipient_account_type, recipient} = transData || {}

  const {toggleSlider} = useSlider()

  const {country: sourceCountry, first_name, last_name, phone_no, email} = user || {}

  const {source_amount, destination_country, destination_amount} = data

  const isIndividual = recipient_account_type === "Individual"

  const PURPOSES = isIndividual ? PURPOSES_INDIVIDUAL : PURPOSES_BUSINESS

  const {isClicked} = errState

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

  const {mutate: onUpdateTransaction} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: updateTransaction,
    onSuccess: ({order, errorData}) => {
      if (order) {
        showPaymentPopup(order)
      } else
        toggleNotify({
          title: "Error - Initiate transaction",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    },
  })

  function onSuccess() {
    toggleNotify({
      type: "success",
      title: "Payment Successful !",
      description: "Your payment has been processed.",
    })
    push(ROUTE_REVIEW_SEND)
  }

  function onFailure(error?: string) {
    toggleNotify({
      type: "error",
      title: "Payment Failed !",
      description: error || "Something went wrong",
    })
    push(routeToTransactionDetail(transId))
  }

  function showPaymentPopup({razorpay_order_id, amount}: IResponseOrder) {
    const fullName = `${first_name} ${last_name}`

    const rzp1 = new Razorpay({
      order_id: razorpay_order_id,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      currency: sourceCountry.currency,
      name: "Fanam Pay",
      description: "Thanks",
      amount: amount?.toString(),
      prefill: {
        name: fullName,
        email,
        contact: phone_no,
      },
      retry: {
        enabled: false,
      },
      modal: {
        backdropclose: false,
        escape: false,
        handleback: true,
        confirm_close: true,
        ondismiss: onFailure.bind(null, "You have cancelled the payment!"),
      },
      handler: () => {
        console.log(">>>>>>>>>>>>>>>> Payment is Successful")
        onSuccess()
      },
    })
    rzp1.open()

    rzp1.on("payment.failed", (response: Record<string, JSONObject>) => {
      console.error(">>>>>>>>>>>>>>>> Payment is Failed", response, response?.error?.description)
      const message =
        (response?.error?.description as string) || "Sorry, We are not able to process your payment at the moment."
      onFailure(message)
    })
  }

  const onSelect = (charge: string, time: string) => {
    setSelectedCharge(charge)
    setSelectedTime(time)
  }

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

  const onSelectCountry = (destination_country: ICountry) => {
    setData({...data, destination_country})
    toggleSlider()
  }

  const showCountries = () =>
    toggleSlider({
      children: <CountryPopup onSelect={onSelectCountry} selCountry={destination_country} />,
    })

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

    return errState
  }

  useEffect(() => {
    const payloadData = {...data}
    if (transData) payloadData.destination_country = recipient.country

    if (user) payloadData.source_country = sourceCountry

    setData(payloadData)
  }, [transData, user])

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

  const onChangeValue = ({target}: ChangeEvent<HTMLInputElement>) => {
    isFetched.current = false
    const {name, value} = target
    const payloadData = {...data}

    const isNumber = value === "" || REG_VALID_NUMBER.test(value)
    if (!isNumber) {
      toggleNotify({
        description: "Only nummbers allowed",
        type: "error",
      })
      return
    }

    if (name === "destination_amount") payloadData.source_amount = ""
    else if (name === "source_amount") payloadData.destination_amount = ""

    payloadData[name] = value

    setData({...data, ...payloadData})
  }

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      onUpdateTransaction({
        destination_amount,
        source_amount,
        destination_country_id: destination_country?.country_id,
        source_country_id: sourceCountry?.country_id,
      })
    }
  }

  return {
    data,
    PURPOSES,
    onChangeValue,
    onSubmit,
    showCountries,
    handleSelect: onSelect,
    selectedTime,
  }
}
