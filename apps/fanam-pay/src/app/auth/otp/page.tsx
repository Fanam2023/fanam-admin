"use client"

import {Button} from "@fanam-pkg/core-ui-sass"
import {useEffect} from "react"
import {BaseContainer} from "organisms"
import {Auth} from "organisms/auth"
import useHandler from "./handler"
import styles from "./page.module.sass"

const Otp = () => {
  const {
    otpValues,
    inputRefs,
    phone_no,
    countryCode,
    timer,
    errOtp,
    onKeyDown,
    onInputChange,
    onResend,
    onPaste,
    onVerify,
    t,
  } = useHandler()

  const renderInputNumber = (value: string, index: number) => (
    <input
      key={index}
      id={`otp-input-${index}`}
      type="number"
      className={styles.otp_box}
      inputMode="numeric"
      maxLength={1}
      value={value}
      autoComplete="one-time-code"
      onChange={onInputChange.bind(null, index)}
      onKeyDown={onKeyDown.bind(null, index)}
      ref={input => {
        inputRefs.current[index] = input
      }}
    />
  )

  useEffect(() => {
    const handleKeyPress = (event: {key: string}) => {
      if (event.key === "Enter") onVerify()
    }
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [onVerify])

  useEffect(() => {
    /* Handling the paste event */
    window.addEventListener("paste", event => {
      event.preventDefault()
      const e = event as any /* Temporarily making it any due to typescript error while generating the build */
      onPaste(e.clipboardData?.getData("text") || "") //eslint-disable-line
    })

    return () => {
      window.removeEventListener("paste", () => {})
      window.removeEventListener("DOMContentLoaded", () => {})
    }
  }, [])

  return (
    <BaseContainer bellIcon profile>
      <Auth isBack>
        <section className={`flex-col ${styles.heading}`}>
          <h4 className={`bold ${styles.otp}`}>{t("OTP Verification")} </h4>
          <h5 className={styles.description}>
            {t("We have sent an OTP on given number")} {countryCode} {phone_no}
          </h5>
          <ul className={`flex ${styles.otp_field}`}>{otpValues?.map(renderInputNumber)}</ul>
        </section>
        <section className={`flex ${styles.otp_wrapper}`}>
          <h5 className={styles.alert_text}>{t("Didn’t receive the otp?")}</h5>
          <h5 className={`bold ${styles.otp}`} onClick={onResend}>
            {t("RESEND OTP")}
          </h5>
          <label className={styles.alert_text}>{timer}s</label>
        </section>
        {errOtp && <label className="error-text">{errOtp}</label>}
        <Button wrapperClass={styles.button_wrapper} onClick={onVerify}>
          {t("Next")}
        </Button>
        <h6 className={styles.terms_wrapper}>
          {t("By_continuing")} <label className={`bold ${styles.condition_text}`}>{t("terms_of_use")}</label> {t("and")}
          <label className={`bold ${styles.condition_text}`}>{t("privacy_policy")}</label>.
        </h6>
        <section id="auth-proceed-button"></section>
      </Auth>
    </BaseContainer>
  )
}

export default Otp
