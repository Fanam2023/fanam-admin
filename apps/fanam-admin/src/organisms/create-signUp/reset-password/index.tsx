"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handle"
import styles from "./styles.module.sass"

export const ResetPassword = () => {
  const {formElements, onSubmit} = useHandler()

  return (
    <section className={styles.page_wrapper}>
      <section className={styles.input_wrapper}>
        <h2>New Password</h2>
        <h5>Please enter your new password.</h5>
      </section>
      <GroupForm formSections={formElements} />
      <section className={`flex-col-center`}>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Continue
        </Button>
      </section>
    </section>
  )
}
