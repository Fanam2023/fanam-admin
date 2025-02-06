import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from "react-i18next"
import ar from "./locales/ar/translation.json"
import ch from "./locales/ch/translation.json"
import hi from "./locales/hi/translation.json"
import ja from "./locales/ja/translation.json"
import ta from "./locales/ta/translation.json"

i18n
  .use(LanguageDetector) // Use language detection
  .use(initReactI18next)
  .init({
    resources: {
      ta: {translation: ta},
      hi: {translation: hi},
      ja: {translation: ja},
      ch: {translation: ch},
      ar: {translation: ar},
    },
    fallbackLng: "en", // Fallback language if no match is found
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Order and priority of language detection
      order: ["localStorage", "cookie", "navigator"],

      // Cache the selected language in these storage options
      caches: ["localStorage", "cookie"],
      cookieMinutes: 525600, // 1 year
    },
  })

export default i18n
