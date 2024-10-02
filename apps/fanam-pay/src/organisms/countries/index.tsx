import ReactCountryFlag from "react-country-flag"
import {Country} from "props"
import styles from "./page.module.sass"

export const Countries = ({iso2}: Country) => (
  <ReactCountryFlag
    countryCode={iso2?.toUpperCase()}
    svg
    style={{width: "40px", height: "40px"}}
    className={styles.flag_wrapper}
  />
)
