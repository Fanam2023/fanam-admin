import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {assets} from "../../assets"
import {useSlider} from "../../hooks"
import styles from "./styles.module.sass"

export const Slider = () => {
  const {slider, toggleSlider} = useSlider()
  const {children, title, onSubmit} = slider

  return (
    children && (
      <section className={`blur ${styles.slider_wrapper}`}>
        <section className={`flex-col ${styles.main_container}`}>
          <header className={`flex-sb-center ${styles.header_wrapper}`}>
            <h5 className={styles.title}>{title}</h5>
            <ImageView src={assets.ic_close} alt="close-icon" imgSize={24} onClick={toggleSlider.bind(null, null)} />
          </header>
          <section className={styles.child_wrapper}>{children}</section>
          <footer className={`flex ${styles.footer_wrapper}`}>
            <Button buttonType="primary-outlined" wrapperClass={styles.btn_wrapper}>
              Back
            </Button>
            <Button wrapperClass={styles.btn_wrapper} onClick={onSubmit}>
              Continue
            </Button>
          </footer>
        </section>
      </section>
    )
  )
}
