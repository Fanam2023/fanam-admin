import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {ROUTE_BENEFICIARIES} from "utils"

export const useHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const {push} = useRouter()

  const [data, setData] = useState({
    account_name: "",
    confirm_account: "",
    account_number: "",
    iban_number: "",
    swift_code: "",
    routing_code: "",
    recipient_address: "",
    bank_name: "",
    branch_address: "",
    country_name: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  })

  const {
    account_name,
    confirm_account,
    account_number,
    iban_number,
    swift_code,
    routing_code,
    recipient_address,
    bank_name,
    branch_address,
    country_name,
    email,
    state,
    city,
    pincode,
    phone,
  } = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errName: "",
    errConfirmAc: "",
    errIBANNumber: "",
    errAcNumber: "",
    errSwiftCode: "",
    errRoutingcode: "",
    errAddress: "",
    errBankName: "",
    errBranch: "",
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
      errConfirmAc: "",
      errIBANNumber: "",
      errAcNumber: "",
      errSwiftCode: "",
      errRoutingcode: "",
      errAddress: "",
      errBankName: "",
      errBranch: "",
      errCountryName: "",
      errStateName: "",
      errEmail: "",
      errCity: "",
      errPincode: "",
      errPhone: "",
      isValid: true,
    }
    if (!account_name) errState = {...errState, errName: "Please enter Account Holder Name", isValid: false}

    if (!account_number) errState = {...errState, errAcNumber: "Please enter Account Number", isValid: false}

    if (!confirm_account) errState = {...errState, errConfirmAc: "Please Confirm Ac Number", isValid: false}

    if (!iban_number) errState = {...errState, errIBANNumber: "Please enter IBAN Number", isValid: false}

    if (!swift_code) errState = {...errState, errSwiftCode: "Please enter Swift Code", isValid: false}

    if (!routing_code) errState = {...errState, errRoutingcode: "Please enter Your Pincode", isValid: false}

    if (!recipient_address) errState = {...errState, errAddress: "Please enter Recipient Address", isValid: false}

    if (!bank_name) errState = {...errState, errBankName: "Please enter Recipient Bank Name", isValid: false}

    if (!branch_address) errState = {...errState, errBranch: "Please enter Recipient Branch Address", isValid: false}

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
    if (isValid) {
      onSuccess("Form submitted successfully!")
      push(ROUTE_BENEFICIARIES)
    } else onFailure("Form submission failed. Please check your inputs.")
  }

  return {
    errState,
    onChangeValue,
    onSubmit,
    data,
  }
}
