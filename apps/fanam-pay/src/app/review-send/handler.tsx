import {IFormData, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useSlider} from "@custom/ui"
import {useSingleton} from "hooks"
import {CreateBeneficiaryDetails, CreateRecipientDetails} from "organisms"
import {routeToBeneficiaryDetails, routeToRecipientDetails} from "utils"

const useHandler = () => {
  const {transData, refetchTransaction, transId} = useSingleton()
  const [showDetails, setShowDetails] = useState({
    recipient: false,
    beneficiary: false,
  })
  const {isDesktop} = useResize()
  const {toggleSlider} = useSlider()
  const {push} = useRouter()

  const {first_name, last_name, address, email, phone_no, bank_account, country, state, city, zip_code, recipient_id} =
    transData?.recipient || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {account_no, account_type, bank_name, branch_code, swift_code} = bank_account || {}

  useEffect(() => {
    if (transId) refetchTransaction()
  }, [])

  const {recipientDetails, beneficiaryDetails, paymentDetails} = useMemo(() => {
    const recipientDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Address", label: address},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City", label: city_name},
      {key: "ZIP Code", label: zip_code},
      {key: "Account Number", label: account_no},
      {key: "Account Type", label: account_type},
      {key: "Bank Name", label: bank_name},
      {key: "Branch", label: branch_code},
      {key: "BIC", label: swift_code},
    ]

    const beneficiaryDetails: IFormData[] = [
      {key: "First Name", label: "ram"},
      {key: "Last Name", label: "kumar"},
      {key: "Address", label: "45"},
      {key: "Email", label: "ram@gmail.com"},
      {key: "Phone Number", label: "458888545"},
      {key: "Country", label: "india"},
      {key: "State", label: "tamilnadu"},
      {key: "City", label: "tuticorin"},
      {key: "ZIP Code", label: "626367"},
      {key: "Account Number", label: "76376687899"},
    ]

    const paymentDetails: IFormData[] = [
      {key: "You Send ", label: "5000.00 INR"},
      {key: "Transfer Fee", label: "150.50 INR"},
      {key: "Exchange rate", label: "200.50 INR"},
      {key: "Total Fees", label: "351.00 INR"},
    ]

    return {recipientDetails, beneficiaryDetails, paymentDetails}
  }, [transData])

  const toggleDetails = (type: string) => {
    setShowDetails(prev => ({...prev, [type]: !prev[type]}))
  }

  const routeToBeneficiary = (beneficiaryId: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateBeneficiaryDetails beneficiary_id={beneficiaryId} />,
        title: "Edit Beneficiary",
      })
    } else {
      push(routeToBeneficiaryDetails(beneficiaryId))
    }
  }

  const routeToRecipient = (recipient_id: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails recipient_id={recipient_id} />,
        title: "Edit Recipient Details",
      })
    } else {
      push(routeToRecipientDetails(recipient_id))
    }
  }

  return {
    recipient_id,
    recipientDetails,
    beneficiaryDetails,
    paymentDetails,
    showDetails,
    toggleDetails,
    routeToBeneficiary,
    routeToRecipient,
  }
}

export default useHandler
