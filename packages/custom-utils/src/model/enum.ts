export type TypeUserRole = "user" | "crm" | "admin"

export type TypeAccount = "Individual" | "Business"

export type TypeBankAccount = "Current" | "Savings"

export type TypeBusiness = "Sole_proprietor" | "Partnership_firm" | "Companies" | "Limited_liability_partnership"

export type TypePurpose = "Education" | "Travel" | "Hospital" | "Insurance" | "Family_expense" | "Rental" | "Others"

export type TypeStatus = "Active" | "Blocked" | "locked" | "In_active"

export type TypeTransactionStatus =
  | "Transaction_initiated"
  | "Invoice_upload"
  | "Recipient_picked"
  | "Beneficiary_picked"
  | "Payment_initiated"
  | "Payment_pending"
  | "Payment_successful"
  | "Payment_failed"

export type TypeScope = "reset" | "singup"
