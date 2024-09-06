"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ICorridors} from "@custom/utils"
import {useCommon} from "hooks"
import styles from "./styles.module.sass"

export const CardExchangeRate = ({destination_country, source_country, conversion_rate}: ICorridors) => {
  const {getFlagUrl} = useCommon()
  const {iso3, currency_symbol} = destination_country || {}
  const {iso3: sourceCountryName, iso2} = source_country || {}

  return (
    <section className={styles.card_wrapper}>
      <section className={`flex ${styles.country_wrapper}`}>
        <ImageView src={getFlagUrl(iso2)} alt="country-image" imgSize={24} wrapperClass={styles.img_wrapper} />
        <h5 className="bold">{sourceCountryName}</h5>
      </section>
      <section className={`flex ${styles.text_wrapper}`}>
        <h5 className="bold">{currency_symbol}</h5>
        <h5 className="bold">{conversion_rate.toFixed(2)}</h5>
      </section>
    </section>
  )
}
