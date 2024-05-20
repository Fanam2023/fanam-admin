import {Button} from "@fanam-pkg/core-ui-sass"
import {FooterPaymentProps} from "props"
import styles from "./footer.module.sass"

export const PaymentFooter = ({senderAmount, recivableAmt, reciverName, button}: FooterPaymentProps) => {
  const handleSubmit = () => {}

  return (
    <footer className={styles.footer_wrapper}>
      <section className={`flex-sb-center`}>
        <section>
          <h5>You Pay</h5>
          <h5 className={styles.amt_wrapper}>{senderAmount}</h5>
        </section>
        <section>
          <h5>{reciverName}</h5>
          <h5 className={styles.amt_wrapper}>{recivableAmt}</h5>
        </section>
        <Button onSubmit={handleSubmit}>{button}</Button>
      </section>
    </footer>
  )
}
