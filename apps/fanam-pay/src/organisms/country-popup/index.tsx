import {assets, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {useMemo} from "react"
import {ICountry} from "@custom/utils"
import {CountryFlag} from "organisms/country-flag"
import {CountryPopupProps} from "props"
import styles from "./country.module.sass"
import {useHandler} from "./handler"

export const CountryPopup = ({
  onSelect,
  selCountry,
  countries,
  title,
  wrapperClass,
  showCountry,
  onShowCountry,
}: CountryPopupProps) => {
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
        <CountryFlag countryCode={iso2} wrapperClass={styles.flag} />
        {country_name}
      </li>
    )
  }

  const onSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  return (
    <section className={`${styles.main_country_wrapper} ${wrapperClass}`}>
      {showCountry && (
        <ImageView
          src={assets.ic_close}
          alt="close-icon"
          imgSize={24}
          onClick={() => onShowCountry(false)}
          className={`flex ${styles.close_icon}`}
        />
      )}
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
