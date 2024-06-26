import {PropsWithChildren} from "react"
import {SliderProvider} from "./SliderProvider"

export const CustomProvider = ({children}: PropsWithChildren) => {
  return <SliderProvider>{children}</SliderProvider>
}
