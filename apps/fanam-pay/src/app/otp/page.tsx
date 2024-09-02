"use client"

import {Button} from "@fanam-pkg/core-ui-sass"
import {useEffect} from "react"
import {Auth} from "organisms/auth"
import useHandler from "./handler"
import styles from "./page.module.sass"

const Otp = () => {
  const {
    otpValues,
    inputRefs,
    phone_no,
    country_code,
    timer,
    errOtp,
    onKeyDown,
    onInputChange,
    onResend,
    onPaste,
    onVerify,
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
      if (event.key === "Enter") {
        onVerify()
      }
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
    <section className={`flex-col-center ${styles.page_wrapper}`}>
      <Auth isBack>
        <section className={`flex-col ${styles.heading}`}>
          <h4 className={`bold ${styles.otp}`}>OTP Verification </h4>
          <h5>
            We have sent an OTP on given number {country_code} {phone_no}
          </h5>
          <section className={`flex ${styles.otp_field}`}>{otpValues?.map(renderInputNumber)}</section>
        </section>
        <section className={`flex ${styles.otp_wrapper}`}>
          <h5>Didn’t receive the otp?</h5>
          <h5 className={`bold ${styles.otp}`} onClick={onResend}>
            RESEND OTP
          </h5>
          <label>{timer}s</label>
        </section>
        {errOtp && <label className="error-text">{errOtp}</label>}
        <Button wrapperClass={styles.button_wrapper} onClick={onVerify}>
          Next
        </Button>
        <h6 className={styles.terms_wrapper}>
          By continuing, you agree to the <label className={`bold ${styles.condition_text}`}>Terms of use</label> and{" "}
          <label className={`bold ${styles.condition_text}`}>Privacy Policy</label>.
        </h6>
        <section id="auth-proceed-button"></section>
      </Auth>
    </section>
  )
}

export default Otp
