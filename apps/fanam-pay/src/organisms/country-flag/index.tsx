import {ICountry} from "@custom/utils"
import {Countries} from "organisms/countries"
import styles from "./styles.module.sass"

export const CountryFlag = ({iso2, currency}: ICountry) => (
  <section className={`flex ${styles.flag_wrapper} ${styles.sender_wrapper}`}>
    <Countries iso2={iso2} />
    <h3 className={styles.currency_text}>{currency}</h3>
  </section>
)
