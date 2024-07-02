export interface RecipientPreviewProps {
  label: string
  value: string
}

export interface RecipientDetailsProp {
  recipient_id?: string
}

export interface RecipientCardProps {
  onEdit?: (id?: string) => void
}
