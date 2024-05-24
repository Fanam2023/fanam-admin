export interface IRecipients {
  accountNumber: string | number
  name: string
  profileIcon: string
}

export interface IBeneficiary {
  email: string
  name: string
  profileIcon: string
}

export type IManageMembers = IRecipients | IBeneficiary
