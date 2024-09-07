"use client"

import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useState} from "react"
import styles from "./styles.module.sass"

export const useHandler = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    profession: "",
    dob: "",
    createPassword: "",
    confirmPassword: "",
    city: "",
    country: "",
  })

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errFirstName: "",
    errLastName: "",
    errEmail: "",
    errProfession: "",
    errDob: "",
    errCreatePassword: "",
    errConfirmPassword: "",
    errCity: "",
    errCountry: "",
  })

  const {firstName, lastName, email, profession, dob, createPassword, confirmPassword, city, country} = data

  const onValidate = () => {
    let errState = {
      errFirstName: "",
      errLastName: "",
      errEmail: "",
      errProfession: "",
      errDob: "",
      errCreatePassword: "",
      errConfirmPassword: "",
      errCity: "",
      errCountry: "",
      isValid: true,
    }

    if (!firstName) {
      errState = {...errState, errFirstName: "Please enter First Name", isValid: false}
    }

    if (!lastName) {
      errState = {...errState, errLastName: "Please enter Last Name", isValid: false}
    }

    if (!email) {
      errState = {...errState, errEmail: "Please enter Email", isValid: false}
    }

    if (!profession) {
      errState = {...errState, errProfession: "Please enter Profession", isValid: false}
    }

    if (!dob) {
      errState = {...errState, errDob: "Please enter DOB", isValid: false}
    }

    if (!createPassword) {
      errState = {...errState, errCreatePassword: "Please enter a Valid Password", isValid: false}
    }

    if (!confirmPassword) {
      errState = {...errState, errConfirmPassword: "Please enter a Valid Password", isValid: false}
    }

    if (!city) {
      errState = {...errState, errCity: "Please enter City", isValid: false}
    }

    if (!country) {
      errState = {...errState, errCountry: "Please enter Country", isValid: false}
    }

    return errState
  }

  const {
    errFirstName,
    errLastName,
    errEmail,
    errProfession,
    errDob,
    errCreatePassword,
    errConfirmPassword,
    errCountry,
    errCity,
  } = errState

  const onChangeData = (input: JSONObject) => setData(prev => ({...prev, ...input}))

  const formElements: FormSectionProps[] = [
    {
      wrapperClass: styles.account_wrapper,
      childElements: [
        {
          elementType: "input",
          inputClassName: "First Name",
          label: "First Name",
          error: errFirstName,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "Last Name",
          label: "Last Name",
          error: errLastName,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "Email",
          label: "Email",
          error: errEmail,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "Profession",
          label: "Profession",
          error: errProfession,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "DOB",
          label: "DOB",
          error: errDob,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "Create Password",
          label: "Create Password",
          error: errCreatePassword,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "Confirm Password",
          label: "Confirm Password",
          error: errConfirmPassword,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "City",
          label: "City",
          error: errCity,
          onChangeData,
        },
        {
          elementType: "input",
          inputClassName: "Country",
          label: "Country",
          error: errCountry,
          onChangeData,
        },
      ],
    },
  ]

  const onSubmit = () => {
    const errors = onValidate()
    const {isValid} = errors
    setErrState(prev => ({...prev, ...errors, isClicked: true}))
    return isValid
  }

  return {
    onSubmit,
    formElements,
  }
}
