import {IFormData} from "@fanam-pkg/core-utils"
import {useMemo} from "react"
import {ITransaction} from "@custom/utils"
import {useCommon} from "hooks"

export const useHandler = (transaction: ITransaction) => {
  const {getFirstLetter} = useCommon()

  const {recipient, recipient_relationship} = transaction || {}
  const {first_name, last_name, email, phone_no, bank_account, country, state, city, zip_code} = recipient || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {account_no, account_type, bank_name, branch_code, swift_code} = bank_account || {}

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
      {key: "BIC", label: swift_code},
      {key: "Country", label: country_name},
      {key: "State", label: state_name},
      {key: "City/District", label: city_name},
      {key: "Zip Code", label: zip_code},
      {key: "Recipient Relationship", label: recipient_relationship},
    ]
    return {recipientDetails}
  }, [transaction])

  return {
    recipientDetails,
    getFirstLetter,
  }
}
