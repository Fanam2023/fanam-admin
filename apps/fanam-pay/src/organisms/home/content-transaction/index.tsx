import {ITransactionProps, ITransactionInfo} from "props"
import styles from "./styles.module.sass"

export const ContentTransaction = ({transactionDetail}: ITransactionProps) => {
  const {source_amount, destination_amount, markup_fee, transaction_id} = transactionDetail || {}

  const transactionDetails = ({label, value}: ITransactionInfo) => (
    <section className={`flex ${styles.payment}`}>
      <h5 className={styles.transaction_details}>{label}</h5>
      <h5 className={`semi-bold ${styles.payment_amount}`}>{value}</h5>
    </section>
  )

  return (
    <section className={`flex-col ${styles.payment_container}`}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Details</h4>
      {transactionDetails({label: "You were going to send", value: source_amount})}
      {transactionDetails({label: "Transfer Fee", value: markup_fee})}
      <section className={`flex ${styles.total_wrapper}`}>
        <h5 className={styles.transaction_txt}>Receiver will get Exactly</h5>
        <h5 className={`semi-bold ${styles.total_usd}`}>{destination_amount}</h5>
      </section>
      <section className="flex">
        <h5 className={styles.transaction_txt}>Transaction Number</h5>
        <h5 className={`semi-bold ${styles.transaction_number}`}>{transaction_id}</h5>
      </section>
    </section>
  )
}
