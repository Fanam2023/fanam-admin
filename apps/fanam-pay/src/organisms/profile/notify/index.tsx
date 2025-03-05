"use client"

import {ToggleButton} from "organisms"
import {ProfileNavItemProps} from "props"
import {NOTIFY} from "utils"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const Notify = () => {
  const {handleToggle, toggles, t} = useHandler()

  const renderNotification = ({label}: ProfileNavItemProps, index: number) => (
    <li className={`flex-sb-center ${styles.wrapper}`} key={index}>
      <p className={styles.security_name}>{t(label)}</p>
      <ToggleButton toggled={!!toggles[index]} onToggle={() => handleToggle(index)} />
    </li>
  )

  return (
    <section>
      <h4 className={`bold ${styles.title}`}>{t("Privacy & Security")}</h4>
      <ul className={`flex-col ${styles.security_wrapper}`}>{NOTIFY.map(renderNotification)}</ul>
    </section>
  )
}
