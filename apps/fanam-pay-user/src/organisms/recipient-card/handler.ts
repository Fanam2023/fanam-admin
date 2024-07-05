import {useSingleton} from "hooks"

export const useHandler = () => {
  const {transData} = useSingleton()
  const recipient = transData?.recipient
  console.log(recipient)

  const recipientDetail = [
    {label: "First Name", value: recipient?.first_name},
    {label: "Last Name", value: recipient?.last_name},
    {label: "Address", value: recipient?.address_line1},
    {label: "Email", value: recipient?.email},
    {label: "Phone Number", value: recipient?.phone_no},
    {label: "Country", value: recipient?.country?.country_name},
    {label: "State", value: recipient?.state?.state_name},
    {label: "City", value: recipient?.city?.city_name},
    {label: "ZIP Code", value: recipient?.zip_code},
  ]

  const recipientAccountDetails = [
    {label: "Account Number", value: recipient?.bank_account?.account_no},
    {label: "Account Type", value: recipient?.bank_account?.account_type},
    {label: "Bank Name", value: recipient?.bank_account?.bank_name},
    {label: "Branch", value: recipient?.bank_account?.branch_code},
    {label: "BIC", value: recipient?.bank_account?.swift_code},
  ]

  return {
    recipientDetail,
    recipientAccountDetails,
  }
}
