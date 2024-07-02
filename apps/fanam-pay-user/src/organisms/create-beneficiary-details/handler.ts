import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject, useCookies, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useSlider} from "@custom/ui"
import {IBeneficiary, IStyle} from "@custom/utils"
import {COOKIE_TRANSACTION_ID, ROUTE_PAYMENT_OPTIONS} from "utils"

export const useHandler = (styles: IStyle) => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {getCookie} = useCookies()
  const transId = getCookie(COOKIE_TRANSACTION_ID)

  const onRouteToOptions = () => push(ROUTE_PAYMENT_OPTIONS)

  const [data, setData] = useState({
    beneficiary_name: "",
    phone_no: "",
    email: "",
    relationship: "",
    address_line1: "",
    address_line2: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    country_code: "",
  })

  const {
    beneficiary_name,
    phone_no,
    email,
    relationship,
    address_line1,
    address_line2,
    country,
    state,
    city,
    zip_code,
    country_code,
  } = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errEmail: "",
    errRelation: "",
    errNumber: "",
    errAddressLine1: "",
    errAddressLine2: "",
    errCountry: "",
    errStateName: "",
    errCity: "",
    errZipCode: "",
    errCountryCode: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errName: "",
      errEmail: "",
      errRelation: "",
      errNumber: "",
      errAddressLine1: "",
      errAddressLine2: "",
      errCountry: "",
      errStateName: "",
      errCity: "",
      errZipCode: "",
      errCountryCode: "",
      isValid: true,
    }
    if (!beneficiary_name) errState = {...errState, errName: "Please enter Beneficiary Name", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!phone_no) errState = {...errState, errNumber: "Please Confirm Ac Number", isValid: false}

    if (!relationship)
      errState = {...errState, errRelation: "Please enter Your Relationship with sender", isValid: false}

    if (!address_line1) errState = {...errState, errAddressLine1: "Please enter Beneficiary Address", isValid: false}

    if (!address_line2) errState = {...errState, errAddressLine2: "Please enter Beneficiary Address", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please enter Country Name", isValid: false}

    if (!country_code) errState = {...errState, errCountryCode: "Please enter Country Code", isValid: false}

    if (!state) errState = {...errState, errStateName: "Please enter Sate Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Your ZipCode", isValid: false}

    return errState
  }

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onSubmit = () => {
    const errState = {...onValidate(), isClicked: true}
    const {isValid} = errState
    setErrState(errState)

    const payload: IBeneficiary = {
      beneficiary_name,
      email,
      phone_no,
      address_line1,
      address_line2,
      country,
      state,
      city,
      zip_code,
      country_code,
      relationship,
      transaction_id: transId,
    }

    return isValid ? payload : null
  }

  const {
    errName,
    errEmail,
    errNumber,
    errRelation,
    errAddressLine1,
    errAddressLine2,
    errCountry,
    errStateName,
    errCity,
    errZipCode,
    errCountryCode,
  } = errState

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.beneficiary_address_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Enter Benificiary Name",
          name: "beneficiary_name",
          value: beneficiary_name,
          error: errName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter E-Mail ID",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_no",
          value: phone_no,
          error: errNumber,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Enter Relationship with Sender",
          name: "relationship",
          value: relationship,
          error: errRelation,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Address line1",
          name: "address_line1",
          value: address_line1,
          error: errAddressLine1,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Address Line2",
          name: "address_line2",
          value: address_line2,
          error: errAddressLine2,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Country",
          name: "country",
          value: country,
          error: errCountry,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter State",
          name: "state",
          value: state,
          error: errStateName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter City/District",
          name: "city",
          value: city,
          error: errCity,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Zip Code",
          name: "zip_code",
          value: zip_code,
          error: errZipCode,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your countryCode",
          name: "country_code",
          value: country_code,
          error: errCountryCode,
          onChangeValue,
        },
      ],
    },
  ]

  return {
    formElements,
    isDesktop,
    onChangeValue,
    onSubmit,
    onRouteToOptions,
    toggleSlider,
  }
}
