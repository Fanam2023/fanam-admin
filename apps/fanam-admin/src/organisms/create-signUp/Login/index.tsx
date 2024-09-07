"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const LogIn = () => {
  const {formElements, onSubmit} = useHandler()

  return (
    <section className={styles.container_wrapper}>
      <section className={styles.input_wrapper}>
        <h2>Log In</h2>
        <h4>Welcome to Compliance Safeguard</h4>
      </section>
      <GroupForm formSections={formElements} />
      <section className={`flex-col-center`}>
        <section className={`flex`}>
          <h5>
            Have an Account ?<span className={styles.signup_wrapper}> Sign Up</span>
          </h5>
        </section>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Sign In
        </Button>
      </section>
    </section>
  )
}
