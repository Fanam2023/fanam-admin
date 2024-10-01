import ReactCountryFlag from "react-country-flag"
import {ICountry} from "@custom/utils"
import styles from "./styles.module.sass"

export const CountryFlag = ({iso2, country_name, currency}: ICountry) => (
  <section className={`flex ${styles.flag_wrapper} ${styles.sender_wrapper}`}>
    <ReactCountryFlag
      countryCode={iso2?.toUpperCase()}
      svg
      alt={country_name}
      style={{width: "24px", height: "24px"}}
      className={styles.flag}
    />
    <h3 className={styles.currency_text}>{currency}</h3>
  </section>
)
