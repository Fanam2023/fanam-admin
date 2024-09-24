import {ITransactionInfo, ITransactionProps} from "props"
import styles from "./styles.module.sass"

export const ContentTransaction = ({transactionDetail}: ITransactionProps) => {
  const {markup_fee, order, exchange_amount, other_fee, destination_country, source_country, destination_amount} =
    transactionDetail || {}
  const {order_no} = order || {}
  const {currency} = source_country || {}
  const {currency: destination_currency} = destination_country || {}

  const transactionDetails = ({label, value}: ITransactionInfo) => (
    <section className={`flex ${styles.payment}`}>
      <h5 className={styles.transaction_details}>{label}</h5>
      <h5 className={`semi-bold ${styles.payment_amount}`}>{value}</h5>
    </section>
  )

  return (
    <section className={`flex-col ${styles.payment_container}`}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Details</h4>
      {transactionDetails({label: "You were going to send", value: `${exchange_amount?.toFixed(2)} ${currency}`})}
      {transactionDetails({label: "Transfer Fee", value: `${other_fee?.toFixed(2)} ${currency}`})}
      {transactionDetails({label: "Exchange Rate", value: `${markup_fee?.toFixed(2)} ${currency}`})}
      <section className={`flex ${styles.total_wrapper}`}>
        <h5 className={styles.transaction_txt}>Receiver will get Exactly</h5>
        <h5 className={`bold ${styles.total_usd}`}>
          {destination_amount?.toFixed(2)} {destination_currency}
        </h5>
      </section>
      <section className={`flex ${styles.id_wrapper}`}>
        <h5 className={styles.transaction_txt}>Transaction Number</h5>
        <h5 className={`semi-bold ${styles.transaction_number}`}>{order_no}</h5>
      </section>
    </section>
  )
}
