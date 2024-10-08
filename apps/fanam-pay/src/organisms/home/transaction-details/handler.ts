import {usePopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject} from "@fanam-pkg/core-utils"
import {useMemo, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {ITransaction} from "@custom/utils"
import {useTransactionController} from "controller"
import {useCommon} from "hooks"
import {QUERY_CANCEL_ORDER, RELATION_SHIP_DATA} from "utils"

export const useHandler = (transaction: ITransaction) => {
  const {getFirstLetter} = useCommon()
  const {cancelTransaction} = useTransactionController()
  const {togglePopup} = usePopup()
  const [showReason, setShowReason] = useState(false)
  const [data, setData] = useState({
    cancel_reason: "",
  })

  const {recipient, transaction_id, beneficiary} = transaction || {}
  const {first_name, last_name, email, phone_no, bank_account, country, state, city, zip_code, relationship} =
    recipient || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {account_no, account_type, bank_name, branch_code, swift_code, iban_no, bsb_code, routing_code} =
    bank_account || {}

  const {recipientDetails} = useMemo(() => {
    const recipientDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {key: "Account Type", label: account_type},
      {key: "Account Number", label: account_no},
      {key: "Bank Name", label: bank_name},
      {key: "Branch", label: branch_code},
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City/District", label: city_name},
      {key: "PinCode", label: zip_code},
      {
        key: "Recipient Relationship",
        label: RELATION_SHIP_DATA[relationship || beneficiary?.relationship]?.label,
      },
    ]
    if (swift_code) recipientDetails.push({key: "Swift Code", label: swift_code})
    if (bsb_code) recipientDetails.push({key: "BSB Code", label: bsb_code})
    if (routing_code) recipientDetails.push({key: "Routing Code", label: routing_code})
    if (iban_no) recipientDetails.push({key: "IBAN Number", label: iban_no})
    return {recipientDetails}
  }, [transaction])

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const {mutate: onCancel} = useMutation({
    mutationKey: [QUERY_CANCEL_ORDER],
    mutationFn: cancelTransaction,
    onSuccess: result => {
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
