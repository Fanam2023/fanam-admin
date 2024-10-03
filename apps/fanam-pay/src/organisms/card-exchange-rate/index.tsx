"use client"

import {ICorridors} from "@custom/utils"
import {CountryFlags} from "organisms/countries"
import styles from "./styles.module.sass"

export const CardExchangeRate = ({destination_country, source_country, conversion_rate}: ICorridors) => {
  const {currency_symbol} = destination_country || {}
  const {iso3: sourceCountryName, iso2} = source_country || {}

  return (
    <section className={styles.card_wrapper}>
      <section className={`flex ${styles.country_wrapper}`}>
        <CountryFlags countryCode={iso2} wrapperClass={styles.flag} />
        <h5 className="bold">{sourceCountryName}</h5>
      </section>
      <section className={`flex ${styles.text_wrapper}`}>
        <h5 className="bold">{currency_symbol}</h5>
        <h5 className="bold">{conversion_rate?.toFixed(2)}</h5>
      </section>
    </section>
  )
}
