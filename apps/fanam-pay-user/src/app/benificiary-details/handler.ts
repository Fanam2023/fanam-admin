import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {ROUTE_REVIEW} from "utils"

export const useBeneficiaryHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const {push} = useRouter()
  const onReview = () => push(ROUTE_REVIEW)

  const [data, setData] = useState({
    benificiary_name: "",
    phone_number: "",
    email: "",
    relationship: "",
    address: "",
    country_name: "",
    state: "",
    city: "",
    zip_code: "",
  })

  const {benificiary_name, phone_number, email, relationship, address, country_name, state, city, zip_code} = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errEmail: "",
    errRelation: "",
    errNumber: "",
    errAddress: "",
    errCountryName: "",
    errStateName: "",
    errCity: "",
    errZipCode: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errName: "",
      errEmail: "",
      errRelation: "",
      errNumber: "",
      errAddress: "",
      errCountryName: "",
      errStateName: "",
      errCity: "",
      errZipCode: "",
      isValid: true,
    }
    if (!benificiary_name) errState = {...errState, errName: "Please enter Benificiary Name", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!phone_number) errState = {...errState, errNumber: "Please Confirm Ac Number", isValid: false}

    if (!relationship)
      errState = {...errState, errRelation: "Please enter Your Relationship with sender", isValid: false}

    if (!address) errState = {...errState, errAddress: "Please enter Benificiary Address", isValid: false}

    if (!country_name) errState = {...errState, errCountryName: "Please enter Country Name", isValid: false}

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
    if (isValid) onSuccess("Form submitted successfully!")
    else onFailure("Form submission failed. Please check your inputs.")
  }

  return {
    errState,
    onChangeValue,
    onSubmit,
    onReview,
    data,
  }
}
