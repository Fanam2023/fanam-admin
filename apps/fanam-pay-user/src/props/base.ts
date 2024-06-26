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
}

export interface FooterPaymentProps {
  senderAmount: string
  reciverName: string
  recivableAmt: string
  button: string
}
