"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const ExchangeRate = () => {
  const {getPopularCorridors} = useHandler()

  const Card = ({destination_country, source_country, rate}: any) => {
    const {iso3} = destination_country || {}
    const {iso3: sourceCountryName, iso2} = source_country || {}

    return (
      <section className={styles.card_wrapper}>
        <section className={`flex ${styles.country_wrapper}`}>
          <ImageView
            src={`https://flagcdn.com/w40/${iso2?.toLowerCase()}.png`}
            alt="country-image"
            imgSize={24}
            wrapperClass={styles.img_wrapper}
          />
          <h5 className="bold">
            {sourceCountryName} / {iso3}
          </h5>
        </section>
        <h5 className={`bold ${styles.text_wrapper}`}>{rate}</h5>
      </section>
    )
  }

  const renderCards = (data: any) => {
    return data?.map(({destination_country, source_country, conversion_rate}, index: number) => (
      <Card
        key={index}
        destination_country={destination_country}
        source_country={source_country}
        rate={conversion_rate}
      />
    ))
  }

  return (
    <section className={styles.container_wrapper}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Current exchange rate for popular corridors</h4>
      <section className={`flex ${styles.detail_wrapper}`}>{renderCards(getPopularCorridors)}</section>
    </section>
  )
}
