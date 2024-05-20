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
