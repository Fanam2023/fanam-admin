import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {PropsTransactionDetails} from "props"
import {ContentTransaction} from "../content-transaction"
import {RecipientDetails} from "../recipient-details"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const TransactionDetails = ({transaction}: PropsTransactionDetails) => {
  const {recipientDetails, getFirstLetter} = useHandler(transaction)
  const {status, source_amount, destination_amount, recipient, transaction_id, created_at} = transaction || {}
  const {first_name, last_name} = recipient || {}

  return (
    <section className="card">
      <h3 className={styles.txt_wrapper}>Transaction Details</h3>
      <section className={`flex ${styles.payment_wrapper}`}>
        <section className={`flex-center ${styles.profile_wrapper}`}>{getFirstLetter(first_name)}</section>
        <section>
          <h4 className="bold">{created_at}</h4>
          <h4 className={`bold ${styles.date}`}>{}</h4>
        </section>
        <section>
          <section className="flex">
            <h4 className="bold">
              {first_name} {last_name}
            </h4>
            <h6 className={styles.transaction_id}>{transaction_id}</h6>
          </section>
          <section className={`flex ${styles.transaction_wrapper}`}>
            <h5 className={styles.transaction_mode}>Mode: Bank account</h5>
            <ImageView src={assets.ic_dot} alt="dot" imgSize={6} className={styles.dot_wrapper} />
            <h5 className={styles.transaction_time}>Transfer Time: 2-3 days</h5>
          </section>
        </section>
        <section className={styles.amount_wrapper}>
          <h6 className={styles.payment_txt}>{status}</h6>
          <section className={`flex ${styles.amount_container}`}>
            <h4 className={`semi-bold ${styles.amount_inr}`}>{source_amount}</h4>
            <h5 className={`semi-bold ${styles.amount_usd}`}>{destination_amount}</h5>
          </section>
        </section>
      </section>
      <section className={styles.transaction_container}>
        <ContentTransaction transactionDetail={transaction} />
        <RecipientDetails recipientData={recipientDetails} />
      </section>
    </section>
  )
}
