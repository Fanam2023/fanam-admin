import {Button, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import assets from "assets"
import {PropsPopupAadhaarCaptcha} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const PopupAadhaarCaptcha = (props: PropsPopupAadhaarCaptcha) => {
  const {captchaCode, regenerateCaptcha} = props
  const {onChangeData, onSubmit, captcha, errorText} = useHandler(props)
  const {isDesktop} = useResize()

  return (
    <section className={styles.popup_wrapper}>
      <h4 className={`bold ${styles.title}`}>Verify Aadhaar</h4>
      <section className={`${styles.captcha_wrapper}`}>
        <TextField label="Enter Captcha" onChangeData={onChangeData} value={captcha} error={errorText} />
        <ImageView
          src={`data:image/jpeg;base64,${captchaCode}`}
          alt="captcha"
          imgWidth={200}
          imgHeight={56}
          wrapperClass={styles.captcha}
        />
        <ImageView
          src={assets.ic_refresh}
          alt="regenerate-captcha"
          imgSize={isDesktop ? 32 : 28}
          onClick={regenerateCaptcha}
          wrapperClass={styles.refresh}
        />
      </section>
      <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
        Verify
      </Button>
    </section>
  )
}
