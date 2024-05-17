"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {HeaderProps} from "props"
import styles from "./styles.module.sass"

export const Header = ({title}: HeaderProps) => {
  return (
    <header className={`flex-sb-center ${styles.header_wrapper}`}>
      <ImageView src={assets.ic_back} alt="back-icon" imgSize={20} />
      <h3>{title}</h3>
      <Button wrapperClass={styles.add_btn}>Add</Button>
    </header>
  )
}
