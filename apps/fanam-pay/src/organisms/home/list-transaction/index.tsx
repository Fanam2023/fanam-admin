"use client"

import {Button, GroupForm, ImageView} from "@fanam-pkg/core-ui-sass"
import {useDateTime} from "@fanam-pkg/core-utils"
import {useState} from "react"
import {ITransactionDetails} from "@custom/utils"
import assets from "assets"
import {TRANSACTION_STATUS_OBJECT} from "utils"
import {useHandler} from "./handler"
import styles from "./style.module.sass"

export const ListTransaction = () => {
  const {transactions, formElements, fetchTransaction, t} = useHandler(styles)
  const {formatDate} = useDateTime()

  const [showAll, setShowAll] = useState(false)

  const sortedTransactions = transactions
    ?.slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const renderTransactionDetails = (
    {
      destination_amount,
      paymentMode,
      transaction_id,
      recipient,
      order,
      created_at,
      destination_country,
      transfer_time,
      exchange_amount,
      source_country,
    }: ITransactionDetails,
    index: number
  ) => {
    const {first_name, last_name} = recipient || {}
    const {order_no, order_status, payment} = order || {}
    const {paymentMethod} = payment || {}
    const {currency} = destination_country || {}
    const {currency: source_currency} = source_country || {}
    const {sla_timing_min, sla_timing_max} = transfer_time || {}
    const statusLabel = TRANSACTION_STATUS_OBJECT[order_status]?.label

    return (
      <li key={index} className={styles.page_wrapper} onClick={() => fetchTransaction(transaction_id)}>
        <section className={`flex ${styles.content_wrapper}`}>
          <section className={`flex ${styles.detail_wrapper}`}>
            <section className={styles.date_section_wrapper}>
              <h4 className={`bold ${styles.month}`}>{formatDate(created_at, "MMM")}</h4>
              <h4 className={`bold ${styles.date_wrapper}`}>{formatDate(created_at, "DD")}</h4>
            </section>
            <section>
              <section className="flex">
                <h4 className={`bold ${styles.detail_container}`}>
                  {first_name} {last_name}
                </h4>
                <h5 className={`${styles.id_wrapper} ${order_no ? styles.order_no : ""}`}>{order_no}</h5>
              </section>
              <h5 className={`bold ${styles.exchange_amount}`}>
                {exchange_amount} {source_currency}
              </h5>
              <section className={`flex ${styles.duration_wrapper}`}>
                {paymentMethod && (
                  <>
                    <h5 className={styles.payment_method}>Mode: {paymentMethod}</h5>
                    <ImageView src={assets.ic_dot} alt="dot" imgSize={6} className={styles.dot_wrapper} />
                  </>
                )}
                {sla_timing_min && (
                  <h5>
                    Transfer Time:{" "}
                    {sla_timing_min !== sla_timing_max
                      ? `${sla_timing_min} - ${sla_timing_max} hours`
                      : `${sla_timing_min} hours`}
                  </h5>
                )}
              </section>
            </section>
          </section>
          <section className={styles.price_wrapper}>
            <h5 className={`semi-bold ${styles.status_wrapper}`}>{statusLabel}</h5>
            <section className={`flex ${styles.price_wrapper}`}>
              <h4 className={`semi-bold ${styles.source_wrapper}`}>
                {exchange_amount?.toFixed(2)} {source_currency}
              </h4>
              <h5 className={`semi-bold ${styles.destination_amount}`}>
                {destination_amount?.toFixed(2)} {currency}
              </h5>
            </section>
            <section className={`flex ${styles.view_more}`}>
              <h5 className={`bold ${styles.view_txt}`}>View more</h5>
              <ImageView src={assets.ic_arrow_right} alt="arrow" imgSize={20} wrapperClass={styles.arrow} />
            </section>
          </section>
        </section>
      </li>
    )
  }

  return (
    <section className={styles.container_wrapper}>
      <section className={`flex ${styles.head_wrapper}`}>
        <h4 className={`bold ${styles.txt_wrapper}`}>{t("Recent Transaction Activity")}</h4>
        <GroupForm formSections={formElements} wrapperClass={styles.dropDown_wrapper} />
      </section>
      {transactions?.length ? (
        <ul className={styles.list_wrapper}>
          {(showAll ? sortedTransactions : sortedTransactions?.slice(0, 5))?.map(renderTransactionDetails)}
        </ul>
      ) : (
        <>
          <ImageView
            src={assets.ic_empty_transaction}
            alt="empty"
            imgSize={180}
            wrapperClass={styles.empty_transaction}
          />
          <h5 className={styles.empty_content}>
            {t("You haven't made any transactions yet. Your history will be displayed here once you do.")}
          </h5>
        </>
      )}
      {transactions?.length > 5 && (
        <>
          <Button wrapperClass={styles.button_wrapper} onClick={() => setShowAll(!showAll)}>
            {showAll ? "See Less Activity" : "See More Activity"}
          </Button>
          <section className={`flex ${styles.activity_wrapper}`} onClick={() => setShowAll(!showAll)}>
            <h4 className={`bold ${styles.button_txt}`}>{showAll ? "See Less Activity" : "See More Activity"}</h4>
            <ImageView src={assets.ic_arrow_right} alt="arrow" imgSize={20} wrapperClass={styles.arrow} />
          </section>
        </>
      )}
    </section>
  )
}
