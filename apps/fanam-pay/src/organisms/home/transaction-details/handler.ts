import {IFormData} from "@fanam-pkg/core-utils"
import {useMemo} from "react"
import {ITransaction} from "@custom/utils"
import {useCommon} from "hooks"

export const useHandler = (transaction: ITransaction) => {
  const {getFirstLetter} = useCommon()

  const {recipient} = transaction || {}
  const {first_name, last_name, address_line_1, email, phone_no, bank_account, country, state, city, zip_code} =
    recipient || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {account_no, account_type, bank_name, branch_code, swift_code} = bank_account || {}

  const {recipientDetails} = useMemo(() => {
    const recipientDetails: IFormData[] = [
      {key: "First Name", label: first_name},
      {key: "Last Name", label: last_name},
      {key: "Address", label: address_line_1},
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
    return {recipientDetails}
  }, [transaction])

  return {
    recipientDetails,
    getFirstLetter,
  }
}
