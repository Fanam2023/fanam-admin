import {IFormData} from "@fanam-pkg/core-utils"
import {IBeneficiary, ICountry, IRecipient, IUser, TypeAccount, TypePurpose, TypeTransactionStatus} from "../model"

export interface ITransaction {
  transaction_id: string
  sender_account_type: TypeAccount
  recipient_account_type: TypeAccount
  source_country: ICountry
  destination_country: ICountry
  source_amount: number
  destination_amount: number
  markup_fee: number
  purpose: TypePurpose
  reason: string
  status: TypeTransactionStatus
  sender_bank_account: IBankAccount
  recipient_bank_account: IBankAccount
  beneficiary: IBeneficiary
  created_by: IUser
}

export interface IBankAccount {
  bank_account_id: string
  account_no: string
  account_holder: string
  email: string
  country_code: string
  phone_no: string
  iban_no: string
  swift_code: string
  routing_code: string
  bank_name: string
  branch_code: string
  branch_address: string
  currency: string
  account_type: TypeAccount
  account_purpose: TypePurpose
  sender: IUser
  recipient: IRecipient
  sender_transactions: ITransaction[]
  recipient_transaction: ITransaction[]
  created_at: string
  updated_at: string
}

export interface IPayloadFxRate {
  source_amount: string
  source_country_code: string
  destination_country_code: string
}

export interface IResponseFxRate {
  source_country: ICountry
  destination_country: ICountry
  conversion_rate: number | null
  source_amount: number | null
  destination_amount: number | null
}

export interface IBaseTransactionData {
  source_amount: string
  destination_amount: string
  purpose: string
  reason: string
}

export interface IPayloadTransaction extends IBaseTransactionData {
  source_country_id: number
  destination_country_id: number
  sender_account_type: string
  recipient_account_type: string
}

export interface ITransactionData extends IBaseTransactionData {
  destination_country: ICountry | null
  recipient_account_type: IFormData[]
}
