"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const ForgotPassword = () => {
  const {formElements, onSubmit} = useHandler()

  return (
    <section className={styles.page_wrapper}>
      <section className={styles.input_wrapper}>
        <h2>Forgot Password</h2>
        <h4>Enter your email for the verification process.</h4>
      </section>
      <GroupForm formSections={formElements} />
      <section className={`flex-col-center`}>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Continue
        </Button>
        <h5>
          Did’t receive an OTP? <span> Resend OTP </span>
        </h5>
      </section>
    </section>
  )
}
