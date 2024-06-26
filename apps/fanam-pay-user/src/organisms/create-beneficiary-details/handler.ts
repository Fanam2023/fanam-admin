import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {IBeneficiary} from "@custom/utils"
import {ROUTE_PAYMENT_OPTIONS} from "utils"
import styles from "./styles.module.sass"

export const useHandler = () => {
  const {push} = useRouter()

  const onRouteToOptions = () => push(ROUTE_PAYMENT_OPTIONS)

  const [data, setData] = useState({
    beneficiary_name: "",
    phone_no: "",
    email: "",
    relationship: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    country_code: "",
  })

  const {beneficiary_name, phone_no, email, relationship, address, country, state, city, zip_code, country_code} = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errEmail: "",
    errRelation: "",
    errNumber: "",
    errAddress: "",
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
      errAddress: "",
      errCountry: "",
      errStateName: "",
      errCity: "",
      errZipCode: "",
      errCountryCode: "",
      isValid: true,
    }
    if (!beneficiary_name) errState = {...errState, errName: "Please enter Benificiary Name", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!phone_no) errState = {...errState, errNumber: "Please Confirm Ac Number", isValid: false}

    if (!relationship)
      errState = {...errState, errRelation: "Please enter Your Relationship with sender", isValid: false}

    if (!address) errState = {...errState, errAddress: "Please enter Benificiary Address", isValid: false}

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
      address,
      country,
      state,
      city,
      zip_code,
      country_code,
      relationship,
    }

    return isValid ? payload : null
  }

  const {
    errName,
    errEmail,
    errNumber,
    errRelation,
    errAddress,
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
          label: "Enter Benificiary Address",
          name: "address",
          value: address,
          error: errAddress,
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
    onChangeValue,
    onSubmit,
    onRouteToOptions,
    formElements,
  }
}
