import {PropsWithChildren} from "react"
import {useSingleton} from "hooks"
import styles from "./styles.module.sass"

export const Body = ({children}: PropsWithChildren) => {
  const {bankName} = useSingleton()
  return <section className={`${bankName ? styles.backgrounds : styles.background}`}>{children}</section>
}
