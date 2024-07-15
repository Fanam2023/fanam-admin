import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ICountry} from "@custom/utils"
import styles from "./styles.module.sass"

export const CountryFlag = ({iso2, country_name}: ICountry) => (
  <section className={`flex ${styles.flag_wrapper} ${styles.sender_wrapper}`}>
    <ImageView
      src={`https://flagcdn.com/w40/${iso2?.toLowerCase()}.png`}
      alt={country_name}
      imgSize={40}
      wrapperClass={styles.country_wrapper}
    />
    <h3 className={styles.currency_text}>{iso2}</h3>
  </section>
)
