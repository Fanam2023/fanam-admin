import {StaticImageData} from "next/image"
import {ReactNode} from "react"

export interface AccordianProps {
  title: string
  description?: string
  children?: ReactNode
  isFrequent?: boolean
  leading_icon: string
  tailing_icon: boolean
}

export interface BankListProps {
  icon: string | StaticImageData
  bankName: string
  accountType?: string
}

export interface BankCartProps extends BankListProps {
  cartType?: string
}
