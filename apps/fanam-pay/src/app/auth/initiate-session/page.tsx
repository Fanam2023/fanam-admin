"use client"

import {Button} from "@fanam-pkg/core-ui-sass"
import useHandler from "./handler"
import styles from "./page.module.sass"

const InitiateSession = () => {
  const {onSubmit} = useHandler()
  return (
    <section className={styles.btn_wrapper}>
      <Button onClick={onSubmit}>Click</Button>
    </section>
  )
}

export default InitiateSession
