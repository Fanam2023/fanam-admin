import {Button, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {PropsPopupAadhaarCaptcha} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const PopupAadhaarCaptcha = (props: PropsPopupAadhaarCaptcha) => {
  const {captchaCode, regenerateCaptcha} = props
  const {onChangeData, onSubmit, captcha, errorText} = useHandler(props)

  return (
    <section className={styles.popup_wrapper}>
      <h5 className="bold">Verify Aadhaar</h5>
      <section className={`${styles.captcha_wrapper}`}>
        <TextField label="Enter Captcha" onChangeData={onChangeData} value={captcha} error={errorText} />
        <ImageView src={`data:image/jpeg;base64,${captchaCode}`} alt="captcha" imgWidth={200} imgHeight={56} />
        <ImageView src={assets.ic_refresh} alt="regenerate-captcha" imgSize={24} onClick={regenerateCaptcha} />
      </section>
      <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
        Verify
      </Button>
    </section>
  )
}
