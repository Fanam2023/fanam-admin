import {IFile, IFormData} from "@fanam-pkg/core-utils"
import {IAttachment} from "./common"
import {TypeAccount, TypeBankAccount, TypeBranchCode} from "./enum"
import {ICity, ICountry, IState} from "./location"
import {IBankAccount} from "./transaction"

export interface IRecipient {
  account_type?: TypeAccount
  first_name: string
  last_name: string
  email: string
  country: ICountry
  phone_no: string
  address_line_1: string
  address_line_2?: string
  state: IState
  city: ICity
  zip_code: string
  transaction_id: string
  id_number: string
  id_type: string
  id_issued_country: ICountry
  recipient_id?: string
  bank_account: IBankAccount
  recipient_account_type: TypeAccount
  kyc_attachments: IAttachment[]
  business_name: string
}

export interface IBaseRecipientData {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  address_line_1: string
  address_line_2?: string
  zip_code: string
  id_number: string
  id_type: string
  kyc?: IFile[]
}

export interface IRecipientData extends IBaseRecipientData {
  recipient_account_type?: TypeAccount
  country: IFormData<number> | null
  id_issued_country: IFormData<number> | null
  state: IFormData<number> | null
  city: IFormData<number> | null
  account_no: string
  branch_code: string
  bank_name: string
  branch_address: string
  swift_code: string
  iban_no?: string
  routing_code?: string
  account_type: TypeBankAccount
  business_name: string
  branch_type: TypeBranchCode
}

export interface IPayloadRecipient extends IBaseRecipientData {
  country_id: number
  id_issued_country_id: number
  state_id: number
  city_id: number
  bank_account: IPayloadRecipientBankAccount
  transaction_id?: string
  recipient_account_type?: string
  business_name: string
  branch_type: TypeBranchCode
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
  bank_code_type: string
}

export interface IResponseRecipientBankAccount extends IPayloadRecipientBankAccount {
  account_id: string
}
