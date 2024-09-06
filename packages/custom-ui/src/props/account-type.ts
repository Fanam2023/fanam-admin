import {IFormData} from "@fanam-pkg/core-utils"
import {StaticImageData} from "next/image"
import {TypeAccount} from "@custom/utils"

export interface PropsButtonAccountType {
  selIcon: StaticImageData
  icon: StaticImageData
  content: IFormData
  isSelected: boolean
  onSelect: (item: TypeAccount) => void
}
