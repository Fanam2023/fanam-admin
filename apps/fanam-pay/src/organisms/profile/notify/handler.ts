import {useState} from "react"

export const useHandler = () => {
  const [toggles, setToggles] = useState<Record<number, boolean>>({})

  const handleToggle = (index: number) => {
    setToggles(prev => ({...prev, [index]: !prev[index]}))
  }

  return {
    handleToggle,
    toggles,
  }
}
