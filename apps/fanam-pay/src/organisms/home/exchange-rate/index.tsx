"use client"

import MultiCarousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import {ICorridors} from "@custom/utils"
import {CardExchangeRate} from "organisms"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const ExchangeRate = () => {
  const {isLoading, getPopularCorridors, responsive} = useHandler()

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
      <section className={styles.carousel_wrapper}>
        {isLoading ? (
          <Spinner />
        ) : (
          <MultiCarousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            transitionDuration={500}
            arrows={false}>
            {getPopularCorridors?.map(renderCards)}
          </MultiCarousel>
        )}
      </section>
    </section>
  )
}
