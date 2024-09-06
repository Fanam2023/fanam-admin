"use client"

import {ICorridors} from "@custom/utils"
import {CardExchangeRate} from "organisms"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const ExchangeRate = () => {
  const {isLoading, loopCard} = useHandler()

  const Spinner = () => <section className={styles.spinner}></section>

  const renderCards = ({destination_country, source_country, conversion_rate}: ICorridors, index: number) => {
    return (
      <CardExchangeRate
        key={index}
        destination_country={destination_country}
        source_country={source_country}
        conversion_rate={conversion_rate}
      />
    )
  }

  return (
    <section className={styles.container_wrapper}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Current exchange rate for popular corridors</h4>
      <section className={`flex ${isLoading ? styles.details_wrapper : styles.detail_wrapper}`}>
        {isLoading ? <Spinner /> : loopCard()?.map(renderCards)}
      </section>
    </section>
  )
}
