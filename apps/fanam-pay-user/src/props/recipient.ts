import {IRecipient} from "@custom/utils"

export interface RecipientPreviewProps {
  label: string
  value: string
}

export interface RecipientDetailsProp {
  wrapperClass?: string
  onClickCreate?: (payload: IRecipient) => void
  recipient?: IRecipient
  onBack?: () => void
}

export interface RecipientCardProps {
  onEdit?: (id?: string) => void
}
