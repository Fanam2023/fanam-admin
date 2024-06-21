export interface ManageMembersProps {
  title: string
  recipients: MemberProps[]
  placeHolderName: string
  onChangeSearch?: (value: string) => void
  onAddButton: () => void
}

export interface MemberProps {
  title: string
  description: string
}
