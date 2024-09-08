import {TRANSACTION_DETAILS} from "utils"
import styles from "./styles.module.sass"

export const ContentTransaction = () => {
  const transactionDetails = ({label, value}, index) => (
    <section key={index} className={`flex ${styles.payment}`}>
      <h5 className={styles.transaction_details}>{label}</h5>
      <h5 className={`semi-bold ${styles.payment_amount}`}>{value}</h5>
    </section>
  )

  return (
    <section className={`flex-col ${styles.payment_container}`}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Details</h4>
      <ul>{TRANSACTION_DETAILS.map(transactionDetails)}</ul>
      <section className={`flex ${styles.total_wrapper}`}>
        <h5 className={styles.transaction_txt}>Receiver will get Exactly</h5>
        <h5 className={`semi-bold ${styles.total_usd}`}>92,962.05 USD</h5>
      </section>
      <section className="flex">
        <h5 className={styles.transaction_txt}>Transaction Number</h5>
        <h5 className={`semi-bold ${styles.transaction_number}`}>#1190538268</h5>
      </section>
    </section>
  )
}
