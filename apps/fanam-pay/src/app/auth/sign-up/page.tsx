"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {Auth} from "organisms/auth"
import useHandler from "./handler"
import styles from "./page.module.sass"

const SignUp = () => {
  const {formElements, onSubmit, routeToLogin} = useHandler(styles)

  return (
    <BaseContainer profile bellIcon>
      <Auth>
        <section className={`flex-col ${styles.heading}`}>
          <h4 className={`bold ${styles.login} ${styles.sub_heading}`}>Sign Up</h4>
          <h5>Create Account once and seamlessly access your account across all your devices.</h5>
        </section>
        <GroupForm formSections={formElements} wrapperClass={styles.form_wrapper} />
        <section className={`flex ${styles.login_wrapper}`}>
          <h6>Already have an account?</h6>
          <h6 className={`bold ${styles.login}`} onClick={routeToLogin}>
            Login
          </h6>
        </section>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Next
        </Button>
        <h6 className={styles.terms_wrapper}>
          By continuing, you agree to the <label className={`bold ${styles.condition_text}`}>Terms of use</label> and{" "}
          <label className={`bold ${styles.condition_text}`}>Privacy Policy</label>.
        </h6>
      </Auth>
    </BaseContainer>
  )
}

export default SignUp
