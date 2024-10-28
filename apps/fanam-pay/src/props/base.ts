import { ICountry } from "@custom/utils"
import { IFormData } from "@fanam-pkg/core-utils"
import {StaticImageData} from "next/image"
import {ReactNode} from "react"

export interface BottomNavbarProps {
  icon: string | StaticImageData
  name: string
  path: string
}

export interface BaseContainerProps {
  children?: ReactNode
  footerChild?: ReactNode
  header?: string
  profile?: boolean
  bellIcon?: boolean
  buttonText?: string
  onClick?: () => void
  backIcon?: boolean
  onBack?: () => void
  skipBtn?: string
  cancelBtn?: string
  stepIndex?: number | "success" | "pending" | "failed"
  containerClass?: string
  onSubmit?: () => void
  onCancel?: () => void
  isStepper?: boolean
  disabled?: boolean
  childWrapper?: string
}

export interface FooterPaymentProps {
  senderAmount: string
  reciverName: string
  recivableAmt: string
  button: string
}

export interface PropsOTPField {
  error: string
  otpValues: string[]
  onChangeInputs: (values: string[]) => void
}

export interface ToggleBtnProps {
  onToggle?: (toggled: boolean) => void
  toggled?: boolean
}

export interface ProfileSideNavProps {
  selectedLabel: string
  setSelectedLabel: (label: string) => void
  children: React.ReactNode
}

export interface ProfileNavItemProps {
  label?: string
  selectedIcon?: string | StaticImageData
  icon?: string | StaticImageData
  whiteIcon?: string
  path?: string
}

export interface PropsCountryFlag {
  countryCode: string
  wrapperClass?: string
}
