import {usePopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useMemo, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {ITransaction} from "@custom/utils"
import {useTransactionController} from "controller"
import {useCommon} from "hooks"
import {QUERY_CANCEL_ORDER, QUERY_TRANSACTION, RELATION_SHIP_DATA} from "utils"

export const useHandler = (transaction: ITransaction) => {
  const {getFirstLetter} = useCommon()
  const {cancelPayout} = useTransactionController()
  const {togglePopup} = usePopup()
  const {refreshQuery} = useReactQuery()
  const [showReason, setShowReason] = useState(false)
  const [data, setData] = useState({
    cancel_reason: "",
  })

  const {recipient, transaction_id, beneficiary, recipient_account_type} = transaction || {}
  const {
    first_name,
    last_name,
    email,
    phone_no,
    bank_account,
    country,
    state,
    city,
    zip_code,
    relationship,
    address_line_1,
    address_line_2,
    business_name,
  } = recipient || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {
    account_no,
    account_type,
    bank_name,
    branch_code,
    swift_code,
    iban_no,
    bsb_code,
    routing_code,
    branch_address,
    account_holder,
  } = bank_account || {}

  const {recipientDetails} = useMemo(() => {
    const recipientDetails: IFormData[] = [
      {key: "Recipient Type", label: recipient_account_type},
      ...(business_name ? [{key: "Business Name", label: business_name}] : []),
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {
        key: "Recipient Relationship",
        label: RELATION_SHIP_DATA[relationship || beneficiary?.relationship]?.label,
      },
      {key: "Address Line 1", label: address_line_1},
      ...(address_line_2 ? [{key: "Address Line 2", label: address_line_2}] : []),
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City/District", label: city_name},
      {key: "Pin Code", label: zip_code},
      {key: "Account Number", label: account_no},
      {key: "Account Holder", label: account_holder},
      {key: "Account Type", label: account_type},
      {key: "Bank Name", label: bank_name},
      {key: "Branch Code", label: branch_code},
      {key: "Branch Address", label: branch_address},
    ]
    if (swift_code) recipientDetails.push({key: "Swift Code", label: swift_code})
    if (bsb_code) recipientDetails.push({key: "BSB Code", label: bsb_code})
    if (routing_code) recipientDetails.push({key: "Routing Code", label: routing_code})
    if (iban_no) recipientDetails.push({key: "IBAN Code", label: iban_no})
    return {recipientDetails}
  }, [transaction])

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const {mutate: onCancel} = useMutation({
    mutationKey: [QUERY_CANCEL_ORDER],
    mutationFn: cancelPayout,
    onSuccess: result => {
      refreshQuery(QUERY_TRANSACTION)
      if (result) togglePopup()
    },
  })

  const onSubmit = () => {
    const {cancel_reason} = data
    onCancel({transaction_id, cancel_reason})
  }

  return {
    data,
    recipientDetails,
    showReason,
    setShowReason,
    getFirstLetter,
    onChangeValue,
    onSubmit,
  }
}
