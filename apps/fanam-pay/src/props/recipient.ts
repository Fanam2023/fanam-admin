import {IFormData, JSONObject} from "@fanam-pkg/core-utils"
import {TypeRelation} from "@custom/utils"

export interface RecipientPreviewProps {
  label: string
  value: string
}

export interface RecipientDetailsProp {
  recipient_id?: string
}

export interface RecipientCardProps {
  onEdit?: (id?: string) => void
  onChangeData?: (value: JSONObject) => void
  isSame?: boolean
  isPerson?: IFormData
  relation?: IFormData<TypeRelation>
  error?: string
}
