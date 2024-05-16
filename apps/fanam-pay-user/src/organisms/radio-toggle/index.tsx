import styles from "./style.module.sass"

interface RadioToggleProps {
  label: string
  checked?: boolean
  onChange?: () => void
}

export const RadioToggle = ({label, checked, onChange}: RadioToggleProps) => {
  return (
    <section className={`flex-col ${styles.button_container}`}>
      <label>
        <input type="checkbox" checked={checked} onChange={onChange} className={styles.input_container} />
        {label}
      </label>
    </section>
  )
}
