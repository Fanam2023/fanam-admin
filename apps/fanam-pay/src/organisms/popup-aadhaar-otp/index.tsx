import {Button} from "@fanam-pkg/core-ui-sass"
import {OTPField} from "molecules"
import {PropsPopupAadhaarOTP} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const PopupAadhaarOTP = (props: PropsPopupAadhaarOTP) => {
  const {otpValues, setOtpValues, errorText, onSubmit} = useHandler(props)

  return (
    <section className={styles.popup_wrapper}>
      <h5 className={`bold ${styles.title}`}>Verify Aadhaar</h5>
      <h5 className={`bold ${styles.otp_text}`}>Enter OTP</h5>
      <OTPField otpValues={otpValues} onChangeInputs={setOtpValues} error={errorText} />
      <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
        Verify
      </Button>
    </section>
  )
}
