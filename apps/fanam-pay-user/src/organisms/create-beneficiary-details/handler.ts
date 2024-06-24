import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {IBeneficiary} from "@custom/utils"
import {ROUTE_PAYMENT_OPTIONS} from "utils"

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
    }

    return isValid ? payload : null
  }

  return {
    errState,
    onChangeValue,
    onSubmit,
    data,
    onRouteToOptions,
  }
}
