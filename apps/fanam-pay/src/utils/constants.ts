import {IFormData} from "@fanam-pkg/core-utils"
import {TypeAccount, TypeOrderStatus, TypePurpose, TypeRelation} from "@custom/utils"
import assets from "assets"
import {IStepper} from "model"
import {BankCartProps, BankListProps} from "props"

export const SIDE_BAR: IStepper[] = [
  {
    title: "Add or Select Recipient",
    description: "Enter the Recipient details and their account details.",
  },
  {
    title: "Add or Select Beneficiary",
    description: "If your recipient and beneficiary are different, enter the beneficiary details.",
  },
  {
    title: "Purpose of Sending Money",
    description: "Briefly describe the reason for your transfer for accurate processing and compliance.",
  },
  {
    title: "Payout Estimate",
    description:
      "Estimated value for converting your money from one currency to another based on the current exchange rates.",
  },
  {
    title: "Review and Send",
    description: "Review the details of the recipient details and their account details.",
  },
  {
    title: "Payment Status",
    description: "Get the payment status after sending the money.",
  },
]

export const LIST_OF_BANK: BankListProps[] = [
  {
    icon: assets.img_bank,
    bankName: "Axis Bank",
    accountType: "Savings Account",
  },
  {
    icon: assets.img_bank,
    bankName: "Indian Bank",
    accountType: "Savings Account",
  },
  {
    icon: assets.img_bank,
    bankName: "SBI",
    accountType: "Current Account",
  },
]

export const LIST_OF_CART: BankCartProps[] = [
  {
    icon: assets.img_bank,
    bankName: "Axis Bank",
    cartType: "Debit Card",
  },
  {
    icon: assets.img_bank,
    bankName: "Indian Bank",
    cartType: "Debit Card",
  },
  {
    icon: assets.img_bank,
    bankName: "SBI",
    cartType: "Credit Card",
  },
]

export const PURPOSES_INDIVIDUAL: IFormData<TypePurpose>[] = [
  {label: "Education", key: "Tuition_fee"},
  {label: "Family Expense", key: "Living_expense"},
  {label: "Rental", key: "Rent"},
  {label: "Insurance", key: "Insurance"},
  {label: "Others", key: "Others"},
  {label: "Retail Business", key: "Retail"},
]

export const PURPOSES_BUSINESS: IFormData<TypePurpose>[] = [
  {label: "Import and Export", key: "Import_and_export"},
  {label: "Legal Charges", key: "Legal_fees"},
  {label: "Insurance", key: "Insurance"},
  {label: "Rental", key: "Rent"},
  {label: "Salary", key: "Payroll_and_pension"},
  {label: "Others", key: "Others"},
]

export const TRANSACTION_STATUS_OBJECT: Record<TypeOrderStatus, IFormData<TypeOrderStatus>> = {
  Payment_initiated: {label: "Payment Initiated"},
  Payment_failed: {label: "Payment Failure"},
  Payment_rejected: {label: "Payment Rejected"},
  Payment_in_transition: {label: "Payment In Transition"},
  Transaction_canceled: {label: "Transaction Canceled"},
  Transaction_failed: {label: "Transaction Failed"},
  Transaction_pending: {label: "Transaction Pending"},
  Transaction_rejected: {label: "Transaction Rejected"},
  Transaction_returned: {label: "Transaction Returned"},
  Transaction_success: {label: "Transaction Success"},
  Refund_initiated: {label: "Refund Initiated"},
  Refund_in_progress: {label: "Refund In Progress"},
  Refunded_successfully: {label: "Refunded Successfully"},
  Refund_failed: {label: "Refund Failed"},
}

export const ID_PROOFS = ["Passport", "Driving license", "Bank passbook"]

export const ACCOUNT_TYPE: IFormData<TypeAccount>[] = [
  {label: "Individual", key: "Individual"},
  {label: "Business", key: "Business"},
]

export const BUSINESS_TYPE = ["Sole_proprietor", "Partnership_firm", "Companies", "Limited_liability_partnership"]

export const BANK_ACCOUNT_TYPE = ["Current", "Savings", "Overdraft"]

export const BANK_BRANCH_TYPE = ["Sort", "Swift", "BSB", "Routing", "IFSC", "IBAN"]

export const RELATION_SHIP: IFormData<TypeRelation>[] = [
  {key: "Father", label: "Father"},
  {key: "Mother", label: "Mother"},
  {key: "Son", label: "Son"},
  {key: "Brother", label: "Brother"},
  {key: "Sister", label: "Sister"},
  {key: "Others", label: "Others"},
  {key: "Cousin", label: "Cousin"},
  {key: "Daughter", label: "Daughter"},
  {key: "Friend", label: "Friend"},
  {key: "Uncle", label: "Uncle"},
  {key: "Aunty", label: "Aunty"},
  {key: "Grandmother", label: "GrandMother"},
  {key: "Grandfather", label: "GrandFather"},
  {key: "Sister_in_law", label: "SisterInLaw"},
  {key: "Father_in_law", label: "FatherInLaw"},
  {key: "Mother_in_law", label: "MotherInLaw"},
  {key: "Brother_in_law", label: "BrotherInLaw"},
  {key: "Nephew", label: "Nephew"},
  {key: "Niece", label: "Niece"},
  {key: "Not_applicable", label: "NotApplicable"},
]

export const PROFILE_ARR: IFormData[] = [
  {
    label: "Profile",
    icon: assets.ic_profile,
  },
  {
    label: "Security Settings",
    icon: assets.ic_white_security,
  },
  {
    label: "Notification",
    icon: assets.ic_notify,
  },
]

export const SECURITY_ARR: IFormData[] = [
  {
    label: "Change PIN",
    icon: assets.ic_pin,
  },
  {
    label: "Change Email",
    icon: assets.ic_email,
  },
  {
    label: "Log out of all devices",
    icon: assets.ic_logout,
  },
]

export const NOTIFY: IFormData[] = [
  {label: "Allow Notification"},
  {label: "Login Alert"},
  {label: "Password Change Alert"},
  {label: "Suspicious Activity Alert"},
  {label: "Promotions and Offers"},
]
