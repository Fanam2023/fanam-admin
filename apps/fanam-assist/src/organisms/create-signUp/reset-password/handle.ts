"use client"

import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useState} from "react"
import styles from "./styles.module.sass"

export const useHandler = () => {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    createPassword: "",
  })

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errEmail: "",
    errNewPass: "",
    errCreatePass: "",
  })

  const {email, newPassword, createPassword} = data

  const onValidate = () => {
    let errState = {
      errEmail: "",
      errNewPass: "",
      errCreatePass: "",
      isValid: true,
    }
    if (!email) errState = {...errState, errEmail: "Please Enter A Valid Email", isValid: false}

    if (!newPassword) errState = {...errState, errNewPass: "Enter A Valid Password", isValid: false}

    if (!createPassword) errState = {...errState, errCreatePass: "Password doesn't match"}
    return errState
  }

  const {errEmail, errNewPass, errCreatePass} = errState

  const onChangeData = (input: JSONObject) => setData(prev => ({...prev, ...input}))

  const formElements: FormSectionProps[] = [
    {
      wrapperClass: styles.field_wrapper,
      childElements: [
        {
          elementType: "input",
          error: errEmail,
          label: "E-mail",
          inputClassName: "E-mail",
          onChangeData,
        },
        {
          elementType: "input",
          label: "New Password",
          inputClassName: "New Password",
          error: errNewPass,
          onChangeData,
        },
        {
          elementType: "input",
          label: "Confirm New Password",
          inputClassName: "Confirm New Password",
          error: errCreatePass,
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
