"use client"

import {Button, GroupForm, ImageView} from "@fanam-pkg/core-ui-sass"
import {useDateTime} from "@fanam-pkg/core-utils"
import {ITransactionDetails} from "@custom/utils"
import assets from "assets"
import {TRANSACTION_STATUS} from "utils"
import {useHandler} from "./handler"
import styles from "./style.module.sass"

export const ListTransaction = () => {
  const {transactions, formElements, fetchTransaction} = useHandler(styles)
  const {formatDate} = useDateTime()

  const renderTransactionDetails = (
    {
      month,
      date,
      status,
      source_amount,
      destination_amount,
      paymentMode,
      transaction_id,
      recipient,
      order,
      created_at,
      destination_country,
      transfer_time,
    }: ITransactionDetails,
    index: number
  ) => {
    const {first_name, last_name} = recipient || {}
    const {order_no} = order || {}
    const {currency} = destination_country || {}
    const {sla_timing_min, sla_timing_max} = transfer_time || {}
    const statusLabel = TRANSACTION_STATUS[status]?.key || status

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
                <h4 className={`bold ${styles.name_wrapper}`}>
                  {first_name} {last_name}
                </h4>
                <h5 className={styles.id_wrapper}>{order_no}</h5>
              </section>
              <h5 className={`bold ${styles.source_amount}`}>{source_amount}</h5>
              <section className={`flex ${styles.duration_wrapper}`}>
                {paymentMode && (
                  <>
                    <h5>Mode: {paymentMode}</h5>
                    <ImageView src={assets.ic_dot} alt="dot" imgSize={6} className={styles.dot_wrapper} />
                  </>
                )}
                {sla_timing_min && (
                  <h5>
                    Transfer Time:
                    {sla_timing_min !== sla_timing_max
                      ? `${sla_timing_min} - ${sla_timing_max} hours`
                      : `${sla_timing_min} hours`}
                  </h5>
                )}
              </section>
            </section>
          </section>
          <section className={styles.price_wrapper}>
            <h5 className={styles.status_wrapper}>{statusLabel}</h5>
            <section className={`flex ${styles.price_wrapper}`}>
              <h5 className={`bold ${styles.source_wrapper}`}>{source_amount}</h5>
              <h5 className={`bold ${styles.destination_amount}`}>
                {destination_amount} {currency}
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
        <h4 className={`bold ${styles.txt_wrapper}`}>Recent Transaction Activity</h4>
        <GroupForm formSections={formElements} wrapperClass={styles.dropDown_wrapper} />
      </section>
      {transactions?.length ? (
        <ul className={styles.list_wrapper}>{transactions.map(renderTransactionDetails)}</ul>
      ) : (
        <ImageView
          src={assets.ic_empty_transaction}
          alt="empty"
          imgSize={180}
          wrapperClass={styles.empty_transaction}
        />
      )}
      {transactions?.length > 0 && (
        <>
          <Button wrapperClass={styles.button_wrapper}>See More Activity</Button>
          <section className={`flex ${styles.activity_wrapper}`}>
            <h4 className={`bold ${styles.button_txt}`}>See More Activity</h4>
            <ImageView src={assets.ic_arrow_right} alt="arrow" imgSize={20} wrapperClass={styles.arrow} />
          </section>
        </>
      )}
    </section>
  )
}
