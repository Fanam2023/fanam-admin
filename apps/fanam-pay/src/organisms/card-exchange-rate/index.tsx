"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ICorridors} from "@custom/utils"
import {useCommon} from "hooks"
import styles from "./styles.module.sass"

export const CardExchangeRate = ({destination_country, source_country, conversion_rate}: ICorridors) => {
  const {getFlagUrl} = useCommon()
  const {iso3} = destination_country || {}
  const {iso3: sourceCountryName, iso2} = source_country || {}

  return (
    <section className={styles.card_wrapper}>
      <section className={`flex ${styles.country_wrapper}`}>
        <ImageView src={getFlagUrl(iso2)} alt="country-image" imgSize={24} wrapperClass={styles.img_wrapper} />
        <h5 className="bold">
          {sourceCountryName} / {iso3}
        </h5>
      </section>
      <h5 className={`bold ${styles.text_wrapper}`}>{conversion_rate}</h5>
    </section>
  )
}
