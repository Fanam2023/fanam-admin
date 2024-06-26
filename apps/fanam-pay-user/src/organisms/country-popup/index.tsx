import {ICountry} from "@custom/utils"
import {CountryPopupProps} from "props"
import styles from "./country.module.sass"
import useHandler from "./handler"

export const CountryPopup = ({onSelect, selCurrency}: CountryPopupProps) => {
  const {countries} = useHandler()

  const renderCountries = ({country_id, country_name, currency}: ICountry) => (
    <li
      key={country_id}
      className={`${styles.country_wrapper} ${currency === selCurrency ? styles.selected : ""}`}
      onClick={onSelect.bind(null, currency)}>
      {country_name}
    </li>
  )

  return (
    <section>
      <h3>Select a country</h3>
      <ul className={styles.layout_wrapper}>{countries?.map(renderCountries)}</ul>
    </section>
  )
}
