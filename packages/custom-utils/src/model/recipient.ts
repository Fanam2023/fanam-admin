export interface IRecipient {
  recipient_id: string
  recipient_name: string
  account_name?: string
  account_no?: string
  sender_type?: string
  account_type?: string
  bank_name?: string
  bank_code?: string
  bank_code_type?: string
  branch?: string
  bic?: string
  address?: string
  email?: string
  phone_no?: string
  country?: string
  state?: string
  city?: string
  zip_code?: string
  id?: string
}

export interface IRecipientDetails extends IRecipient {
  account_holder?: string
  account_no?: string
  confirm_account_no?: string
  iban_no?: string
  swift_code?: string
  routing_code?: string
}
