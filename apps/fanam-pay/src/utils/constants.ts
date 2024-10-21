import {IFormData} from "@fanam-pkg/core-utils"
import {TypeAccount, TypeBusiness, TypeKYC, TypeOrderStatus, TypeProof, TypePurpose, TypeRelation} from "@custom/utils"
import assets from "assets"
import {IStepper} from "model"
import {BankCartProps, BankListProps, ProfileNavItemProps} from "props"

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
  {label: "Tuition fee", key: "Tuition_fee"},
  {label: "Living expenses", key: "Living_expenses"},
  {label: "Rent", key: "Rent"},
  {label: "Insurance", key: "Insurance"},
  {label: "Retail", key: "Retail"},
  {label: "Hospital", key: "Hospital"},
  {label: "Travel", key: "Travel"},
  {label: "Others", key: "Others"},
]

export const PURPOSES_BUSINESS: IFormData<TypePurpose>[] = [
  {label: "Import and Export", key: "Import_and_export"},
  {label: "Legal fees", key: "Legal_fees"},
  {label: "Insurance", key: "Insurance"},
  {label: "Rent", key: "Rent"},
  {label: "Payroll and pension", key: "Payroll_and_pension"},
  {label: "Goods Purchase", key: "Goods_purchase"},
  {label: "Others", key: "Others"},
]

export const TRANSACTION_STATUS_OBJECT: Record<TypeOrderStatus, IFormData<TypeOrderStatus>> = {
  Payment_in_transition: {label: "Payment In Transition"},
  Transaction_canceled: {label: "Transaction Canceled"},
  Transaction_failed: {label: "Transaction Failed"},
  Transaction_pending: {label: "Transaction Pending"},
  Transaction_success: {label: "Transaction Success"},
  Refund_initiated: {label: "Refund Initiated"},
  Refund_in_progress: {label: "Refund In Progress"},
  Refunded_successfully: {label: "Refunded Successfully"},
  Refund_failed: {label: "Refund Failed"},
}

export const ID_PROOFS: IFormData<TypeKYC>[] = [
  {label: "Passport", key: "Passport"},
  {label: "Driving license", key: "Driving_License"},
  {label: "Bank passbook", key: "Passbook"},
]

export const ID_PROOFS_INDIA: IFormData<TypeKYC>[] = [
  {label: "Passport", key: "Passport"},
  {label: "Driving license", key: "Driving_License"},
  {label: "Bank passbook", key: "Passbook"},
  {label: "Aadhaar Card", key: "Aadhaar"},
  {label: "PAN Card", key: "PAN"},
  {label: "GST Certificate", key: "GST"},
]

export const ACCOUNT_TYPE: IFormData<TypeAccount>[] = [
  {label: "Individual", key: "Individual"},
  {label: "Business", key: "Business"},
]

export const BUSINESS_TYPE: IFormData<TypeBusiness>[] = [
  {key: "Sole_proprietor", label: "Sole Proprietor"},
  {key: "Partnership_firm", label: "Partnership Firm"},
  {key: "Companies", label: "Companies"},
  {key: "Limited_liability_partnership", label: "Limited Liability Partnership"},
]

export const BANK_ACCOUNT_TYPE = ["Current", "Savings", "Overdraft"]

export const BANK_BRANCH_TYPE = ["Sort", "Swift", "BSB", "Routing", "IFSC", "IBAN"]

export const RELATION_SHIP_DATA: Record<TypeRelation, IFormData<TypeRelation>> = {
  Father: {key: "Father", label: "Father"},
  Mother: {key: "Mother", label: "Mother"},
  Son: {key: "Son", label: "Son"},
  Brother: {key: "Brother", label: "Brother"},
  Sister: {key: "Sister", label: "Sister"},
  Cousin: {key: "Cousin", label: "Cousin"},
  Daughter: {key: "Daughter", label: "Daughter"},
  Friend: {key: "Friend", label: "Friend"},
  Uncle: {key: "Uncle", label: "Uncle"},
  Aunty: {key: "Aunty", label: "Aunty"},
  Grandmother: {key: "Grandmother", label: "Grand mother"},
  Grandfather: {key: "Grandfather", label: "Grand father"},
  Sister_in_law: {key: "Sister_in_law", label: "Sister-in-law"},
  Father_in_law: {key: "Father_in_law", label: "Father-in-law"},
  Mother_in_law: {key: "Mother_in_law", label: "Mother-in-law"},
  Brother_in_law: {key: "Brother_in_law", label: "Brother-in-law"},
  Nephew: {key: "Nephew", label: "Nephew"},
  Niece: {key: "Niece", label: "Niece"},
  Not_applicable: {key: "Not_applicable", label: "Not Applicable"},
  Others: {key: "Others", label: "Others"},
}

export const RELATION_SHIP: IFormData<TypeRelation>[] = Object.values(RELATION_SHIP_DATA)

export const PROFILE_ARR: ProfileNavItemProps[] = [
  {
    label: "Profile",
    icon: assets.ic_profile,
    selectedIcon: assets.ic_white_profile,
  },
  {
    label: "Security Settings",
    icon: assets.ic_black_security,
    selectedIcon: assets.ic_white_security,
  },
  {
    label: "Notification",
    icon: assets.ic_notify,
    selectedIcon: assets.ic_white_notify,
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
    label: "Log Out",
    icon: assets.ic_logout,
  },
  {
    label: "Log Out of all devices",
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

export const CONFIG_BUSINESS_PROOF: Record<TypeBusiness, Record<TypeProof, IFormData[]>> = {
  Sole_proprietor: {
    identity_proof: [
      {label: "Passport", key: "Passport"},
      {label: "Driving License", key: "Driving_License"},
      {label: "PAN Card", key: "PAN"},
      {label: "Voter's Identity Card", key: "Voter_id"},
      {label: "Job Card issued by NREGA", key: "Job_card"},
      {
        label: "Letter issued by the National Population Register",
        key: "NPR_letter",
      },
    ],
    address_proof: [
      {label: "Passport", key: "Passport"},
      {label: "Driving License", key: "Driving_License"},
      {label: "PAN Card", key: "PAN"},
      {label: "Voter's Identity Card", key: "Voter_id"},
      {label: "Job Card issued by NREGA", key: "Job_card"},
      {
        label: "Letter issued by the National Population Register",
        key: "NPR_letter",
      },
      {label: "Utility Bill", key: "Utility_bill"},
      {label: "Bank Statement", key: "Bank_statement"},
    ],
    business_proof: [
      {label: "Registration certificate (if registered)", key: "Registration_certificate"},
      {
        label: "Certificate/license issued by the municipal authorities under Shop & Establishment Act",
        key: "Shop_license",
      },
      {label: "Sales and income tax returns", key: "Tax_returns"},
      {label: "CST certificate (provisional/final)", key: "CST"},
      {label: "VAT certificate (provisional/final)", key: "VAT"},
      {label: "GST certificate (provisional/final)", key: "GST"},
      {
        label: "Certificate/registration document issued by Sales Tax/Service Tax/Professional Tax authorities",
        key: "Tax_registration",
      },
    ],
    authority_proof: [],
    partners_proof: [],
  },

  Companies: {
    identity_proof: [
      {label: "Certificate of incorporation", key: "Incorporation_certificate"},
      {label: "Memorandum and Articles of Association", key: "MOA"},
    ],
    address_proof: [
      {label: "Utility bill", key: "Utility_bill"},
      {label: "Registered office bank passbook", key: "Passbook"},
    ],
    authority_proof: [
      {
        label:
          "A resolution from the Board of Directors and power of attorney granted to managers, officers, or employees to transact on its behalf",
        key: "Board_resolution",
      },
    ],
    partners_proof: [
      {
        label: "PAN",
        key: "PAN",
      },
      {
        label: "Aadhar",
        key: "Aadhaar",
      },
    ],
    business_proof: [],
  },

  Partnership_firm: {
    identity_proof: [
      {label: "Registration certificate (if registered)", key: "Registration_certificate"},
      {label: "Partnership deed", key: "Partnership_deed"},
    ],
    authority_proof: [
      {
        label: "Power of Attorney granted to a partner or an employee of the firm to transact business on its behalf",
        key: "Power_of_attorney",
      },
    ],
    partners_proof: [
      {
        label: "PAN",
        key: "PAN",
      },
      {
        label: "Aadhar",
        key: "Aadhaar",
      },
    ],
    address_proof: [],
    business_proof: [],
  },

  Limited_liability_partnership: {
    identity_proof: [
      {label: "Incorporation document and LLP Agreement", key: "LLP_agreement"},
      {
        label: "Certificate of Registration issued by the Registrar for the LLP",
        key: "Registration_certificate_of_LLP",
      },
    ],
    authority_proof: [
      {
        label: "Power of Attorney granted to a partner or an employee of the firm to transact business on its behalf",
        key: "Power_of_attorney",
      },
    ],
    partners_proof: [
      {
        label: "PAN",
        key: "PAN",
      },
      {
        label: "Aadhar",
        key: "Aadhaar",
      },
    ],
    address_proof: [],
    business_proof: [],
  },
}
