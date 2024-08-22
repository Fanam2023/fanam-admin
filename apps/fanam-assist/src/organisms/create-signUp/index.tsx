"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const CreateSignUp = () => {
  const {formElements, onSubmit} = useHandler()

  return (
    <section className={styles.page_wrapper}>
      <section className={styles.container_wrapper}>
        <section className={styles.input_wrapper}>
          <h2>Sign Up</h2>
          <h4>Create Account</h4>
        </section>
        <GroupForm formSections={formElements} />
        <section className={`flex-col-center`}>
          <h5>
            Have an Account ?<span> Sign In </span>
          </h5>
          <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
            Sign Up
          </Button>
        </section>
      </section>
    </section>
  )
}
