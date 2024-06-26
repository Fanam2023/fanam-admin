export type TypeUserRole = "user" | "crm" | "admin"

export type TypeAccount = "Individual" | "Business"

export type TypePurpose = "Education" | "Travel" | "Hospital" | "Insurance" | "Family_expense" | "Rental" | "Others"

export type TypeTransactionStatus =
  | "Transaction_initiated"
  | "Invoice_upload"
  | "Recipient_picked"
  | "Beneficiary_picked"
  | "Payment_initiated"
  | "Payment_pending"
  | "Payment_successful"
  | "Payment_failed"
