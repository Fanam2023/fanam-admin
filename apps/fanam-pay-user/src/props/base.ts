import {StaticImageData} from "next/image"
import {ReactNode} from "react"

export interface BottomNavbarProps {
  icon: string | StaticImageData
  name: string
  path: string
}

export interface BaseConatinerProps {
  children?: ReactNode
  footerChild?: ReactNode
  addButton: string
  header: string
  buttonText?: string
  onClick?: () => void
}

export interface FooterPaymentProps {
  senderAmount: string
  reciverName: string
  recivableAmt: string
  button: string
}
