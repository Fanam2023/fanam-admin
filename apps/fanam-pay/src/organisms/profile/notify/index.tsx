"use client"

import {useState} from "react"
import {ToggleButton} from "organisms"
import {ProfileNavItemProps} from "props"
import {NOTIFY} from "utils"
import styles from "./styles.module.sass"

export const Notify = () => {
  const [toggle, setToggle] = useState(false)

  const renderNotification = ({label}: ProfileNavItemProps, index: number) => (
    <li className={`flex-sb-center ${styles.wrapper}`} key={index}>
      <p className={styles.security_name}>{label}</p>
      <ToggleButton toggled={toggle} onToggle={setToggle} />
    </li>
  )

  return (
    <section>
      <h4 className={`bold ${styles.title}`}>Privacy & Security</h4>
      <ul className={`flex-col ${styles.security_wrapper}`}>{NOTIFY.map(renderNotification)}</ul>
    </section>
  )
}
