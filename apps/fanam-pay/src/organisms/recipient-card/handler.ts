import {IFormData} from "@fanam-pkg/core-utils"
import {useEffect, useMemo} from "react"
import {useSingleton} from "hooks"

export const useHandler = () => {
  const {transData, refetchTransaction, transId} = useSingleton()
  const {first_name, last_name, address, email, phone_no, bank_account, country, state, city, zip_code, recipient_id} =
    transData?.recipient || {}

  const {country_name} = country || {}
  const {state_name} = state || {}
  const {city_name} = city || {}
  const {account_no, account_type, bank_name, branch_code, swift_code} = bank_account || {}

  useEffect(() => {
    if (transId) refetchTransaction()
  }, [])

  const {recipientDetails} = useMemo(() => {
    const recipientDetails: IFormData[] = [
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
      {key: "Account Type", label: account_type},
      {key: "Bank Name", label: bank_name},
      {key: "Branch", label: branch_code},
      {key: "BIC", label: swift_code},
    ]

    return {recipientDetails}
  }, [transData])

  return {recipientDetails, recipient_id}
}
