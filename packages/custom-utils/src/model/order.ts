import {TypeOrderStatus} from "./enum"

export interface IPayloadOrder {
  transaction_id: string
}

export interface IResponseOrder {
  order_id: string
  order_no: string
  amount: number
  razorpay_order_id: string
  order_status: TypeOrderStatus
  payment_status: string
  transaction_id: string
  payment_id: null
  user_id: string
}
