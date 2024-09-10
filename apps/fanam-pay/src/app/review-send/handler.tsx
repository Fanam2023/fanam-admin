import {IFormData, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useSlider} from "@custom/ui"
import {useSingleton} from "hooks"
import {CreateBeneficiaryDetails, CreateRecipientDetails} from "organisms"
import {routeToTransactionDetail} from "utils"

const useHandler = () => {
  const {transData, refetchTransaction, transId, user} = useSingleton()
  const [showDetails, setShowDetails] = useState({
    recipient: false,
    beneficiary: false,
  })
  const {isDesktop} = useResize()
  const {toggleSlider} = useSlider()
  const {push} = useRouter()

  const {
    recipient,
    beneficiary,
    recipient_relationship,
    source_amount,
    source_country,
    destination_country,
    destination_amount,
    markup_fee,
  } = transData || {}
  const {recipient_id} = recipient || {}
  const {beneficiary_id} = beneficiary || {}

  const {currency} = source_country || {}
  const {currency: destinationCountryValue} = destination_country || {}

  useEffect(() => {
    if (transId) refetchTransaction()
  }, [])

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
  }, [transData])

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
  }, [transData])
  const paymentDetails = useMemo(() => {
    const paymentDetails: IFormData[] = [
      {key: "You Send", label: `${String(source_amount)} ${currency}`},
      {key: "Transfer Fee", label: String(markup_fee)},
      // {key: "Exchange rate", label: "200.50 INR"},
      // {key: "Total Fees", label: "351.00 INR"},
    ]

    return paymentDetails
  }, [transData])

  const toggleDetails = (type: string) => setShowDetails(prev => ({...prev, [type]: !prev[type]}))

  const routeToBeneficiary = () => {
    toggleSlider({
      children: <CreateBeneficiaryDetails beneficiary_id={beneficiary_id} />,
      title: "Edit Beneficiary",
    })
  }

  const routeToRecipient = () =>
    toggleSlider({
      children: <CreateRecipientDetails recipient_id={recipient_id} />,
      title: "Edit Recipient Details",
    })

  const onProcessPayment = async () => {
    /* HIT Network Partner (VISA or MasterCard API to transact money to the recipient) */
    push(routeToTransactionDetail(transId))
  }

  return {
    recipientDetails,
    beneficiaryDetails,
    paymentDetails,
    showDetails,
    toggleDetails,
    onProcessPayment,
    transId,
    routeToRecipient,
    routeToBeneficiary,
    destination_amount,
    destinationCountryValue,
  }
}

export default useHandler
