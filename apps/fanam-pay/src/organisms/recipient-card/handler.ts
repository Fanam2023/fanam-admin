import {IFormData} from "@fanam-pkg/core-utils"
import {useEffect, useMemo} from "react"
import {useSingleton} from "hooks"
import {RELATION_SHIP_DATA} from "utils"

export const useHandler = () => {
  const {transData, refetchTransaction, transId} = useSingleton()
  const {recipient_relationship} = transData || {}
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
    relationship,
    is_same_person,
    id_issued_country,
    id_number,
    id_type,
  } = transData?.recipient || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {
    account_no,
    account_type,
    bank_name,
    branch_code,
    swift_code,
    bsb_code,
    iban_no,
    routing_code,
    branch_address,
    account_holder,
  } = bank_account || {}

  useEffect(() => {
    if (transId) refetchTransaction()
  }, [])

  const isSamePerson = is_same_person || relationship

  const {recipientDetails} = useMemo(() => {
    const recipientRelationship = RELATION_SHIP_DATA[recipient_relationship]?.label
    const recipientDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {key: "Address Line 1", label: address_line_1},
      ...(address_line_2 ? [{key: "Address Line 2", label: address_line_2}] : []),
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City", label: city_name},
      {key: "Pin Code", label: zip_code},
      {key: "Account Holder", label: account_holder},
      {key: "Account Number", label: account_no},
      {key: "Account Type", label: account_type},
      {key: "Bank Name", label: bank_name},
      {key: "Branch Code", label: branch_code},
      {key: "Branch Address", label: branch_address},
      {key: "ID Issued Country", label: id_issued_country?.country_name},
      {key: "ID Type", label: id_type},
      {key: "ID Number", label: id_number},
      ...(recipient_relationship
        ? [{key: "Sender's relationship with the Recipient", label: recipientRelationship}]
        : []),
    ]

    if (swift_code) recipientDetails.push({key: "Swift Code", label: swift_code})
    if (bsb_code) recipientDetails.push({key: "BSB Code", label: bsb_code})
    if (routing_code) recipientDetails.push({key: "Routing Code", label: routing_code})
    if (iban_no) recipientDetails.push({key: "IBAN Code", label: iban_no})

    return {recipientDetails}
  }, [transData])

  return {recipientDetails, recipient_id, isSamePerson, relationship}
}
