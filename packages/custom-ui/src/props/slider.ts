import {ReactNode} from "react"

export interface ISlider {
  children?: ReactNode
  title?: string
  onSubmit?: () => void
}

export interface SliderProps {
  slider: ISlider
  toggleSlider: (slider?: ISlider) => void
  closable?: boolean
}
