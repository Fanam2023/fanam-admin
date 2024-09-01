"use client"

import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useState} from "react"
import styles from "./styles.module.sass"

export const useHandler = () => {
  const [data, setData] = useState({
    email: "",
  })

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errEmail: "",
  })

  const {email} = data

  const onValidate = () => {
    let errState = {
      errEmail: "",
      isValid: true,
    }
    if (!email) errState = {...errState, errEmail: "Please Enter A Valid Email", isValid: false}
    return errState
  }

  const {errEmail} = errState

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
