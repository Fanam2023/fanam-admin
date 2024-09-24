import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {IFormData} from "@fanam-pkg/core-utils"
import {useParams, useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useOrderController, usePaymentController, useTransactionController} from "controller"
import {QUERY_TRANSACTION, routeToTransactionDetail} from "utils"

const useHandler = () => {
  const [remainingTime, setRemainingTime] = useState(0)
  const {toggleNotify} = useNotifyPopup()
  const {getTransactionDetails} = useTransactionController()
  const {cancelTransaction} = useOrderController()
  const {sendPayout} = usePaymentController()
  const [showDetails, setShowDetails] = useState({
    recipient: false,
    beneficiary: false,
  })
  const {push} = useRouter()

  const params = useParams()
  const transactionId = params.transactionId as string

  const {data: transactionDetail} = useQuery({
    queryKey: [QUERY_TRANSACTION.concat(transactionId)],
    queryFn: () => getTransactionDetails(transactionId),
    enabled: !!transactionId,
  })

  const {mutate: onCancelTransaction} = useMutation({
    mutationFn: cancelTransaction,
    onSuccess: () => {
      toggleNotify({
        title: "Cancelled Transaction",
        description: "Cancelled Transaction due to timeout",
        type: "error",
      })

      push(routeToTransactionDetail(transactionId))
    },
  })

  const {
    recipient,
    beneficiary,
    source_country,
    destination_country,
    destination_amount,
    markup_fee,
    other_fee,
    exchange_amount,
    final_amount,
    order,
    expiration_time,
    transfer_time,
  } = transactionDetail || {}

  useEffect(() => {
    if (remainingTime > 0) {
      const debounceInterval = setInterval(() => setRemainingTime(remainingTime - 1000), 1000)

      return () => {
        clearInterval(debounceInterval)
      }
    } else if (expiration_time && transfer_time) onCancelTransaction(transactionId)
  }, [remainingTime])

  useEffect(() => {
    if (expiration_time) {
      const expirationDuration = new Date(expiration_time).valueOf() - new Date().valueOf()

      if (expirationDuration) setRemainingTime(expirationDuration)
    }
  }, [expiration_time])

  const isDisabled = !order

  const {currency} = source_country || {}
  const {currency: destinationCountryValue} = destination_country || {}

  // Get total seconds
  const totalSeconds = Math.floor(remainingTime / 1000)

  // Calculate minutes and seconds
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0")
  const seconds = (totalSeconds % 60).toString().padStart(2, "0")

  const durationTime = remainingTime > 0 ? `${minutes}:${seconds}` : ""

  const recipientDetails = useMemo(() => {
    const {
      first_name,
      last_name,
      address_line_1,
      address_line_2,
      email,
      phone_no,
      bank_account,
      country,
      state,
      city,
      zip_code,
    } = recipient || {}

    const {country_name} = country || {}
    const {state_name} = state || {}
    const {city_name} = city || {}
    const {
      account_no,
      account_type,
      account_holder,
      branch_address,
      bank_name,
      branch_code,
      swift_code,
      bsb_code,
      iban_no,
      routing_code,
    } = bank_account || {}

    const recipientDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Address 1", label: address_line_1},
      {key: "Address 2", label: address_line_2},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City", label: city_name},
      {key: "ZIP Code", label: zip_code},
      {key: "Account Number", label: account_no},
      {key: "Account Holder", label: account_holder},
      {key: "Account Type", label: account_type},
      {key: "Bank Name", label: bank_name},
      {key: "Branch", label: branch_code},
      {key: "Branch Address", label: branch_address},
    ]

    if (swift_code) recipientDetails.push({key: "Swift Code", label: swift_code})
    if (bsb_code) recipientDetails.push({key: "BSB Code", label: bsb_code})
    if (routing_code) recipientDetails.push({key: "Routing Code", label: routing_code})
    if (iban_no) recipientDetails.push({key: "IBAN Number", label: iban_no})

    return recipientDetails
  }, [transactionDetail])

  const beneficiaryDetails = useMemo(() => {
    const {
      first_name,
      last_name,
      address,
      email,
      phone_no,
      zip_code,
      country,
      city,
      state,
      relationship,
      account_no,
      notes,
    } = beneficiary || {}
    const {country_name} = country || {}
    const {state_name} = state || {}
    const {city_name} = city || {}

    const beneficiaryDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Address", label: address},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City", label: city_name},
      {key: "ZIP Code", label: zip_code},
      {key: "RelationShip", label: relationship},
    ]

    if (account_no) beneficiaryDetails.push({key: "Account Number", label: account_no})
    if (notes) beneficiaryDetails.push({key: "Notes", label: notes})

    return beneficiaryDetails
  }, [transactionDetail])

  const paymentDetails = useMemo(() => {
    const paymentDetails: IFormData[] = [
      {key: "Exchange Amount", label: `${exchange_amount?.toFixed(2)} ${currency}`},
      {key: "Fees", label: `${(other_fee + markup_fee)?.toFixed(2)} ${currency}`},
      {key: "Total Fees", label: `${final_amount?.toFixed(2)} ${currency}`},
    ]

    return paymentDetails
  }, [transactionDetail])

  const toggleDetails = (type: string) => setShowDetails(prev => ({...prev, [type]: !prev[type]}))

  const {mutate: completeTransaction} = useMutation({
    mutationFn: sendPayout,
    onSuccess: () => push(routeToTransactionDetail(transactionId as string)),
  })

  return {
    beneficiaryDetails,
    recipientDetails,
    paymentDetails,
    showDetails,
    toggleDetails,
    destination_amount,
    destinationCountryValue,
    isDisabled,
    completeTransaction,
    transactionId,
    durationTime,
    transfer_time,
  }
}

export default useHandler
