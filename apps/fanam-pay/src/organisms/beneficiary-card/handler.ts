import {IFormData} from "@fanam-pkg/core-utils"
import {useMemo} from "react"
import {useSingleton} from "hooks"

export const useHandler = () => {
  const {transData} = useSingleton()
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
    const beneficiaryDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Address", label: address},
      {key: "Email", label: email},
      {key: "Phone Number", label: phone_no},
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City", label: city_name},
      {key: "Pin Code", label: zip_code},
      {key: "Sender's relationship with the Beneficiary", label: relationship},
    ]

    if (account_no) beneficiaryDetails.push({key: "Account Number", label: account_no})
    if (notes) beneficiaryDetails.push({key: "Notes", label: notes})

    return {beneficiaryDetails}
  }, [transData])

  return {beneficiaryDetails, beneficiary_id}
}
