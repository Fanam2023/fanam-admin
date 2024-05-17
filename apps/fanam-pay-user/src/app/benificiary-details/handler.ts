import {JSONObject} from "@fanam-pkg/core-utils"
import {useEffect, useState} from "react"

const useBeneficiary = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const [data, setData] = useState({
    benificiary_name: "",
    phone_number: "",
    email: "",
    relationship: "",
  })

  const {benificiary_name, phone_number, email, relationship} = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errEmail: "",
    errRelation: "",
    errNumber: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errName: "",
      errEmail: "",
      errRelation: "",
      errNumber: "",
      isValid: true,
    }
    if (!benificiary_name) errState = {...errState, errName: "Please enter Benificiary Name", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!phone_number) errState = {...errState, errNumber: "Please Confirm Ac Number", isValid: false}

    if (!relationship)
      errState = {...errState, errRelation: "Please enter Your Relationship with sender", isValid: false}

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

export default useBeneficiary
