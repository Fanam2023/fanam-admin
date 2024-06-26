export interface IRecipient {
  recipient_id?: string
  recipient_name?: string
  email?: string
  country_code?: string
  phone_no?: string
  address?: string
  country?: string
  state?: string
  city?: string
  zip_code?: string
}

export interface IRecipientDetails extends IRecipient {
  account_holder?: string
  account_no?: string
  confirm_account_no?: string
  iban_no?: string
  swift_code?: string
  routing_code?: string
}
