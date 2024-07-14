import {ICountry} from "@custom/utils"
import {CountryPopupProps} from "props"
import styles from "./country.module.sass"

export const CountryPopup = ({onSelect, selCountry, countries}: CountryPopupProps) => {
  const renderCountries = (country: ICountry) => {
    const {country_id, country_name, iso2} = country
    return (
      <li
        key={country_id}
        className={`${styles.country_wrapper} ${iso2 === selCountry.iso2 ? styles.selected : ""}`}
        onClick={onSelect.bind(null, country)}>
        {country_name}
      </li>
    )
  }

  return (
    <section>
      <h3>Select a country</h3>
      <ul className={styles.layout_wrapper}>{countries?.map(renderCountries)}</ul>
    </section>
  )
}
