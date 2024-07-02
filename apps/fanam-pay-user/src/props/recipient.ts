import {IPayloadSyncRecipient} from "@custom/utils"

export interface RecipientPreviewProps {
  label: string
  value: string
}

export interface RecipientDetailsProp {
  wrapperClass?: string
  onClickCreate?: (payload: IPayloadSyncRecipient) => void
  recipient?: IPayloadSyncRecipient
  onBack?: () => void
}

export interface RecipientCardProps {
  onEdit?: (id?: string) => void
}
