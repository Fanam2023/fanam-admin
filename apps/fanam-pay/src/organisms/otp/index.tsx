import {Button, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const OtpPopUp = () => {
  const {otpValues, inputRefs, isSuccess, onInputChange, onKeyDown} = useHandler()

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

  return (
    <section className={styles.popup_wrapper}>
      <h5 className="bold">Verify Aadhaar</h5>
      <section className={`${styles.captcha_wrapper}`}>
        <TextField name="captcha" value="captcha" />
        <ImageView src={assets.ic_location} alt="captcha" imgSize={24} />
        <ImageView src={assets.ic_back} alt="captcha" imgSize={24} />
      </section>
      {!isSuccess && <Button wrapperClass={styles.button_wrapper}>Verify</Button>}
      {isSuccess && (
        <>
          <h5 className={`bold ${styles.otp_text}`}>Enter OTP</h5>
          <ul className={`flex ${styles.otp_field}`}>{otpValues?.map(renderInputNumber)}</ul>
          <Button wrapperClass={styles.button_wrapper}>Verify</Button>
        </>
      )}
    </section>
  )
}
