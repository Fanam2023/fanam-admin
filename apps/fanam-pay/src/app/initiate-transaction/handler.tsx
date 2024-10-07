import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_VALID_NUMBER} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {ChangeEvent, useEffect, useRef, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import useRazorpay from "react-razorpay"
import {useSlider} from "@custom/ui"
import {ICountry, IPayloadFxRate, ITransaction, ITransactionData, ITransferTime} from "@custom/utils"
import {useLocationController, useOrderController, usePaymentController, useTransactionController} from "controller"
import {useSingleton} from "hooks"
import {CountryPopup} from "organisms"
import {
  PURPOSES_BUSINESS,
  PURPOSES_INDIVIDUAL,
  QUERY_COUNTRIES,
  QUERY_EXCHANGE,
  QUERY_ORDER,
  QUERY_TRANSACTION,
  routeToReviewSend,
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
  const {createOrder, cancelTransaction} = useOrderController()
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
  const [remainingTime, setRemainingTime] = useState(0)

  const {getTransactionCountries} = useLocationController()
  const {data: countries = []} = useQuery({queryKey: [QUERY_COUNTRIES], queryFn: getTransactionCountries})

  const {recipient_account_type, recipient, transfer_time, expiration_time} = transData || {}

  const {toggleSlider} = useSlider()

  const {country: userCountry, first_name, last_name, phone_no, email} = user || {}

  const {source_amount, destination_country, destination_amount} = data

  const isIndividual = recipient_account_type === "Individual"

  const PURPOSES = isIndividual ? PURPOSES_INDIVIDUAL : PURPOSES_BUSINESS

  const {isClicked} = errState

  const {mutate: checkFxRate, data: fxRes} = useMutation({
    mutationKey: [QUERY_EXCHANGE],
    mutationFn: getFxRate,
  })

  const {sourceCountry, destinationCountry, transfer_times = []} = fxRes || {}

  const {mutate: putTransaction} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: updateTransaction,
    onSuccess: ({result, errorData}) => {
      isFetched.current = true

      if (result) {
        const {final_amount, destination_amount, source_country, destination_country} = result
        setData({
          source_amount: `${final_amount?.toFixed(2)}`,
          destination_amount: `${destination_amount}`,
          source_country,
          destination_country,
        })
      } else
        toggleNotify({
          title: "Error - Initiate transaction",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    },
  })

  const {mutate: onCreateOrder} = useMutation({
    mutationKey: [QUERY_ORDER],
    mutationFn: createOrder,
    onSuccess: ({result, errorData}) => {
      if (result) showPaymentPopup(result)
      else
        toggleNotify({
          title: "Error - Initiate transaction",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    },
  })

  const {mutate: onCancelTransaction} = useMutation({
    mutationFn: cancelTransaction,
    onSuccess: () => {
      toggleNotify({
        title: "Cancelled Transaction",
        description: "Cancelled Transaction due to timeout",
        type: "error",
      })

      push(routeToTransactionDetail(transId))
    },
  })

  useEffect(() => {
    if (fxRes) onUpdateTransaction(transfer_times?.find(({is_recommended}) => is_recommended))
  }, [fxRes])

  function onUpdateTransaction({exchange_rate, transfer_time_id, quote_id}: ITransferTime) {
    if (transfer_time_id) {
      const {country_id: source_country_id} = sourceCountry
      const {country_id: destination_country_id} = destinationCountry

      putTransaction({
        source_country_id,
        destination_country_id,
        exchange_amount: exchange_rate,
        transfer_time_id,
        visa_quote_id: quote_id ? `${quote_id}` : "",
        destination_amount,
      })
    }
  }

  function onSuccess() {
    toggleNotify({
      type: "success",
      title: "Payment Successful!",
      description: "Your payment has been processed.",
    })
    push(routeToReviewSend(transId))
  }

  function onFailure(error?: string) {
    toggleNotify({
      type: "error",
      title: "Payment Failed!",
      description: error || "Something went wrong",
    })
    push(routeToTransactionDetail(transId))
  }

  function showPaymentPopup({order}: ITransaction) {
    const {razorpay_order_id, amount} = order
    const fullName = `${first_name} ${last_name}`

    const rzp1 = new Razorpay({
      order_id: razorpay_order_id,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      currency: userCountry.currency,
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
    isFetched.current = false
    setData({...data, destination_country})
    toggleSlider()
  }

  const showCountries = () =>
    toggleSlider({
      children: (
        <CountryPopup
          onSelect={onSelectCountry}
          selCountry={destination_country}
          countries={countries}
          title="Select a country to choose the recipient currency"
        />
      ),
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
    if (transData && user) {
      const {source_country, destination_country} = transData
      if (destination_country) payloadData.destination_country = destination_country
      else if (recipient?.country) payloadData.destination_country = recipient.country

      if (source_country) payloadData.source_country = source_country
      else if (userCountry) payloadData.source_country = userCountry
    }

    setData(payloadData)
  }, [transData, user])

  useEffect(() => {
    if (remainingTime > 0) {
      const debounceInterval = setInterval(() => setRemainingTime(remainingTime - 1000), 1000)

      return () => {
        clearInterval(debounceInterval)
      }
    } else if (expiration_time && transfer_time) onCancelTransaction(transId)
  }, [remainingTime])

  useEffect(() => {
    if (expiration_time) {
      const expirationDuration = new Date(expiration_time).valueOf() - new Date().valueOf()

      if (expirationDuration) setRemainingTime(expirationDuration)
    }
  }, [expiration_time])

  useEffect(() => {
    const {isValid} = onValidateFxRate()
    if (isValid && !isFetched.current) {
      if (debounceTimer) clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => {
        let payload: IPayloadFxRate = {
          source_country_code: userCountry.iso2,
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
        description: "Only numbers allowed",
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

    if (isValid) onCreateOrder()
  }

  const onCancel = () => {
    onCancelTransaction(transId, {
      onSuccess: () => {
        toggleNotify({
          title: "Cancelled Payment",
          description: "You have cancelled the payment.",
          type: "error",
        })
      },
    })
  }

  // Get total seconds
  const totalSeconds = Math.floor(remainingTime / 1000)

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (totalSeconds % 60).toString().padStart(2, "0")

  const durationTime = remainingTime > 0 ? `${minutes}:${seconds}` : ""

  return {
    data,
    PURPOSES,
    onChangeValue,
    onSubmit,
    onCancel,
    showCountries,
    fxRes,
    onSelect: onUpdateTransaction,
    transfer_time,
    durationTime,
  }
}
