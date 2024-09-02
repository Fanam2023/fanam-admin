import {IFormData} from "@fanam-pkg/core-utils"
import {useMemo} from "react"
import {useSingleton} from "hooks"

export const useHandler = () => {
  const {transData} = useSingleton()
  const {first_name, last_name, address, email, country, zip_code, state, city, account_no, phone_no} =
    transData?.beneficiary || {}

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
      {key: "ZIP Code", label: zip_code},
      {key: "Account Number", label: account_no},
    ]

    return {beneficiaryDetails}
  }, [transData])

  return {beneficiaryDetails}
}
