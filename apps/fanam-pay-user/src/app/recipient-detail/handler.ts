import {JSONObject} from "@fanam-pkg/core-utils"
import {useEffect, useState} from "react"

const useCreateReciptent = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const [data, setData] = useState({
    name: "",
    country_name: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  })

  const {name, country_name, email, state, city, pincode, phone} = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errCountryName: "",
    errStateName: "",
    errEmail: "",
    errCity: "",
    errPincode: "",
    errPhone: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errName: "",
      errCountryName: "",
      errStateName: "",
      errEmail: "",
      errCity: "",
      errPincode: "",
      errPhone: "",
      isValid: true,
    }
    if (!name) errState = {...errState, errName: "Please enter Your Name", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!country_name) errState = {...errState, errCountryName: "Please enter Country Name", isValid: false}

    if (!state) errState = {...errState, errStateName: "Please enter Sate Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!pincode) errState = {...errState, errPincode: "Please enter Your Pincode", isValid: false}

    if (!phone) errState = {...errState, errPhone: "Please enter Your Phone Number", isValid: false}

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
    data,
  }
}

export default useCreateReciptent
