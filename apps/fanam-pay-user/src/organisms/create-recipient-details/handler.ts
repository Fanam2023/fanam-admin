import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {IRecipient} from "@custom/utils"
import {ROUTE_REVIEW} from "utils"
import styles from "./styles.module.sass"

export const useHandler = () => {
  const {push} = useRouter()
  const onAdd = () => push(ROUTE_REVIEW)

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
    // account_holder: "",
    // account_no: "",
    // confirm_account_no: "",
    // iban_no: "",
    // swift_code: "",
    // routing_code: "",
  })

  const {
    recipient_name,
    country,
    email,
    state,
    city,
    zip_code,
    phone_no,
    country_code,
    address,
    // account_holder,
    // account_no,
    // confirm_account_no,
    // iban_no,
    // swift_code,
    // routing_code,
  } = data

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
    // errAccount_holder: "",
    // errAccount_no: "",
    // errConfirm_account_no: "",
    // errIban_no: "",
    // errSwift_code: "",
    // errRouting_code: "",
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
      // errAccount_holder: "",
      // errAccount_no: "",
      // errConfirm_account_no: "",
      // errIban_no: "",
      // errSwift_code: "",
      // errRouting_code: "",
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

    //recipient account Details

    // if (!account_holder)
    //   errState = {...errState, errCountryCode: "Please enter the account holder name", isValid: false}

    // if (!account_no) errState = {...errState, errCountryCode: "Please enter your account number", isValid: false}

    // if (!confirm_account_no)
    //   errState = {...errState, errCountryCode: "Please enter the confirm account number", isValid: false}

    // if (!swift_code) errState = {...errState, errCountryCode: "Please enter the swift code", isValid: false}

    // if (!iban_no) errState = {...errState, errCountryCode: "Please enter the iban number", isValid: false}

    // if (!routing_code) errState = {...errState, errCountryCode: "Please enter the routing code", isValid: false}

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

    return isValid ? payload : null
  }

  const {
    errName,
    errEmail,
    errPhone,
    errAddress,
    errCountryName,
    errStateName,
    errCity,
    errZipCode,
    errCountryCode,
    // errAccount_holder,
    // errAccount_no,
    // errIban_no,
    // errConfirm_account_no,
    // errRouting_code,
    // errSwift_code,
  } = errState

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.recipient_address_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Enter Recipient Name",
          name: "recipient_name",
          value: recipient_name,
          error: errName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter E-Mail ID",
          name: "email",
          value: email,
          error: errEmail,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_no",
          value: phone_no,
          error: errPhone,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Enter Recipient Address",
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
          error: errCountryName,
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
    // {
    //   wrapperClass: styles.wrapper,
    //   wrapperClassGrid: styles.wrapper,
    //   title: "Add Recipient Account Details",
    //   childElements: [
    //     {
    //       elementType: "input",
    //       label: "Enter Name of the Account Holder ",
    //       name: "account_holder",
    //       value: account_holder,
    //       error: errAccount_holder,
    //       onChangeValue,
    //     },
    //     {
    //       elementType: "input",
    //       label: "Enter Account Number",
    //       name: "account_no",
    //       value: account_no,
    //       error: errAccount_no,
    //       onChangeValue,
    //     },
    //     {
    //       elementType: "input",
    //       label: "Confirm Account Number",
    //       name: "confirm_account_no",
    //       value: confirm_account_no,
    //       error: errConfirm_account_no,
    //       onChangeValue,
    //     },
    //     {
    //       elementType: "input",
    //       label: "Enter IBAN Number",
    //       name: "iban_no",
    //       value: iban_no,
    //       error: errIban_no,
    //       onChangeValue,
    //     },
    //     {
    //       elementType: "input",
    //       label: "Enter Swift Code",
    //       name: "swift_code",
    //       value: swift_code,
    //       error: errSwift_code,
    //       onChangeValue,
    //     },
    //     {
    //       elementType: "input",
    //       label: "Enter Routing Code",
    //       name: "routing_code",
    //       value: routing_code,
    //       error: errRouting_code,
    //       onChangeValue,
    //     },
    //   ],
    // },
  ]

  return {
    onChangeValue,
    onSubmit,
    onAdd,
    formElements,
  }
}
