import {ToggleBtnProps} from "props"
import styles from "./page.module.sass"

export const ToggleButton = ({toggled, onToggle}: ToggleBtnProps) => (
  <button className={`${styles.toggle_btn} ${toggled ? styles.toggled : ""}`} onClick={onToggle?.bind(null, !toggled)}>
    <section className={styles.thumb}></section>
  </button>
)
