import {ICountry} from "@custom/utils"
import styles from "./country.module.sass"
import useCountries from "./handler"

const CountryList = ({onClick}) => {
  const {countries, isLoading, error, selectedCountryId} = useCountries()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading countries</div>

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
      <ul className={styles.layout_wrapper}>{countries?.map(renderCountries)}</ul>
    </section>
  )
}

export default CountryList
