import {PropsWithChildren} from "react"
import {useSingleton} from "hooks"
import styles from "./styles.module.sass"

export const Body = ({children}: PropsWithChildren) => {
  const {bankName} = useSingleton()
  const bankStyles = {
    Hdfc_bank: styles.hdfc,
    Yes_bank: styles.yes,
    City_union_bank: styles.union,
    Sbi_bank: styles.sbi,
    Icici_bank: styles.icici,
  }

  return <section className={`${bankName ? bankStyles[bankName] : styles.background}`}>{children}</section>
}
