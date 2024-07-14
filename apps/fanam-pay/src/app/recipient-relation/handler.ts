import {useState} from "react"

export const useHandler = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  return {
    isSelected,
    setIsSelected,
  }
}
