import {Button, ImageView, TextArea} from "@fanam-pkg/core-ui-sass"
import {useDateTime} from "@fanam-pkg/core-utils"
import assets from "assets"
import {PropsTransactionDetails} from "props"
import {TRANSACTION_STATUS_OBJECT} from "utils"
import {ContentTransaction} from "../content-transaction"
import {RecipientDetails} from "../recipient-details"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const TransactionDetails = ({transaction}: PropsTransactionDetails) => {
  const {formatDate} = useDateTime()
  const {recipientDetails, showReason, data, getFirstLetter, onChangeValue, onSubmit, setShowReason} =
    useHandler(transaction)
  const {
    source_country,
    destination_amount,
    exchange_amount,
    recipient,
    created_at,
    order,
    transfer_time,
    destination_country,
  } = transaction || {}
  const {first_name, last_name} = recipient || {}
  const {order_no, order_status, payment} = order || {}
  const {paymentMethod} = payment || {}
  const {sla_timing_min, sla_timing_max} = transfer_time || {}
  const statusLabel = TRANSACTION_STATUS_OBJECT[order_status]?.label
  const {currency} = destination_country || {}
  const {currency: source_currency} = source_country || {}

  const {cancel_reason} = data

  return (
    <section className={`card ${styles.main_wrapper}`}>
      <h3 className={styles.txt_wrapper}>Transaction Details</h3>
      <section className={`flex ${styles.payment_wrapper}`}>
        <section className={`flex ${styles.profile_container}`}>
          <section className={`flex-center ${styles.profile_wrapper}`}>{getFirstLetter(first_name)}</section>
          <section>
            <h4 className="bold">{formatDate(created_at, "MMM")}</h4>
            <h4 className={`bold ${styles.date}`}>{formatDate(created_at, "DD")}</h4>
          </section>
          <section>
            <section className={`flex ${styles.order_wrapper}`}>
              <h4 className={`bold ${styles.detail_container}`}>
                {first_name} {last_name}
              </h4>
              <h6 className={styles.transaction_id}>{order_no}</h6>
            </section>
            <section className={`flex ${styles.transaction_wrapper}`}>
              {paymentMethod && (
                <>
                  <h5 className={styles.payment_method}>Mode: {paymentMethod}</h5>
                  <ImageView src={assets.ic_dot} alt="dot" imgSize={6} className={styles.dot_wrapper} />
                </>
              )}
              {sla_timing_min && (
                <h5 className={styles.transaction_time}>
                  Transfer Time:{" "}
                  {sla_timing_min !== sla_timing_max
                    ? `${sla_timing_min} - ${sla_timing_max} hours`
                    : `${sla_timing_min} hours`}
                </h5>
              )}
            </section>
          </section>
        </section>
        <section className={styles.amount_wrapper}>
          <h6 className={`semi-bold ${styles.payment_txt}`}>{statusLabel}</h6>
          <section className={`flex ${styles.amount_container}`}>
            <h5 className={`semi-bold ${styles.amount_inr}`}>
              {exchange_amount?.toFixed(2)} {source_currency}
            </h5>
            <h5 className={`semi-bold ${styles.amount_usd}`}>
              {destination_amount?.toFixed(2)} {currency}
            </h5>
          </section>
        </section>
      </section>
      {order_status === "Transaction_pending" && (
        <>
          <section className={`flex-sb-center ${styles.payment_cancel_wrapper}`}>
            <h4 className="bold">
              {showReason ? "Do you want to cancel the Payment?" : "Do you want to cancel the transfer?"}
            </h4>
            {!showReason && (
              <Button
                buttonType="primary-outlined"
                wrapperClass={styles.cancel_btn_wrapper}
                onClick={setShowReason.bind(null, !showReason)}>
                Cancel Transaction
              </Button>
            )}
          </section>
          {showReason && (
            <section className="flex-col">
              <TextArea
                label="Enter the reason for cancellation (Optional)"
                name="cancel_reason"
                value={cancel_reason}
                onChangeData={onChangeValue}
                wrapperClass={styles.textfield_wrapper}
                isRequired={false}
                maxLength={160}
              />
              <section className={`flex ${styles.cancel_payment_btn}`}>
                <Button className={styles.cancel_btn} onClick={onSubmit}>
                  Cancel Payment
                </Button>
              </section>
            </section>
          )}
        </>
      )}
      <section className={styles.transaction_container}>
        <ContentTransaction transactionDetail={transaction} />
        <RecipientDetails recipientData={recipientDetails} />
      </section>
    </section>
  )
}
