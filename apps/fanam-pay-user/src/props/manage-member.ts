import {IManageMembers} from "model"

export interface ManageMembersProps {
  title: string
  recipients: IManageMembers[]
  placeHolderName: string
  onChangeSearch?: () => void
}
