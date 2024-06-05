import {ReactNode} from "react"

export interface SliderProps {
  children: ReactNode
  isVisible: boolean
  setIsVisible: (show: boolean) => void
  title: string
}
