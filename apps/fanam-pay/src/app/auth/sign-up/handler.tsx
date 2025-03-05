import {FormSectionProps, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_EMAIL, REG_INDIAN_MOBILE, REG_VALID_NUMBER, useStorage} from "@fanam-pkg/core-utils"
import {useTranslation} from "react-i18next"
import {useRouter} from "next/navigation"
import {useCallback, useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {ICountry, ISignupData, IStyle, REG_INPUT_EMAIL, REG_INPUT_NAME, SESSION_SIGNUP} from "@custom/utils"
import assets from "assets"
import {useLocationController} from "controller"
import {useCommon} from "hooks"
import {CountryFlag, CountryPopup} from "organisms"
import {ACCOUNT_TYPE, QUERY_COUNTRIES, ROUTE_LOGIN, routeToOTP} from "utils"

const useHandler = (styles: IStyle) => {
  const {isValidInputByRegex, getCountryCode, getNationalNumber} = useCommon()
  const {getStorage, setStorage} = useStorage()
  const {t} = useTranslation()
  const {toggleSlider} = useSlider()
  const {push} = useRouter()
  const [data, setData] = useState<ISignupData>({
    business_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    account_type: ACCOUNT_TYPE[0],
    country: null,
  })

  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {first_name, last_name, email, phone_no, account_type, country, business_name} = data

  const {getAllCountries} = useLocationController()
  const {data: countries = []} = useQuery({queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries})

  const isIndividual = account_type?.key === "Individual"

  const {isClicked} = errData

  const nationalNumberLength = country ? getNationalNumber(country.iso2)?.length : 0

  const onSelectCountry = (country: ICountry) => {
    setData(prev => ({
      ...prev,
      country,
      phone_no: "",
    }))
    toggleSlider()
  }

  const goToCountrySlider = () =>
    toggleSlider({
      children: (
        <CountryPopup
          onSelect={onSelectCountry}
          selCountry={country}
          countries={countries}
          title={t("select_country")}
        />
      ),
    })

  const onPhoneNoValidate = useCallback(() => {
    let errText = ""
    if (!phone_no) errText = t("error.phone_required")
    else if (!isValidInputByRegex(phone_no, REG_INDIAN_MOBILE)) {
      errText = t("error.invalid_indian_phone")
    }

    return {errPhone: errText, isValid: !errText}
  }, [phone_no, t])

  useEffect(() => {
    if (countries?.length) setData(prev => ({...prev, country: countries?.find(({iso2}) => iso2 === "IN")}))
  }, [countries])

  useEffect(() => {
    if (isClicked && phone_no?.length > 0) setErrData(prev => ({...prev, ...onPhoneNoValidate()}))
  }, [phone_no, isClicked])

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!isIndividual && !business_name)
      errState = {...errState, errBusinessName: t("business_name_required"), isValid: false}

    if (!first_name) errState = {...errState, errFirstName: t("first_name_required"), isValid: false}

    if (!last_name) errState = {...errState, errLastName: t("last_name_required"), isValid: false}

    if (!phone_no || phone_no.length !== 10)
      errState = {...errState, errPhoneNo: t("valid_phone_required"), isValid: false}
    else if (!country) errState = {...errState, errCountryCode: t("country_code_required"), isValid: false}

    if (!account_type) errState = {...errState, errAccountType: t("account_type_required"), isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: t("valid_email_required"), isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => {
    const phoneNO = (value?.phone_no as string) || ""
    const isValid = phoneNO === "" || isValidInputByRegex(phoneNO, REG_VALID_NUMBER)
    if (isValid && phoneNO.length <= nationalNumberLength) setData(prev => ({...prev, ...value}))
    // else toggleNotify({type: "error", title: "Only numbers are allowed"})
  }

  // useEffect(() => {
  //   const storedData = getStorage<ISignupData>(SESSION_SIGNUP)
  //   if (storedData) setData(storedData)
  // }, [])

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const {errFirstName, errLastName, errEmail, errPhoneNo, errAccountType, errBusinessName, errCountryCode} = errData

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.details_wrapper,
      childElements: [
        {
          elementType: "drop-down",
          label: t("sender_type"),
          name: "account_type",
          error: errAccountType,
          value: account_type,
          options: ACCOUNT_TYPE,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.name_wrapper,
      childElements: [
        {
          elementType: "input",
          label: t("first_name"),
          name: "first_name",
          inputRegex: REG_INPUT_NAME,
          error: errFirstName,
          value: first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: t("last_name"),
          name: "last_name",
          inputRegex: REG_INPUT_NAME,
          error: errLastName,
          value: last_name,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.country_container,
      childElements: [
        {
          childElement: (
            <section>
              <section
                className={`flex ${styles.country_wrapper} ${errCountryCode || errPhoneNo ? styles.error_border : ""}`}>
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
                  label={t("Phone Number")}
                  name="phone_no"
                  value={phone_no}
                  onChangeData={onChangeValue}
                  wrapperClass={styles.phone_number}
                />
                {errPhoneNo && <p className={styles.error_message}>{errPhoneNo}</p>}
              </section>
            </section>
          ),
        },
      ],
    },
    {
      wrapperClassGrid: styles.details_wrapper,
      childElements: [
        {
          elementType: "input",
          label: t("Email"),
          name: "email",
          error: errEmail,
          value: email,
          inputRegex: REG_INPUT_EMAIL,
          onChangeValue,
          wrapperClass: errEmail && styles.mail_wrapper,
        },
      ],
    },
  ]

  if (!isIndividual) {
    formElements.splice(1, 0, {
      wrapperClassGrid: styles.details_wrapper,
      childElements: [
        {
          elementType: "input",
          label: t("Business Name"),
          name: "business_name",
          error: errBusinessName,
          value: business_name,
          onChangeValue,
        },
      ],
    })
  }

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      const payload: ISignupData = {
        first_name,
        last_name,
        email,
        phone_no,
        country,
        account_type,
        business_name,
      }

      setStorage(SESSION_SIGNUP, payload)
      push(routeToOTP("singup"))
    }
  }

  const routeToLogin = () => push(ROUTE_LOGIN)

  return {
    formElements,
    onSubmit,
    routeToLogin,
    t,
  }
}

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errBusinessName: "",
  errFirstName: "",
  errLastName: "",
  errAccountType: "",
  errEmail: "",
  errPhoneNo: "",
  errCountryCode: "",
}

export default useHandler
