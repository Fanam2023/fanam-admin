import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useDateTime} from "@fanam-pkg/core-utils"
import assets from "assets"
import {PropsTransactionDetails} from "props"
import {TRANSACTION_STATUS} from "utils"
import {ContentTransaction} from "../content-transaction"
import {RecipientDetails} from "../recipient-details"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const TransactionDetails = ({transaction}: PropsTransactionDetails) => {
  const {formatDate} = useDateTime()
  const {recipientDetails, getFirstLetter} = useHandler(transaction)
  const {
    status,
    source_amount,
    destination_amount,
    recipient,
    created_at,
    order,
    transfer_time,
    paymentMode,
    destination_country,
  } = transaction || {}
  const {first_name, last_name} = recipient || {}
  const {order_no} = order || {}
  const {sla_timing_min, sla_timing_max} = transfer_time || {}
  const statusLabel = TRANSACTION_STATUS[status]?.key || status
  const {currency} = destination_country || {}

  return (
    <section className="card">
      <h3 className={styles.txt_wrapper}>Transaction Details</h3>
      <section className={`flex ${styles.payment_wrapper}`}>
        <section className={`flex-center ${styles.profile_wrapper}`}>{getFirstLetter(first_name)}</section>
        <section>
          <h4 className="bold">{formatDate(created_at, "MMM")}</h4>
          <h4 className={`bold ${styles.date}`}>{formatDate(created_at, "DD")}</h4>
        </section>
        <section>
          <section className="flex">
            <h4 className="bold">
              {first_name} {last_name}
            </h4>
            <h6 className={styles.transaction_id}>{order_no}</h6>
          </section>
          <section className={`flex ${styles.transaction_wrapper}`}>
            {paymentMode && (
              <>
                <h5 className={styles.transaction_mode}>Mode: {paymentMode}</h5>
                <ImageView src={assets.ic_dot} alt="dot" imgSize={6} className={styles.dot_wrapper} />
              </>
            )}
            {sla_timing_min && (
              <h5 className={styles.transaction_time}>
                Transfer Time:
                {sla_timing_min !== sla_timing_max
                  ? `${sla_timing_min} - ${sla_timing_max} hours`
                  : `${sla_timing_min} hours`}
              </h5>
            )}
          </section>
        </section>
        <section className={styles.amount_wrapper}>
          <h6 className={styles.payment_txt}>{statusLabel}</h6>
          <section className={`flex ${styles.amount_container}`}>
            <h4 className={`semi-bold ${styles.amount_inr}`}>{source_amount}</h4>
            <h5 className={`semi-bold ${styles.amount_usd}`}>
              {destination_amount} {currency}
            </h5>
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
