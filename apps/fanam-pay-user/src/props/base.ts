import {StaticImageData} from "next/image"

export interface BottomNavbarProps {
  icon: string | StaticImageData
  name: string
  path: string
}
