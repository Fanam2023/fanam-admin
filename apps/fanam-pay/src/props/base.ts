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
  addButton?: string
  header?: string
  buttonText?: string
  childWrapper?: string
  onClick?: () => void
  backIcon?: boolean
  onBack?: () => void
  skipBtn?: string
  stepIndex?: number | "success" | "pending" | "failed"
  containerClass?: string
  onSubmit?: () => void
  onAdd?: () => void
  isStepper?: boolean
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
