import {IFormData} from "@fanam-pkg/core-utils"
import {useParams, useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {usePaymentController, useTransactionController} from "controller"
import {QUERY_TRANSACTION, routeToTransactionDetail} from "utils"

const useHandler = () => {
  const {transactionId} = useParams()

  const {getTransactionDetails} = useTransactionController()

  const {data: transactionDetail} = useQuery({
    queryKey: [QUERY_TRANSACTION.concat(transactionId as string)],
    queryFn: () => getTransactionDetails(transactionId as string),
    enabled: !!transactionId,
  })

  const {sendPayout} = usePaymentController()
  const [showDetails, setShowDetails] = useState({
    recipient: false,
    beneficiary: false,
  })
  const {push} = useRouter()

  const {
    recipient,
    beneficiary,
    recipient_relationship,
    source_country,
    destination_country,
    destination_amount,
    markup_fee,
    other_fee,
    exchange_amount,
    final_amount,
    order,
  } = transactionDetail || {}

  const isDisabled = !order

  const {currency} = source_country || {}
  const {currency: destinationCountryValue} = destination_country || {}

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
    const {account_no, account_type, account_holder, branch_address, bank_name, branch_code, swift_code} =
      bank_account || {}

    const recipientDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Address 1", label: address_line_1},
      {key: "Address 2", label: address_line_2},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {key: "RelationShip", label: recipient_relationship},
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
      {key: "BIC", label: swift_code},
    ]

    return recipientDetails
  }, [transactionDetail])

  const beneficiaryDetails = useMemo(() => {
    const {first_name, last_name, address, email, phone_no, zip_code, country, city, state, relationship} =
      beneficiary || {}
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

    return beneficiaryDetails
  }, [transactionDetail])

  const paymentDetails = useMemo(() => {
    const paymentDetails: IFormData[] = [
      {key: "Exchange Amount", label: `${exchange_amount} ${currency}`},
      {key: "Transfer Fee", label: `${other_fee} ${currency}`},
      {key: "Exchange rate", label: `${markup_fee} ${currency}`},
      {key: "Total Fees", label: `${final_amount} ${currency}`},
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
  }
}

export default useHandler
