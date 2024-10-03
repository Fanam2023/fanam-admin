import {TextField} from "@fanam-pkg/core-ui-sass"
import {useMemo} from "react"
import {ICountry} from "@custom/utils"
import {CountryFlags} from "organisms/countries"
import {CountryPopupProps} from "props"
import styles from "./country.module.sass"
import {useHandler} from "./handler"

export const CountryPopup = ({onSelect, selCountry, countries, title}: CountryPopupProps) => {
  const {searchTerm, setSearchTerm} = useHandler()

  const filteredCountry = useMemo(
    () => countries?.filter(({country_name}) => country_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())),
    [searchTerm, countries]
  )

  const renderCountries = (country: ICountry) => {
    const {country_id, country_name, iso2} = country
    return (
      <li
        key={country_id}
        className={`flex ${styles.country_wrapper} ${iso2 === selCountry?.iso2 ? styles.selected : ""}`}
        onClick={onSelect.bind(null, country)}>
        <CountryFlags countryCode={iso2} />
        {country_name}
      </li>
    )
  }

  const onSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <section>
      <TextField
        label="country name"
        value={searchTerm}
        onChangeData={onSearchChange}
        wrapperClass={styles.search_wrapper}
        isRequired={false}
      />
      <h3 className={styles.select_country_text}>{title}</h3>
      {filteredCountry && filteredCountry.length > 0 ? (
        <ul className={styles.layout_wrapper}>{filteredCountry?.map(renderCountries)}</ul>
      ) : (
        <section className={`flex-col-center ${styles.no_data_wrapper}`}>
          <h4 className={`bold ${styles.found_text}`}>No countries found</h4>
        </section>
      )}
    </section>
  )
}
