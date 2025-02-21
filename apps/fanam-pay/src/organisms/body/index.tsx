import {PropsWithChildren} from "react"
import {useSingleton} from "hooks"
import styles from "./styles.module.sass"

export const Body = ({children}: PropsWithChildren) => {
  const {bankName, bankDetails} = useSingleton()
  const {background_color} = bankDetails || {}
  // const bankStyles = {
  //   Hdfc_bank: styles.hdfc,
  //   Yes_bank: styles.yes,
  //   City_union_bank: styles.union,
  //   Sbi_bank: styles.sbi,
  //   Icici_bank: styles.icici,
  // }

  return (
    <section
      className={`${bankName ? styles.bank_background : styles.background}`}
      style={{backgroundColor: `${bankName && background_color}`}}>
      {children}
    </section>
  )
}
