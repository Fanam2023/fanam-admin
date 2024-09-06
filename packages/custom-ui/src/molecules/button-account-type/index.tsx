import {ImageView} from "@fanam-pkg/core-ui-sass"
import {PropsButtonAccountType} from "../../props"
import styles from "./styles.module.sass"

export const ButtonAccountType = ({selIcon, icon, content, isSelected, onSelect}: PropsButtonAccountType) => {
  const {label, key} = content

  return (
    <section
      className={`flex ${isSelected ? styles.select_wrapper : styles.us_select_wrapper}`}
      onClick={onSelect.bind(null, key)}>
      <ImageView src={isSelected ? selIcon : icon} alt={label} imgSize={24} />
      <label className={`bold ${isSelected ? styles.select_label : ""}`}>{label}</label>
    </section>
  )
}
