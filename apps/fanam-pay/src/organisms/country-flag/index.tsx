import ReactCountryFlag from "react-country-flag"
import {PropsCountryFlag} from "props"
import styles from "./style.module.sass"

export const CountryFlag = ({countryCode, wrapperClass}: PropsCountryFlag) => (
  <ReactCountryFlag countryCode={countryCode?.toUpperCase()} svg className={`${styles.flag_wrapper} ${wrapperClass}`} />
)
