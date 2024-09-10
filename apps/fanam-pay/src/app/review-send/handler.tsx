import {useNotifyPopup, usePopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import useRazorpay from "react-razorpay"
import {useSlider} from "@custom/ui"
import {useOrderController} from "controller"
import {useSingleton} from "hooks"
import {CreateBeneficiaryDetails, CreateRecipientDetails} from "organisms"
import {routeToBeneficiaryDetails, routeToRecipientDetails} from "utils"

const useHandler = () => {
  const {transData, refetchTransaction, transId, user} = useSingleton()
  const [showDetails, setShowDetails] = useState({
    recipient: false,
    beneficiary: false,
  })
  const {isDesktop} = useResize()
  const {toggleSlider} = useSlider()
  const {push} = useRouter()
  const {toggleNotify} = useNotifyPopup()
  const {togglePopup} = usePopup()
  const {createOrder} = useOrderController()
  const [Razorpay] = useRazorpay()

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
    recipient_id,
  } = recipient || {}
  const {currency} = source_country || {}
  const {currency: destinationCountryValue} = destination_country || {}
  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {account_no, account_type, account_holder, branch_address, bank_name, branch_code, swift_code} =
    bank_account || {}

  const {
    first_name: beneficiaryFirstName,
    last_name: beneficiarylastName,
    address: beneficiaryAddress,
    email: beneficiaryEmail,
    phone_no: beneficiaryPhoneNo,
    zip_code: beneficiaryZipCode,
    country_id: beneficiaryCountryId,
    city_id: beneficiaryCityId,
    state_id: beneficiaryStateId,
    relationship: beneficiaryRelationShip,
  } = beneficiary || {}

  useEffect(() => {
    if (transId) refetchTransaction()
  }, [])

  const {recipientDetails, beneficiaryDetails, paymentDetails} = useMemo(() => {
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

    const beneficiaryDetails: IFormData[] = [
      {key: "First Name", label: beneficiaryFirstName},
      {key: "Last Name", label: beneficiarylastName},
      {key: "Address", label: beneficiaryAddress},
      {key: "Email", label: beneficiaryEmail},
      {key: "Phone Number", label: beneficiaryPhoneNo},
      {key: "Country", label: beneficiaryCountryId},
      {key: "State", label: beneficiaryStateId},
      {key: "City", label: beneficiaryCityId},
      {key: "ZIP Code", label: beneficiaryZipCode},
      {key: "Account Number", label: "76376687899"},
      {key: "RelationShip", label: beneficiaryRelationShip},
    ]

    const paymentDetails: IFormData[] = [
      {key: "You Send", label: `${String(source_amount)} ${currency}`},
      {key: "Transfer Fee", label: String(markup_fee)},
      // {key: "Exchange rate", label: "200.50 INR"},
      // {key: "Total Fees", label: "351.00 INR"},
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

  const handleRecipientEditClick = () => {
    routeToRecipient(recipient_id)
  }

  const handleBeneficiaryEditClick = () => {
    routeToBeneficiary("beneficiary_id")
  }

  const onProcessPayment = async (transaction_id: string) => {
    const {result, errorData} = await createOrder({transaction_id})
    if (result) {
      const {razorpay_order_id, amount, order_id} = result || {}
      const {first_name, last_name, phone_no, email} = user || {}
      const fullName = `${first_name} ${last_name}`

      const rzp1 = new Razorpay({
        order_id: razorpay_order_id,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
        currency: "INR",
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
          ondismiss: onFailure.bind(null, order_id),
        },
        handler: () => {
          console.log(">>>>>>>>>>>>>>>> Payment is Successful")
          onSuccess(order_id)
        },
      })
      rzp1.open()
      togglePopup()
    } else {
      console.error(">>>>>>>>>>>>>>>>> Error while creating error: ", errorData?.message)
    }
  }

  function onSuccess(order_id: string) {
    toggleNotify({
      type: "success",
      title: "Payment Successful !",
      description: "Your payment has been processed.",
    })
  }

  function onFailure(order_id: string, error: Record<string, JSONObject>) {
    toggleNotify({
      type: "error",
      title: "Payment Failed !",
      description: (error?.error?.description as string) || "Something went wrong",
    })
  }

  return {
    recipient_id,
    recipientDetails,
    beneficiaryDetails,
    paymentDetails,
    showDetails,
    toggleDetails,
    handleBeneficiaryEditClick,
    handleRecipientEditClick,
    onProcessPayment,
    transId,
    destination_amount,
    destinationCountryValue,
  }
}

export default useHandler
