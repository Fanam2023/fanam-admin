export interface RecipientsProps {
  title: string
  recipients: Recipients[]
  placeHolderName: string
  onChangeSearch?: () => void
}

export interface Recipients {
  email: string | number
  name: string
}
