"use client"

import {assets, Button, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {useSlider} from "@custom/ui"
import {ICountry} from "@custom/utils"
import {Auth, BaseContainer, CountryPopup} from "organisms"
import useHandler from "./handler"
import styles from "./page.module.sass"

const Forgot_Password = () => {
  const {onChangeValue, data, errData, onSubmit, setData} = useHandler()
  const {toggleSlider} = useSlider()
  const {phone_no, country_code} = data
  const {errPhoneNo} = errData

  const onSelectCountry = (country: ICountry) => {
    setData(prev => ({
      ...prev,
      country_code: country, // Store the entire country object
    }))
    toggleSlider()
  }

  const goToCountrySlider = () =>
    toggleSlider({
      children: (
        <CountryPopup
          onSelect={onSelectCountry}
          selCountry={typeof country_code === "object" ? (country_code as ICountry) : null}
        />
      ),
    })

  return (
    <BaseContainer childWrapper={`flex-col-center ${styles.page_wrapper}`} isStepper profile bellIcon>
      <Auth>
        <section className={`flex-col ${styles.heading}`}>
          <h3 className={`bold ${styles.Forgot}`}>Forgot PIN?</h3>
          <h5>Enter your registered mobile number to receive a 6-digit code.</h5>
        </section>
        <section className={`flex ${styles.country_container}`}>
          <>
            <section className={`flex ${styles.country_wrapper}`} onClick={goToCountrySlider}>
              <ImageView
                src={
                  country_code
                    ? `https://flagcdn.com/w40/${(country_code as ICountry)?.iso2?.toLowerCase()}.png`
                    : assets.ic_view
                }
                alt="country-img"
                imgSize={24}
                wrapperClass={styles.flag}
              />
              {country_code ? `+${(country_code as ICountry).phone_code}` : "+91"}
            </section>
            <TextField
              label="Phone Number"
              name="phone_no"
              value={phone_no}
              onChangeData={onChangeValue}
              error={errPhoneNo}
              className={styles.text_field_wrapper}
            />
          </>
        </section>

        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Next
        </Button>
      </Auth>
    </BaseContainer>
  )
}
export default Forgot_Password
