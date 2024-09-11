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
  stepIndex?: number | "success" | "pending" | "failed"
  containerClass?: string
  onSubmit?: () => void
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
