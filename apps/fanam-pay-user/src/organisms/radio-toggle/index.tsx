import styles from "./style.module.sass"

interface RadioToggleProps {
  label: string
  checked?: boolean
  onChange?: () => void
}

export const RadioToggle = ({label, checked, onChange}: RadioToggleProps) => {
  return (
    <section className={`flex-center ${styles.button_container}`}>
      <label className={styles.radio_label}>
        <input type="radio" checked={checked} onChange={onChange} className={styles.input_container} />
        {label}
      </label>
    </section>
  )
}
