import assets from "assets"
import {IStepper} from "model"
import {BankCartProps, BankListProps, RecipientPreviewProps} from "props"

export const RECIPIENTDETAILS: RecipientPreviewProps[] = [
  {label: "Name", value: "Ragul"},
  {label: "E-mail Address", value: "ragul@gmail.com"},
  {label: "Country", value: "India"},
  {label: "State", value: "Tamil Nadu"},
  {label: "City", value: "Coimbatore"},
  {label: "Zip Code", value: "641023"},
  {label: "Phone Number", value: "6383xxxx28"},
]

export const ACCOUNTDETAILS: RecipientPreviewProps[] = [
  {label: "Account Number", value: "Varshini"},
  {label: "IBAN Number", value: "varshini@gmail.com"},
  {label: "Swift Code", value: "8884121455"},
  {label: "Routing Code", value: "55574545855"},
  {label: "Recipient Address", value: "Toranto"},
  {label: "Bank Name", value: "Bank of America"},
  {label: "Branch Address", value: "Toranto"},
]

export const SIDE_BAR: IStepper[] = [
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
