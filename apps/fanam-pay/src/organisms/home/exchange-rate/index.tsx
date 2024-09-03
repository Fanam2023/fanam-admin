"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {IExchange} from "model"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const ExchangeRate = () => {
  const {defaultData} = useHandler()

  const Card = ({destination_country, source_country, rate, className = ""}: IExchange & {className?: string}) => (
    <section className={styles.card_wrapper}>
      <section className={`flex ${styles.country_wrapper}`}>
        <ImageView src={""} alt={""} />
        <h5 className="bold">
          {destination_country} / {source_country}
        </h5>
      </section>
      <h5 className={`bold ${styles.text_wrapper}`}>{rate}</h5>
    </section>
  )

  return (
    <section className={styles.conatiner_wrapper}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Current exchange rate for popular corridors</h4>
      <section className={`flex ${styles.detail_wrapper}`}>
        {defaultData.map(({destination_country, source_country, rate}, index) => (
          <Card key={index} destination_country={destination_country} source_country={source_country} rate={rate} />
        ))}
      </section>
    </section>
  )
}
