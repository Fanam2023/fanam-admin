"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {AuthProps} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const Auth = ({children, isBack}: AuthProps) => {
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
