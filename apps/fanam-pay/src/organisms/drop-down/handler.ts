import {useTranslation} from "react-i18next"
import {useEffect, useState} from "react"
import "../../app/i18n"

export const useHandler = () => {
  const {t, i18n} = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setSelectedLanguage(lng)
  }

  useEffect(() => {
    setSelectedLanguage(i18n.language)
  }, [i18n.language])

  return {
    selectedLanguage,
    t,
    changeLanguage,
  }
}
