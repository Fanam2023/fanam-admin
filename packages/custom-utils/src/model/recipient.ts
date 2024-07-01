import {JSONValues} from "@fanam-pkg/core-utils"

interface IBankAccount {
  account_no: string
  swift_code: string
  routing_code?: string
  bank_name: string
  branch_code: string
  branch_address: string
  account_type: string
  account_purpose?: string
  [key: string]: JSONValues
}

export interface IRecipient {
  recipient_name: string
  email: string
  country_code: string
  phone_no: string
  sender_type?: string
  address_line1: string
  address_line2: string
  state: string
  city: string
  zip_code: string
  transaction_id: string
  id: string
  recipient_id?: string
  bank_account: IBankAccount
}
