import {IFormData} from "@fanam-pkg/core-utils"
import {useTranslation} from "react-i18next"
import {useEffect, useMemo} from "react"
import {useSingleton} from "hooks"
import {ID_PROOFS_INDIA, RELATION_SHIP_DATA} from "utils"

export const useHandler = () => {
  const {transData, refetchTransaction, transId} = useSingleton()
  const {t} = useTranslation()
  const {recipient_relationship, recipient_account_type} = transData || {}
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
    business_name,
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
    const recipientRelationship = RELATION_SHIP_DATA[relationship]?.label
    const idType = t(ID_PROOFS_INDIA.find(item => item.key === id_type)?.label)
    const recipientDetails: IFormData[] = [
      {key: t("Recipient type"), label: recipient_account_type},
      ...(business_name ? [{key: t("Business Name"), label: business_name}] : []),
      {key: t("First Name"), label: first_name},
      {key: t("Last Name"), label: last_name},
      {key: t("Email"), label: email},
      {key: t("Phone Number"), label: phone_no},
      {key: t("Address Line 1"), label: address_line_1},
      ...(address_line_2 ? [{key: t("Address Line 2"), label: address_line_2}] : []),
      {key: t("Country"), label: country_name},
      {key: t("State"), label: state_name},
      {key: t("City"), label: city_name},
      {key: t("Pincode"), label: zip_code},
      {key: t("Account Holder"), label: account_holder},
      {key: t("Account Number"), label: account_no},
      {key: t("Account Type"), label: account_type},
      {key: t("Bank Name"), label: bank_name},
      {key: t("Branch Code"), label: branch_code},
      {key: t("Branch Address"), label: branch_address},
      {key: t("ID Issued Country"), label: id_issued_country?.country_name},
      {key: t("ID Type"), label: idType},
      {key: t("ID Number"), label: id_number},
      ...(relationship ? [{key: t("Sender's relationship with the Recipient"), label: recipientRelationship}] : []),
    ]

    if (swift_code) recipientDetails.push({key: t("Swift Code"), label: swift_code})
    if (bsb_code) recipientDetails.push({key: t("BSB Code"), label: bsb_code})
    if (routing_code) recipientDetails.push({key: t("Routing Code"), label: routing_code})
    if (iban_no) recipientDetails.push({key: t("IBAN Code"), label: iban_no})

    return {recipientDetails}
  }, [transData])

  return {recipientDetails, recipient_id, isSamePerson, t}
}
