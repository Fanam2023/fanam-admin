import React from "react"
import {useHandler} from "./handler"
import styles from "./index.module.sass"

export const Language: React.FC = () => {
  const {selectedLanguage, changeLanguage} = useHandler()

  return (
    <div>
      <select
        value={selectedLanguage}
        onChange={e => changeLanguage((e.target as HTMLSelectElement).value)}
        className={styles.select}>
        <option value="en" className={selectedLanguage === "en" ? styles.selectedOption : styles.defaultOption}>
          English
        </option>
        <option value="ta" className={selectedLanguage === "ta" ? styles.selectedOption : styles.defaultOption}>
          Tamil
        </option>
        <option value="hi" className={selectedLanguage === "hi" ? styles.selectedOption : styles.defaultOption}>
          Hindi
        </option>
        <option value="ja" className={selectedLanguage === "ja" ? styles.selectedOption : styles.defaultOption}>
          Japanese
        </option>
        <option value="ch" className={selectedLanguage === "ch" ? styles.selectedOption : styles.defaultOption}>
          Chinese
        </option>
        <option value="ar" className={selectedLanguage === "ar" ? styles.selectedOption : styles.defaultOption}>
          Arabic
        </option>
      </select>
    </div>
  )
}
