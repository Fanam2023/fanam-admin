export interface NavItemProps {
  label: string
  icon: any
  activeIcon: any
  path?: string
  subItems: {label: string; path: string; subClick: boolean}[]
  click: boolean
}

export interface BankDetailProps {
  breadcrumbValue: any
  bankName: string
  mobile: string
  contactPerson: string
  email: string
  altMobile: string
  designation: string
  authMethod: string
  authEndpoint: string
  clientSecret: string
  backgroundImage: string
  uploadedLogo: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  font: string
  customUrl: string
  backgroundColor: string
}
