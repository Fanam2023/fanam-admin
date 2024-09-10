"use client"

import {Button, TextField} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {Auth} from "organisms/auth"
import useHandler from "./handler"
import styles from "./page.module.sass"

const Login = () => {
  const {data, errData, onChangeValue, onSubmit, routeToSignUp, routeTOForgotPin} = useHandler()
  const {phone_no, pin} = data
  const {errPhoneNo, errPin} = errData

  return (
    <BaseContainer profile bellIcon>
      <Auth>
        <section className={`flex-col ${styles.heading}`}>
          <h3 className={`bold ${styles.login}`}>Log in</h3>
          <h5>Login in once and seamlessly access your account across all your devices.</h5>
        </section>
        <TextField
          label="Enter Phone Number"
          name="phone_no"
          value={phone_no}
          onChangeData={onChangeValue}
          wrapperClass={styles.text_field_wrapper}
          error={errPhoneNo}
        />
        <TextField
          label="Enter PIN"
          name="pin"
          type="password"
          value={pin}
          onChangeData={onChangeValue}
          wrapperClass={styles.text_field_wrapper}
          error={errPin}
        />
        <section className={`flex-sb-center ${styles.forgot_wrpapper}`}>
          <section className={`flex ${styles.login_wrapper}`}>
            <h6>No Account ?</h6>
            <h6 className={`bold ${styles.login}`} onClick={routeToSignUp}>
              Sign up
            </h6>
          </section>
          <h6 className={`bold ${styles.login}`} onClick={routeTOForgotPin}>
            Forget PIN?
          </h6>
        </section>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Next
        </Button>
        <h6 className={styles.terms_wrapper}>
          By continuing, you agree to the <label className={`bold ${styles.condition_text}`}>Terms of use</label> and
          <label className={`bold ${styles.condition_text}`}>Privacy Policy</label>.
        </h6>
      </Auth>
    </BaseContainer>
  )
}

export default Login
