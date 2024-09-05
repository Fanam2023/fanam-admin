"use client"

import {ICorridors} from "@custom/utils"
import {CardExchangeRate} from "organisms"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const ExchangeRate = () => {
  const {getPopularCorridors, isLoading} = useHandler()

  const Spinner = () => <section className={styles.spinner}></section>

  // const Card = ({destination_country, source_country, conversion_rate}: ICorridors) => {
  //   const {iso3} = destination_country || {}
  //   const {iso3: sourceCountryName, iso2} = source_country || {}

  //   return (
  //     <section className={styles.card_wrapper}>
  //       <section className={`flex ${styles.country_wrapper}`}>
  //         <ImageView src={getFlagUrl(iso2)} alt="country-image" imgSize={24} wrapperClass={styles.img_wrapper} />
  //         <h5 className="bold">
  //           {sourceCountryName} / {iso3}
  //         </h5>
  //       </section>
  //       <h5 className={`bold ${styles.text_wrapper}`}>{conversion_rate}</h5>
  //     </section>
  //   )
  // }

  const renderCards = (data: ICorridors[]) => {
    return data?.map(({destination_country, source_country, conversion_rate}, index: number) => (
      <CardExchangeRate
        key={index}
        destination_country={destination_country}
        source_country={source_country}
        conversion_rate={conversion_rate}
      />
    ))
  }

  return (
    <section className={styles.container_wrapper}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Current exchange rate for popular corridors</h4>
      <section className={`flex ${isLoading ? styles.details_wrapper : styles.detail_wrapper}`}>
        {isLoading ? <Spinner /> : renderCards(getPopularCorridors)}
      </section>
    </section>
  )
}
