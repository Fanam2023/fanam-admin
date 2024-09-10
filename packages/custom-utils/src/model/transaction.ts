import {IFile, IFormData} from "@fanam-pkg/core-utils"
import {IAttachment, IBeneficiary, ICountry, IRecipient, IUser, TypeAccount, TypePurpose} from "../model"

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
  invoice: IAttachment[]
  recipient: IRecipient
  recipient_relationship: string
  beneficiary: IBeneficiary
  status?: string
  created_at?: string
}

export interface ITransactionDetails extends ITransaction {
  month: string
  date: string
  paymentId: string
  paymentMode: string
  paymentDuration: string
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
  sender: IUser
  recipient: IRecipient
  sender_transactions: ITransaction[]
  recipient_transaction: ITransaction[]
  created_at: string
  updated_at: string
}

export interface IPayloadFxRate {
  source_amount?: string
  destination_amount?: string
  source_country_code: string
  destination_country_code: string
}

export interface IResponseFxRate {
  conversion_rate: number
  source_amount: string
  destination_amount: string
  markup_fee: number
  quote_id: number
}

export interface IBaseTransactionData {
  source_amount: string
  destination_amount: string
  reason: string
}

export interface IPayloadTransaction extends IBaseTransactionData {
  source_country_id: number
  destination_country_id: number
  sender_account_type: string
  recipient_account_type: string
  purpose: string
}

export interface ITransactionData extends IBaseTransactionData {
  destination_country: ICountry | null
  purpose: IFormData | null
  recipient_account_type: IFormData[]
}

export interface IInvoiceData {
  invoice: IFile[]
}

export interface IMergeRecipientData {
  is_same_person: IFormData | null
  recipient_relationship: string
}

export interface IPayloadMergeRecipient {
  is_same_person: boolean
  recipient_relationship: string
}

export interface ITransactionPurpose {
  purpose: IFormData | null
  reason: string
  doc: IFile[]
}

export interface IPayloadTransactionPurpose {
  purpose: string
  reason: string
  doc?: IFile[]
}
