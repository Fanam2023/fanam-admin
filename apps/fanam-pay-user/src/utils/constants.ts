import {IFormData} from "@fanam-pkg/core-utils"
import assets from "assets"
import {IStepper} from "model"
import {BankCartProps, BankListProps, RecipientPreviewProps} from "props"

export const RECIPIENT_DETAILS: RecipientPreviewProps[] = [
  {label: "First Name", value: "Ragul"},
  {label: "Last Name", value: "ragul@gmail.com"},
  {label: "Recipient Address Line 1", value: "6383xxxx28"},
  {label: "Email", value: "6383xxxx28"},
  {label: "Phone Number", value: "6383xxxx28"},
  {label: "Country", value: "6383xxxx28"},
  {label: "State", value: "6383xxxx28"},
  {label: "City", value: "6383xxxx28"},
  {label: "ZIP Code", value: "6383xxxx28"},
]

export const RECIPIENT_ACCOUNT_DETAILS: RecipientPreviewProps[] = [
  {label: "Account Number", value: "India"},
  {label: "Account Type", value: "Tamil Nadu"},
  {label: "Bank Name", value: "Coimbatore"},
  {label: "Bank Code", value: "641023"},
  {label: "Bank Code Type", value: "6383xxxx28"},
  {label: "Branch", value: "6383xxxx28"},
  {label: "BIC", value: "6383xxxx28"},
]

export const SIDE_BAR: IStepper[] = [
  {
    title: "Add Sender Details",
    description: "Enter Sender Details",
  },
  {
    title: "Cross Border Remittance",
    description:
      "Get your conversion estimate. Provide sender and recipient type along with the purpose of sending money.",
  },
  {
    title: "Upload Document",
    description: "Upload the supporting document related to the purpose of sending money.",
  },
  {
    title: "Recipient Details",
    description: "Enter the Recipient details and their account details.",
  },
  {
    title: "Recipient Review Details",
    description: "Review the details of the recipient details and their account details.",
  },
  {
    title: "Beneficiary Details",
    description: "If your recipient and beneficiary are different, enter the beneficiary details.",
  },
  {
    title: "Mode of Payment",
    description: "Choose the payment option from the list.",
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
  "GrandMother",
  "GrandFather",
  "Sister in law",
  "Father in law",
  " Mother in law",
  "Brother in law",
  "Nephew",
  "Niece",
  " Not Applicable",
]
