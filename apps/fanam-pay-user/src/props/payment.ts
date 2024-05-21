import {StaticImageData} from "next/image"

export type StatusType = "pending" | "success" | "failure"

export interface PaymentDetailsProps {
  label: string
  value: string
  icon?: string | StaticImageData
}
