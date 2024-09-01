import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ICountry} from "@custom/utils"
import {CountryPopupProps} from "props"
import styles from "./country.module.sass"

export const CountryPopup = ({onSelect, selCountry, countries}: CountryPopupProps) => {
  const renderCountries = (country: ICountry) => {
    const {country_id, country_name, iso2} = country
    return (
      <li
        key={country_id}
        className={`flex ${styles.country_wrapper} ${iso2 === selCountry?.iso2 ? styles.selected : ""}`}
        onClick={onSelect.bind(null, country)}>
        <ImageView
          src={`https://flagcdn.com/w40/${iso2?.toLowerCase()}.png`}
          alt={country_name}
          imgSize={40}
          wrapperClass={styles.flag_wrapper}
        />
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
