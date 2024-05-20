export interface BaseConatinerProps {
  attach: string
  header: string
  buttonText?: string
  onClick?: () => void
}

export interface ChildProps {
  senderAmount: string
  reciverName: string
  recivableAmt: string
  button: String
  onSubmit?: () => void
}
