import {JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {IRecipient} from "@custom/utils"
import {useRecipientController} from "controller"
import {QUERY_RECIPIENT, ROUTE_REVIEW} from "utils"

export const useHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const {push} = useRouter()
  const {createRecipient} = useRecipientController()
  const {refreshQuery} = useReactQuery()
  const onAdd = () => push(ROUTE_REVIEW)

  const onRouteToReview = () => push(ROUTE_REVIEW)

  const {mutate} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: createRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const [data, setData] = useState({
    recipient_name: "",
    country: "",
    email: "",
    state: "",
    city: "",
    address: "",
    zip_code: "",
    phone_no: "",
    country_code: "",
  })

  const {recipient_name, country, email, state, city, zip_code, phone_no, country_code, address} = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errCountryName: "",
    errStateName: "",
    errEmail: "",
    errCity: "",
    errZipCode: "",
    errPhone: "",
    errCountryCode: "",
    errAddress: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errName: "",
      errCountryName: "",
      errStateName: "",
      errEmail: "",
      errCity: "",
      errAddress: "",
      errZipCode: "",
      errPhone: "",
      errCountryCode: "",
      isValid: true,
    }
    if (!recipient_name) errState = {...errState, errName: "Please enter Your Name", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!country) errState = {...errState, errCountryName: "Please enter Country Name", isValid: false}

    if (!state) errState = {...errState, errStateName: "Please enter State Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Your Pincode", isValid: false}

    if (!phone_no) errState = {...errState, errPhone: "Please enter Your Phone Number", isValid: false}

    if (!address) errState = {...errState, errPhone: "Please enter Your Address", isValid: false}

    if (!country_code) errState = {...errState, errCountryCode: "Please enter Country Code", isValid: false}

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
    const payload: IRecipient = {
      recipient_name,
      email,
      phone_no,
      address,
      country,
      state,
      city,
      zip_code,
      country_code,
    }
    if (isValid) {
      mutate(payload)
      onSuccess("Form submitted successfully!")
      onRouteToReview()
    } else onFailure("Form submission failed. Please check your inputs.")
  }

  return {
    errState,
    onChangeValue,
    onSubmit,
    onAdd,
    data,
  }
}
