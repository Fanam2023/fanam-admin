export type TypeUserRole = "user" | "crm" | "admin"

export type TypeAccount = "Individual" | "Business"

export type TypeBankAccount = "Current" | "Savings" | "Overdraft"

export type TypeBankCode = "Swift" | "BSB" | "Routing" | "IBAN"

export type TypeBusiness = "Sole_proprietor" | "Partnership_firm" | "Companies" | "Limited_liability_partnership"

export type TypePurpose =
  | "Tuition_fee"
  | "Travel"
  | "Hospital"
  | "Insurance"
  | "Living_expenses"
  | "Rent"
  | "Retail"
  | "Payroll_and_pension"
  | "Import_and_export"
  | "Legal_fees"
  | "Others"
  | "Goods_purchase"

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

export type TypeOKycCode =
  | "complete"
  | "incomplete"
  | "invalid_redirect_url"
  | "exceeded_captcha_requests"
  | "otp_sent"
  | "invalid_captcha_entered"
  | "invalid_sequence"
  | "request_not_found"
  | "internal_server_error"

export type TypeKYC = "Aadhaar" | "PAN" | "GST" | "Passport" | "Driving_License"

export type TypeRelation =
  | "Father"
  | "Mother"
  | "Son"
  | "Brother"
  | "Sister"
  | "Others"
  | "Cousin"
  | "Daughter"
  | "Friend"
  | "Uncle"
  | "Aunty"
  | "Grandmother"
  | "Grandfather"
  | "Sister_in_law"
  | "Father_in_law"
  | "Mother_in_law"
  | "Brother_in_law"
  | "Nephew"
  | "Niece"
  | "Not_applicable"

export type TypeOrderStatus =
  | "Payment_in_transition"
  | "Transaction_canceled"
  | "Transaction_pending"
  | "Transaction_success"
  | "Transaction_failed"
  | "Refund_initiated"
  | "Refund_in_progress"
  | "Refunded_successfully"
  | "Refund_failed"

export type TypeSignOut = "logout" | "forgot-pin" | "logout-all"

export type TypeBusinessKYC =
  | "Address_proof"
  | "Identity_proof"
  | "Business_proof"
  | "Authority_proof"
  | "Identity_and_address_proof"
