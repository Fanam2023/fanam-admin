"use client"

import {Button, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {useEffect} from "react"
import {useSlider} from "@custom/ui"
import {ICountry} from "@custom/utils"
import assets from "assets"
import {useCommon} from "hooks"
import {BaseContainer, CountryFlag, CountryPopup} from "organisms"
import {Auth} from "organisms/auth"
import useHandler from "./handler"
import styles from "./page.module.sass"

const Login = () => {
  const {data, errData, onChangeValue, onSubmit, setData, routeToSignUp, routeTOForgotPin, countries} = useHandler()
  const {phone_no, pin, country} = data
  const {errPhoneNo, errPin} = errData
  const {toggleSlider} = useSlider()
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
      <Auth>
        <section className={`flex-col ${styles.heading}`}>
          <h3 className={`bold ${styles.sub_heading}`}>Log in</h3>
          <h5 className={styles.description}>
            Login in once and seamlessly access your account across all your devices.
          </h5>
        </section>
        <section className={`flex-start ${styles.input_wrapper}`}>
          <section className={`flex ${styles.country_wrapper} ${errPhoneNo ? styles.error_border : ""}`}>
            <CountryFlag countryCode={getCountryCode(country)} wrapperClass={styles.flag} />
            <h5 className={styles.country_code}>{country ? `+${country.phone_code}` : "-"}</h5>
            <ImageView
              src={assets.ic_down_arrow_theme}
              alt="down-arrow"
              imgSize={24}
              onClick={goToCountrySlider}
              wrapperClass={styles.country_arrow}
            />
            <TextField
              label="Phone Number"
              name="phone_no"
              value={phone_no}
              onChangeData={onChangeValue}
              wrapperClass={styles.phone_number}
              autoComplete="off"
            />
          </section>
        </section>
        {errPhoneNo && <p className={styles.error_message}>{errPhoneNo}</p>}
        <TextField
          label="PIN"
          name="pin"
          type="password"
          value={pin}
          maxLength={6}
          onChangeData={onChangeValue}
          wrapperClass={styles.text_field_wrapper}
          error={errPin}
        />
        <section className={`flex-sb-center ${styles.forgot_wrpapper}`}>
          <section className={`flex ${styles.login_wrapper}`}>
            <h6 className={styles.login}>No Account ?</h6>
            <h6 className={`bold ${styles.login}`} onClick={routeToSignUp}>
              Sign up
            </h6>
          </section>
          <h6 className={`bold ${styles.login}`} onClick={routeTOForgotPin}>
            Forgot PIN? / Reset PIN
          </h6>
        </section>
        <Button wrapperClass={styles.button_wrapper} onClick={onSubmit}>
          Next
        </Button>
        <h6 className={styles.terms_wrapper}>
          By continuing, you agree to the <label className={`bold ${styles.condition_text}`}>Terms of use</label> and
          <label className={`bold ${styles.condition_text}`}> Privacy Policy</label>.
        </h6>
      </Auth>
    </BaseContainer>
  )
}

export default Login
