import {IFormData} from "@fanam-pkg/core-utils"
import {StaticImageData} from "next/image"

export interface PropsButtonAccountType {
  selIcon: StaticImageData
  icon: StaticImageData
  content: IFormData
  isSelected: boolean
  onSelect: (item: IFormData) => void
}
