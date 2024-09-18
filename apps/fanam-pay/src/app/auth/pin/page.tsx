"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {Auth, BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./page.module.sass"

const AuthPin = () => {
  const {formElements, onSubmit} = useHandler(styles)

  return (
    <BaseContainer profile bellIcon>
      <Auth>
        <section className={`flex-col ${styles.heading}`}>
          <h4 className={`bold ${styles.login}`}>Create a PIN</h4>
          <h5 className={styles.description}>
            What takes seconds to create and gives you fast and secure login-in? A PIN only works on your device, so it
            stays off the web.
          </h5>
        </section>
        <GroupForm formSections={formElements} wrapperClass={styles.form_wrapper} />
        <h6 className={styles.txt_wrapper}>Create an 6-digit PIN to secure your account</h6>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Next
        </Button>
      </Auth>
    </BaseContainer>
  )
}

export default AuthPin
