import {Button} from "@fanam-pkg/core-ui-sass"
import {footerProps} from "props"
import styles from "./styles.module.sass"

export const Footer = ({footerBtnText, onClick}: footerProps) => {
  return (
    <footer className={`flex-col-center ${styles.footer_wrapper}`}>
      <Button wrapperClass={styles.button_wrapper} onClick={onClick}>
        {footerBtnText ?? "continue"}
      </Button>
      <h5 className={styles.receipt_text}>Download Receipt</h5>
    </footer>
  )
}
