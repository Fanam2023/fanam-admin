"use client"

import {Button, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {REG_VALID_NUMBER} from "@fanam-pkg/core-utils"
import ReactCountryFlag from "react-country-flag"
import {useEffect} from "react"
import {useSlider} from "@custom/ui"
import {ICountry} from "@custom/utils"
import assets from "assets"
import {useCommon} from "hooks"
import {Auth, BaseContainer, CountryPopup} from "organisms"
import useHandler from "./handler"
import styles from "./page.module.sass"

const Forgot_Password = () => {
  const {onChangeValue, data, errData, onSubmit, setData, countries} = useHandler()
  const {toggleSlider} = useSlider()
  const {phone_no, country} = data
  const {errPhoneNo} = errData
  const {getCountryCode} = useCommon()

  const onSelectCountry = (country: ICountry) => {
    setData(prev => ({
      ...prev,
      country,
    }))
    toggleSlider()
  }

  const goToCountrySlider = () =>
    toggleSlider({
      children: (
        <CountryPopup onSelect={onSelectCountry} selCountry={country} countries={countries} title="Select Country" />
      ),
    })

  useEffect(() => {
    if (countries?.length) setData(prev => ({...prev, country: countries?.find(({iso2}) => iso2 === "IN")}))
  }, [countries])

  return (
    <BaseContainer profile bellIcon>
      <Auth isBack={true} authLogo={assets.img_forgot_logo}>
        <section className={`flex-col ${styles.heading}`}>
          <h3 className={`bold ${styles.forgot}`}>Forgot PIN?</h3>
          <h5 className={styles.description}>Enter your registered mobile number to receive a 6-digit code.</h5>
        </section>
        <section className={`flex-start ${styles.input_wrapper}`}>
          <section className={`flex ${styles.country_wrapper} ${errPhoneNo ? styles.error_border : ""}`}>
            <ReactCountryFlag
              countryCode={getCountryCode(country)}
              svg
              style={{width: "24px", height: "24px"}}
              className={styles.flag}
            />
            <h5 className={styles.country_code}>{country ? `+${country.phone_code}` : "-"}</h5>
            <ImageView
              src={assets.ic_down_arrow_theme}
              alt="down-arrow"
              imgSize={32}
              onClick={goToCountrySlider}
              wrapperClass={styles.country_arrow}
            />
            <TextField
              label="Phone Number"
              name="phone_no"
              value={phone_no}
              onChangeData={onChangeValue}
              wrapperClass={styles.phone_number}
              inputRegex={REG_VALID_NUMBER}
              isRequired={false}
            />
          </section>
        </section>
        {errPhoneNo && <p className={styles.error_message}>{errPhoneNo}</p>}
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Next
        </Button>
      </Auth>
    </BaseContainer>
  )
}
export default Forgot_Password
