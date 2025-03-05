"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {Auth} from "organisms/auth"
import useHandler from "./handler"
import styles from "./page.module.sass"

const SignUp = () => {
  const {formElements, onSubmit, t, routeToLogin} = useHandler(styles)

  return (
    <BaseContainer profile bellIcon>
      <Auth>
        <section className={`flex-col ${styles.heading}`}>
          <h4 className={`bold ${styles.sub_heading}`}>{t("Sign Up")}</h4>
          <h5 className={styles.description}>
            {t("Create Account once and seamlessly access your account across all your devices.")}
          </h5>
        </section>
        <GroupForm formSections={formElements} wrapperClass={styles.form_wrapper} />
        <section className={`flex ${styles.login_wrapper}`}>
          <h6 className={styles.login}>{t("Already have an account?")}</h6>
          <h6 className={`bold ${styles.login}`} onClick={routeToLogin}>
            {t("Login")}
          </h6>
        </section>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          {t("Next")}
        </Button>
        <h6 className={styles.terms_wrapper}>
          {t("By_continuing")} <label className={`bold ${styles.condition_text}`}>{t("terms_of_use")}</label> {t("and")}{" "}
          <label className={`bold ${styles.condition_text}`}>{t("privacy_policy")}</label>.
        </h6>
      </Auth>
    </BaseContainer>
  )
}

export default SignUp
