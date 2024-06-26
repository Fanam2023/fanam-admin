export interface ITransaction {
  sender_account_type: string
  recipient_account_type: string
  source_currency: string
  destination_currency: string
  source_amount: string
  destination_amount: string
  purpose: string
}
