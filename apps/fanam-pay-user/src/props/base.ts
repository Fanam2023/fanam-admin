import {StaticImageData} from "next/image"

export interface BottomNavbarProps {
  icon: string | StaticImageData
  name: string
  path: string
}

export interface BaseConatinerProps {
  attach: string
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
