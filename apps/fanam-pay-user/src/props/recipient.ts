import {IRecipient} from "@custom/utils"

export interface RecipientPreviewProps {
  label: string
  value: string
}

export interface RecipientDetailsProp {
  isVisible?: boolean
  setIsVisible?: (show: boolean) => void
  title: string
  wrapperClass?: string
  onClickCreate?: (payload: IRecipient) => void
  recipientDetails?: IRecipient
  onBack?: () => void
}

export interface RecipientCardProps {
  onEdit?: (id?: string) => void
}
