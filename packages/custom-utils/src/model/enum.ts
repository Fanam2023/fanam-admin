export type TypeUserRole = "user" | "crm" | "admin"

export type TypeAccount = "Individual" | "Business"

export type TypeBankAccount = "Current" | "Savings" | "Overdraft"

export type TypeBusiness = "Sole_proprietor" | "Partnership_firm" | "Companies" | "Limited_liability_partnership"

export type TypePurpose =
  | "Tuition_fee"
  | "Travel"
  | "Hospital"
  | "Insurance"
  | "Living_expense"
  | "Rent"
  | "Retail"
  | "Payroll_and_pension"
  | "Import_and_export"
  | "Legal_fees"
  | "Others"

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
