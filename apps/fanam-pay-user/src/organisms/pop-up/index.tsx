import {PageLoader} from "@fanam-pkg/core-ui-sass"
import {ICountry} from "@custom/utils"
import styles from "./country.module.sass"
import useHandler from "./handler"

const CountryList = ({onClick}) => {
  const {countries, isLoading, error, selectedCountryId} = useHandler()

  const renderCountries = ({country_id, country_name}: ICountry) => (
    <li
      key={country_id}
      className={`${styles.country_wrapper} ${country_id === selectedCountryId ? styles.selected : ""}`}
      onClick={() => onClick(country_id)}>
      {country_name}
    </li>
  )

  return (
    <section>
      <h3>Select a country</h3>
      {isLoading ? (
        <PageLoader />
      ) : error ? (
        <section>Error loading countries</section>
      ) : (
        <ul className={styles.layout_wrapper}>{countries?.map(renderCountries)}</ul>
      )}
    </section>
  )
}

export default CountryList
