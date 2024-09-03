"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ReactNode} from "react"
import assets from "assets"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export interface authProps {
  children: ReactNode
  isBack?: boolean
}

export const Auth = ({children, isBack}: authProps) => {
  const {back} = useHandler()
  return (
    <section className={`${styles.main_container}`}>
      <section className={styles.img_container}>
        {isBack && (
          <ImageView
            src={assets.ic_back_arrow_black}
            alt="back-arrow"
            imgSize={40}
            wrapperClass={styles.arrow_wrapper}
            onClick={back}
          />
        )}
        <ImageView src={assets.img_logo_in} alt="sign-logo" imgSize={494} />
      </section>
      <section className={styles.child_wrapper}>{children}</section>
    </section>
  )
}
