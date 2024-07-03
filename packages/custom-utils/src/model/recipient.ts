import {IFile, IFormData, JSONValues} from "@fanam-pkg/core-utils"
import {ICity, ICountry, IState} from "./location"

interface IBankAccount {
  account_no: string
  swift_code: string
  routing_code?: string
  bank_name: string
  branch_code: string
  branch_address: string
  account_type: string
  [key: string]: JSONValues
}

export interface IRecipient {
  first_name: string
  last_name: string
  email: string
  country: ICountry
  phone_no: string
  address_line1: string
  address_line2: string
  state: IState
  city: ICity
  zip_code: string
  transaction_id: string
  id_number: string
  id_type: string
  id_issued_country: ICountry
  recipient_id?: string
  bank_account: IBankAccount
}

export interface IBaseRecipientData {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  address_line1: string
  address_line2: string
  zip_code: string
  id_number: string
  id_type: string
}

export interface IRecipientData extends IBaseRecipientData {
  country: IFormData | null
  id_issued_country: IFormData | null
  state: IFormData | null
  city: IFormData | null
  account_type: IFormData[]
  account_no: string
  branch_code: string
  bank_name: string
  branch_address: string
  swift_code: string
  iban_no?: string
  routing_code?: string
  doc_data: IFile | null
}

export interface IPayloadRecipient extends IBaseRecipientData {
  country_id: number
  id_issued_country_id: number
  state_id: number
  city_id: number
  bank_account: IPayloadRecipientBankAccount
  transaction_id: string
}

export interface IPayloadUpdateRecipient extends IPayloadRecipient {
  recipient_id?: string
}

export interface IPayloadRecipientBankAccount {
  account_no: string
  account_type: string
  bank_name: string
  branch_code: string
  branch_address: string
  swift_code: string
  iban_no?: string
  routing_code?: string
}

export interface IResponseRecipientBankAccount extends IPayloadRecipientBankAccount {
  account_id: string
}
