"use client"

import {Button, GroupForm, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {IDetail} from "model"
import {useHandler} from "./handler"
import styles from "./style.module.sass"

const {defaultData, formElements} = useHandler()

const Card = ({
  month,
  date,
  name,
  status,
  source_amount,
  destination_amount,
  paymentId,
  paymentMode,
  paymentDuration,
}: IDetail) => (
  <section>
    <section className={`flex ${styles.content_wrapper}`}>
      <section className={`flex ${styles.detail_wrapper}`}>
        <section className={styles.date_wrapper}>
          <h4 className="bold">{month}</h4>
          <h4 className={`bold ${styles.date_wrapper}`}>{date}</h4>
        </section>
        <section>
          <section className={`flex`}>
            <h4 className="bold">{name}</h4>
            <h5 className={styles.id_wrapper}>{paymentId}</h5>
          </section>
          <section className={`flex ${styles.duration_wrapper}`}>
            <h5>Mode: {paymentMode}</h5>
            <ImageView src={assets.ic_dot} alt={""} imgSize={6} className={styles.dot_wrapper} />
            <h5>Transfer Time:{paymentDuration}</h5>
          </section>
        </section>
      </section>
      <section className={styles.price_wrapper}>
        <h5 className={styles.status_wrapper}>{status}</h5>
        <section className={`flex ${styles.price_wrapper}`}>
          <h5 className={`bold ${styles.source_wrapper}`}>{source_amount}</h5>
          <h5 className="bold">{destination_amount}</h5>
        </section>
      </section>
    </section>
    <section className={styles.line_wrapper} />
  </section>
)

export const History = () => {
  return (
    <section className={styles.conatiner_wrapper}>
      <section className={`flex ${styles.head_wrapper}`}>
        <h4 className={`bold ${styles.txt_wrapper}`}>Recent Transaction Activity</h4>
        <GroupForm formSections={formElements} wrapperClass={styles.dropDown_wrappper} />
      </section>
      {defaultData.map(
        (
          {month, date, name, status, source_amount, destination_amount, paymentId, paymentMode, paymentDuration},
          index
        ) => (
          <Card
            key={index}
            month={month}
            date={date}
            name={name}
            paymentId={paymentId}
            status={status}
            source_amount={source_amount}
            destination_amount={destination_amount}
            paymentMode={paymentMode}
            paymentDuration={paymentDuration}
          />
        )
      )}
      <Button wrapperClass={styles.button_wrapper}>See More Activity</Button>
    </section>
  )
}
