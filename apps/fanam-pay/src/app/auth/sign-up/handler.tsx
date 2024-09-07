import {FormSectionProps, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_EMAIL, REG_INDIAN_MOBILE, useStorage} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useCallback, useEffect, useState} from "react"
import {useSlider} from "@custom/ui"
import {IBaseSignUp, ICountry, IStyle, SESSION_SIGNUP} from "@custom/utils"
import assets from "assets"
import {useCommon} from "hooks"
import {CountryPopup} from "organisms"
import {ACCOUNT_TYPE, ROUTE_LOGIN, routeToOTP} from "utils"

const useHandler = (styles: IStyle) => {
  const {isValidInputByRegex, getFlagUrl} = useCommon()
  const {getStorage, setStorage} = useStorage()
  const {toggleSlider} = useSlider()
  const {push} = useRouter()
  const [data, setData] = useState<IBaseSignUp>({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    account_type: "",
    country_code: null,
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {first_name, last_name, email, phone_no, account_type, country_code} = data

  const {isClicked} = errData

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

  const onPhoneNoValidate = useCallback(() => {
    let errText = ""
    if (!phone_no) errText = "Please enter phone number"
    else if (!isValidInputByRegex(phone_no, REG_INDIAN_MOBILE)) {
      errText = "Please enter valid indian phone number"
    }

    return {errPhone: errText, isValid: !errText}
  }, [phone_no])

  useEffect(() => {
    if (isClicked && phone_no?.length > 0) setErrData(prev => ({...prev, ...onPhoneNoValidate()}))
  }, [phone_no, isClicked])

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!first_name) errState = {...errState, errFirstName: "Please enter FirstName", isValid: false}

    if (!last_name || last_name.length < 2)
      errState = {...errState, errLastName: "LastName must be longer than 2 characters", isValid: false}

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter PhoneNumber", isValid: false}
    else if (!country_code) errState = {...errState, errCountryCode: "Please choose your country code", isValid: false}

    if (!account_type) errState = {...errState, errAccountType: "Please enter AccountType", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  useEffect(() => {
    const storedData = getStorage<IBaseSignUp>(SESSION_SIGNUP)
    if (storedData) setData(storedData)
  }, [])

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const {errFirstName, errLastName, errEmail, errPhoneNo, errAccountType, errConfirmPin, errPin} = errData

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.name_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "First Name",
          name: "first_name",
          error: errFirstName,
          value: first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Last Name",
          name: "last_name",
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
            <>
              <section className={`flex ${styles.country_wrapper}`} onClick={goToCountrySlider}>
                <ImageView
                  src={country_code ? getFlagUrl(country_code) : assets.ic_india_flag}
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
              />
            </>
          ),
        },
      ],
    },
    {
      wrapperClassGrid: styles.details_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Email",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Sender type",
          name: "account_type",
          error: errAccountType,
          value: account_type,
          options: ACCOUNT_TYPE,
          onChangeValue,
        },
      ],
    },
  ]

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      const payload: IBaseSignUp = {
        first_name,
        last_name,
        email,
        phone_no,
        country_code: country_code ? `+${(country_code as ICountry).phone_code}` : "+91",
        account_type,
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
  }
}

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errFirstName: "",
  errLastName: "",
  errAccountType: "",
  errEmail: "",
  errPhoneNo: "",
  errPin: "",
  errConfirmPin: "",
  errCountryCode: "",
}

export default useHandler
