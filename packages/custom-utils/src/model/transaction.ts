import {IFile, IFormData} from "@fanam-pkg/core-utils"
import {
  IAttachment,
  IBeneficiary,
  ICountry,
  IRecipient,
  IResponseOrder,
  IUser,
  TypeAccount,
  TypeOrderStatus,
  TypePurpose,
  TypeRelation,
} from "../model"

export interface ITransaction {
  transaction_id: string
  sender_account_type: TypeAccount
  recipient_account_type: TypeAccount
  source_country: ICountry
  destination_country: ICountry
  source_amount: number
  destination_amount: number
  markup_fee: number
  other_fee?: number
  exchange_amount?: number
  final_amount?: number
  purpose: TypePurpose
  reason: string
  invoice: IAttachment[]
  recipient: IRecipient
  recipient_relationship: string
  beneficiary: IBeneficiary
  order?: IResponseOrder
  transfer_time?: ITransferTime
  created_at?: string
  paymentMode?: string
  expiration_time?: string
}

export interface ITransactionDetails extends ITransaction {
  month: string
  date: string
  paymentId: string
  paymentDuration: string
}

export interface IQueryTransaction {
  status: IFormData<TypeOrderStatus | "">
  date: string
}

export interface IBankAccount {
  bank_account_id: string
  account_no: string
  account_holder: string
  email: string
  country_code: string
  phone_no: string
  iban_no?: string
  swift_code?: string
  routing_code?: string
  bsb_code?: string
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

export type TypeNetworkFX = "Visa" | "Master_card"

export type TypeNetworkTransfer = "Visa" | "Master_card"

export interface ITransferTime {
  transfer_time_id: string
  fx_rate_network: TypeNetworkFX
  transfer_network: TypeNetworkTransfer
  sla_timing_min: number
  sla_timing_max: number
  exchange_rate: string
  destination_amount: string
  conversion_rate: string
  markup_fee: string
  other_fees: string
  final_rate: string
  is_recommended: boolean
  is_exclude_other_fees: boolean
  quote_id?: number | string
}

export interface IResponseFxRate {
  destinationCountry: ICountry
  sourceCountry: ICountry
  transfer_times: ITransferTime[]
}

export interface IBaseTransactionData {
  source_amount: string
  destination_amount: string
}

export interface IPayloadTransaction {
  source_country_id: number
  destination_country_id: number
  transfer_time_id: string
  visa_quote_id?: string
  exchange_amount: string
  destination_amount: string
}

export interface ITransactionData extends IBaseTransactionData {
  source_country: ICountry | null
  destination_country: ICountry | null
}

export interface IInvoiceData {
  invoice: IFile[]
}

export interface IMergeRecipientData {
  is_same_person: IFormData | null
  recipient_relationship: IFormData<TypeRelation>
}

export interface IPayloadMergeRecipient {
  is_same_person: boolean
  recipient_relationship: TypeRelation
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
