import {JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {IBeneficiary} from "@custom/utils"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY, ROUTE_PAYMENT} from "utils"

export const useHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const {push} = useRouter()
  const {createBeneficiary} = useBeneficiaryController()
  const {refreshQuery} = useReactQuery()

  const onRouteToOptions = () => push(ROUTE_PAYMENT)

  const {mutate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully created")
      else onFailure(errorData.message)
    },
  })

  const onReview = () => push(ROUTE_PAYMENT)

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
    if (isValid) {
      mutate(payload)
      onSuccess("Form submitted successfully!")
      onRouteToOptions()
    } else onFailure("Form submission failed. Please check your inputs.")
  }

  return {
    errState,
    onChangeValue,
    onSubmit,
    onReview,
    data,
  }
}
