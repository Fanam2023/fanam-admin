"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ProfileNavItemProps, ProfileSideNavProps} from "props"
import {PROFILE_ARR} from "utils"
import styles from "./styles.module.sass"

export const ProfileSideNav = ({selectedLabel, setSelectedLabel, children}: ProfileSideNavProps) => {
  const renderNavItems = ({label, icon}: ProfileNavItemProps, index: number) => {
    const isSelected = label === selectedLabel
    return (
      <li
        className={`flex ${styles.wrapper} ${isSelected ? styles.selected : ""}`}
        key={index}
        onClick={() => setSelectedLabel(label)}>
        <ImageView src={icon} imgSize={24} alt={label} />
        <p className={`${styles.nav_item} ${isSelected ? styles.selected_item : ""}`}>{label}</p>
      </li>
    )
  }

  return (
    <section className={styles.container}>
      <h4 className={`bold ${styles.title}`}>Settings</h4>
      <section className={`flex-start ${styles.profile_container}`}>
        <ul className={`flex-col ${styles.nav_wrapper}`}>{PROFILE_ARR.map(renderNavItems)}</ul>
        <section className={styles.children_wrapper}>{children}</section>
      </section>
    </section>
  )
}
