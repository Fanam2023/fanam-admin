import {IFormData, JSONValues} from "@fanam-pkg/core-utils"

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
  id_issued_country: string
  recipient_id?: string
  bank_account: IBankAccount
}

export interface IBaseSycRecipient {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  bank_code?: string
  bank_code_type?: string
  bank_name?: string
  branch?: string
  bic?: string
  address_line1: string
  address_line2: string
  zip_code: string
  id_number: string
  id_type?: string
  recipient_id?: string
  transaction_id?: string
}

export interface ISycRecipient extends IBaseSycRecipient {
  country: IFormData | null
  id_issued_country: IFormData | null
  state: IFormData | null
  city: IFormData | null
  account_type: IFormData[]
  account_no: string
}

export interface IPayloadSyncRecipient extends IBaseSycRecipient {
  country_id: number
  id_issued_country_id: number
  state_id: number
  city_id: number
  bank_account: IPayloadRecipientBankAccount
}

export interface IPayloadRecipientBankAccount {
  account_no: string
  account_type: string
  bank_name: string
  branch: string
  branch_address: string
  swift_code: string
  bank_code: string
  [key: string]: JSONValues
}

export interface IResponseRecipientBankAccount extends IPayloadRecipientBankAccount {
  account_id: string
}
