import {PropsWithChildren, useState} from "react"
import {SliderContext} from "../contexts"
import {Slider} from "../molecules"
import {ISlider, SliderProps} from "../props"

export const SliderProvider = ({children}: PropsWithChildren) => {
  const [slider, setSlider] = useState<ISlider>({
    children: null,
    title: "",
  })

  const toggleSlider = (content?: ISlider) => {
    console.log(">>>>>>>>>>>>>>>>")

    setSlider(content ? content : {children: null})
  }

  const value: SliderProps = {slider, toggleSlider}

  return (
    <SliderContext.Provider value={value}>
      <Slider />
      {children}
    </SliderContext.Provider>
  )
}
