"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {Auth, BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./page.module.sass"

const AuthPin = () => {
  const {formElements, onSubmit, routeToLogin} = useHandler(styles)

  return (
    <BaseContainer childWrapper={`flex-col-center ${styles.page_wrapper}`} isStepper profile bellIcon>
      <Auth>
        <section className={`flex-col ${styles.heading}`}>
          <h4 className={`bold ${styles.login}`}>Create a PIN</h4>
          <h5>Create Account once and seamlessly access your account across all your devices.</h5>
        </section>
        <GroupForm formSections={formElements} wrapperClass={styles.form_wrapper} />
        <h6>
          What takes seconds to create and gives you fast and secure login-in? A PIN only works on your device, so it
          stays off the web.
        </h6>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Next
        </Button>
      </Auth>
    </BaseContainer>
  )
}

export default AuthPin
