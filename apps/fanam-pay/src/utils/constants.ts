import {IFormData} from "@fanam-pkg/core-utils"
import assets from "assets"
import {IStepper} from "model"
import {BankCartProps, BankListProps, RecipientInfo} from "props"

export const SIDE_BAR: IStepper[] = [
  {
    title: "Sender Details",
    description: "Essential for verification and processing your transactions securely and efficiently.",
  },
  {
    title: "Add Recipient",
    description: "Enter the Recipient details and their account details.",
  },
  {
    title: "Add Beneficiary",
    description: "If your recipient and beneficiary are different, enter the beneficiary details.",
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

export const PURPOSES_INDIVIDUAL: IFormData[] = [
  {label: "Education", key: "Education"},
  {label: "Travel", key: "Travel"},
  {label: "Hospital", key: "Hospital"},
  {label: "Family Expense", key: "Family_expense"},
  {label: "Rental", key: "Rental"},
  {label: "Insurance", key: "Insurance"},
  {label: "Others", key: "Others"},
]

export const PURPOSES_BUSINESS: IFormData[] = [
  {label: "Working Capital", key: "Working_capital"},
  {label: "Rental", key: "Rental"},
  {label: "Salary", key: "Salary"},
  {label: "Others", key: "Others"},
]

export const RECIPIENT_INFO: RecipientInfo[] = [
  {label: "First Name", value: "Varshini J"},
  {label: "Last Name", value: "Patel"},
  {label: "Email", value: "Varshini123@gmail.com"},
  {label: "Phone Number", value: "6785674356"},
  {label: "Account Type", value: "Saving"},
  {label: "Account Number", value: "27379264923864"},
  {label: "Bank Name", value: "Swis Bank"},
  {label: "Bank Code Type", value: "United States"},
  {label: "Bank Code", value: "12344"},
  {label: "Branch", value: "California"},
  {label: "BIC", value: "United States"},
  {label: "Country", value: "United States"},
  {label: "State", value: "Alabama"},
  {label: "City/District", value: "Tuscaloosa"},
  {label: "Pin code", value: "35401"},
]

export const TRANSACTION_DETAILS: RecipientInfo[] = [
  {label: "You were going to send", value: "1,000 USD"},
  {label: "Transfer Fee", value: "200.00 USD"},
  {label: "Exchange Rate", value: "1,000 USD"},
]

export const ID_PROOFS = ["Passport", "Driving License", "Aadhaar"]
export const RELATION_SHIP = [
  "Father",
  "Mother",
  "Son",
  "Bother",
  "Sister",
  "Others",
  "Cousin",
  "Daughter",
  "Friend",
  "Uncle",
  "Aunty",
  "Grandmother",
  "Grandfather",
  "Sister_in_law",
  "Father_in_law",
  "Mother_in_law",
  "Brother_in_law",
  "Nephew",
  "Niece",
  "Not_applicable",
]

export const ACCOUNT_TYPE = ["Individual", "Business"]

export const BUSINESS_TYPE = ["Sole_proprietor", "Partnership_firm", "Companies", "Limited_liability_partnership"]

export const BANK_ACCOUNT_TYPE = ["Current", "Savings", "Overdraft"]
