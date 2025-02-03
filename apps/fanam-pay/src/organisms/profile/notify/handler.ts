import {useTranslation} from "react-i18next"
import {useState} from "react"

export const useHandler = () => {
  const [toggles, setToggles] = useState<Record<number, boolean>>({})
  const {t} = useTranslation()

  const handleToggle = (index: number) => {
    setToggles(prev => ({...prev, [index]: !prev[index]}))
  }

  return {
    handleToggle,
    toggles,
    t,
  }
}
