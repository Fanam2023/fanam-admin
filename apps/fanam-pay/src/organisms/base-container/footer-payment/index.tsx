import {Button} from "@fanam-pkg/core-ui-sass"
import {FooterPaymentProps} from "props"
import {useHandler} from "./handler"
import styles from "./style.module.sass"

export const FooterPayment = ({senderAmount, recivableAmt, reciverName, button}: FooterPaymentProps) => {
  const {onClick} = useHandler()

  return (
    <footer className={`flex-sb-center ${styles.footer_wrapper}`}>
      <section>
        <h5>You Pay</h5>
        <h5 className={styles.amt_wrapper}>{senderAmount}</h5>
      </section>
      <section>
        <h5>{reciverName}</h5>
        <h5 className={styles.amt_wrapper}>{recivableAmt}</h5>
      </section>
      <Button onClick={onClick}>{button}</Button>
    </footer>
  )
}
