import {StaticImageData} from "next/image"
import {PaymentDataProps} from "./accordian"

export type StatusType = "pending" | "success" | "failure"

export interface PaymentDetailsProps extends PaymentDataProps {
  icon?: string | StaticImageData
}
