import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseConatinerProps} from "props"
import styles from "./index.module.sass"

export const BaseContainer = ({attach, header, buttonText, onClick}: BaseConatinerProps) => (
  <section>
    <header className={`flex-sb-center ${styles.header_wrapper}`}>
      <section className={`flex ${styles.label_wrapper}`}>
        <ImageView src={assets.ic_back} alt="" imgSize={24} />
        <h3>{header}</h3>
      </section>
      <h3>{attach}</h3>
    </header>
    <footer className={`flex-col-center ${styles.footer_wrapper}`}>
      {!!buttonText && (
        <Button onClick={onClick} wrapperClass={styles.button_wrapper}>
          {buttonText}
        </Button>
      )}
      <h5 className={styles.receipt_text}>Download Receipt</h5>
    </footer>
  </section>
)
