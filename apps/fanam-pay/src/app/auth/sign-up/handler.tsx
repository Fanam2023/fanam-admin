import {FormSectionProps, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_EMAIL, REG_INDIAN_MOBILE, REG_VALID_NUMBER, useStorage} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useCallback, useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {ICountry, ISignupData, IStyle, REG_INPUT_EMAIL, REG_INPUT_NAME, SESSION_SIGNUP} from "@custom/utils"
import assets from "assets"
import {useLocationController} from "controller"
import {useCommon} from "hooks"
import {CountryPopup} from "organisms"
import {ACCOUNT_TYPE, QUERY_COUNTRIES, ROUTE_LOGIN, routeToOTP} from "utils"

const useHandler = (styles: IStyle) => {
  const {isValidInputByRegex, getFlagUrl} = useCommon()
  const {getStorage, setStorage} = useStorage()
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

  const onSelectCountry = (country: ICountry) => {
    setData(prev => ({
      ...prev,
      country,
    }))
    toggleSlider()
  }

  const goToCountrySlider = () =>
    toggleSlider({
      children: <CountryPopup onSelect={onSelectCountry} selCountry={country} countries={countries} />,
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
    if (countries?.length) setData(prev => ({...prev, country: countries?.find(({iso2}) => iso2 === "IN")}))
  }, [countries])

  useEffect(() => {
    if (isClicked && phone_no?.length > 0) setErrData(prev => ({...prev, ...onPhoneNoValidate()}))
  }, [phone_no, isClicked])

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!isIndividual && !business_name)
      errState = {...errState, errBusinessName: "Please enter Business name", isValid: false}

    if (!first_name) errState = {...errState, errFirstName: "Please enter FirstName", isValid: false}

    if (!last_name || last_name.length < 1)
      errState = {...errState, errLastName: "LastName must be longer than 1 characters", isValid: false}

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter PhoneNumber", isValid: false}
    else if (!country) errState = {...errState, errCountryCode: "Please choose your country code", isValid: false}

    if (!account_type) errState = {...errState, errAccountType: "Please enter AccountType", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => {
    const phoneNO = (value?.phone_no as string) || ""
    const isValid = phoneNO === "" || isValidInputByRegex(phoneNO, REG_VALID_NUMBER)
    if (isValid && phoneNO.length <= 10) setData(prev => ({...prev, ...value}))
    // else toggleNotify({type: "error", title: "Only numbers are allowed"})
  }

  useEffect(() => {
    const storedData = getStorage<ISignupData>(SESSION_SIGNUP)
    if (storedData) setData(storedData)
  }, [])

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
          label: "Sender type",
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
          label: "First Name",
          name: "first_name",
          inputRegex: REG_INPUT_NAME,
          error: errFirstName,
          value: first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Last Name",
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
            <>
              <section
                className={`flex ${styles.country_wrapper} ${errCountryCode ? styles.error_border : ""}`}
                onClick={goToCountrySlider}>
                <ImageView
                  src={country ? getFlagUrl(country) : assets.ic_world}
                  alt="country-img"
                  imgSize={24}
                  wrapperClass={styles.flag}
                />
                {country ? `+${country.phone_code}` : "-"}
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
          inputRegex: REG_INPUT_EMAIL,
          onChangeValue,
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
          label: "Business Name",
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
