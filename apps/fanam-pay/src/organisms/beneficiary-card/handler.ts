import {IFormData} from "@fanam-pkg/core-utils"
import {useTranslation} from "react-i18next"
import {useMemo} from "react"
import {useSingleton} from "hooks"
import {RELATION_SHIP_DATA} from "utils"

export const useHandler = () => {
  const {transData} = useSingleton()
  const {t} = useTranslation()
  const {
    first_name,
    last_name,
    address,
    email,
    country,
    zip_code,
    relationship,
    state,
    city,
    account_no,
    phone_no,
    beneficiary_id,
    notes,
  } = transData?.beneficiary || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}

  const {beneficiaryDetails} = useMemo(() => {
    const relationshipLabel = RELATION_SHIP_DATA[relationship]?.label
    const beneficiaryDetails: IFormData[] = [
      {key: t("First Name"), label: first_name},
      {key: t("Last Name"), label: last_name},
      {key: t("Address"), label: address},
      {key: t("Email"), label: email},
      {key: t("Phone Number"), label: phone_no},
      {key: t("Country"), label: country_name},
      {key: t("State"), label: state_name},
      {key: t("City"), label: city_name},
      {key: t("Pincode"), label: zip_code},
      {key: t("Sender's relationship with the Beneficiary"), label: relationshipLabel},
    ]

    if (account_no) beneficiaryDetails.push({key: t("Account Number"), label: account_no})
    if (notes) beneficiaryDetails.push({key: "Notes", label: notes})

    return {beneficiaryDetails}
  }, [transData])

  return {beneficiaryDetails, beneficiary_id, t}
}
