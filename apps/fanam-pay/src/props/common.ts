import {ReactNode} from "react"

export interface AddAttachmentProps {
  name: string
  size: string
}

export interface AuthProps {
  children: ReactNode
  isBack?: boolean
}
