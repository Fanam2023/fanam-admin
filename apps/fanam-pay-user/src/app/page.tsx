"use client"

import {Button, TextField} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

export default function Dashboard() {
  const {onLogin, data, errState, onChangeValue} = useHandler()
  const {email} = data
  const {errEmail} = errState

  console.log(">>>>>>>>>>>>>>>: ", errEmail)

  return (
    <section className={styles.page_container}>
      <TextField
        label="Email"
        wrapperClass={styles.login_field}
        value={email}
        onChangeData={onChangeValue}
        name="email"
        error={errEmail}
      />
      <Button wrapperClass={styles.login_button} onClick={onLogin}>
        Login
      </Button>
    </section>
  )
}
