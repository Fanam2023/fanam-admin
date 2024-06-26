import {createContext} from "react"
import {SliderProps} from "../props"

export const SliderContext = createContext<SliderProps>({
  closable: true,
  slider: {title: "", onSubmit: () => {}},
  toggleSlider: () => {},
})
