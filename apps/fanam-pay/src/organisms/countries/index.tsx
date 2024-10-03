import ReactCountryFlag from "react-country-flag"
import {Country} from "props"
import styles from "./page.module.sass"

export const CountryFlags = ({countryCode, wrapperClass}: Country) => (
  <ReactCountryFlag
    countryCode={countryCode?.toUpperCase()}
    svg
    style={{width: "40px", height: "40px"}}
    className={`${styles.flag_wrapper} ${wrapperClass}`}
  />
)
