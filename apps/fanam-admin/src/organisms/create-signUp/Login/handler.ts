import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useState} from "react"
import styles from "./styles.module.sass"

export const useHandler = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errEmail: "",
    errPassword: "",
  })

  const {email, password} = data

  const onValidate = () => {
    let errState = {
      errEmail: "",
      errPassword: "",
      isValid: true,
    }
    if (!email) errState = {...errState, errEmail: "Please Enter Valid Maild ID", isValid: false}

    if (!password) errState = {...errState, errPassword: "Please enter the Correct Password", isValid: false}

    return errState
  }

  const {errEmail, errPassword} = errState

  const onChangeData = (input: JSONObject) => setData(prev => ({...prev, ...input}))

  const formElements: FormSectionProps[] = [
    {
      wrapperClass: styles.text_wrapper,
      childElements: [
        {
          elementType: "input",
          error: errEmail,
          label: "E-Mail",
          inputClassName: "E-Mail",
          onChangeData,
        },
        {
          elementType: "input",
          label: "Password",
          error: errPassword,
          inputClassName: "Password",
          type: password,
          onChangeData,
        },
      ],
    },
  ]
  const onSubmit = () => {
    const errState = onValidate()
    const {isValid} = errState
    setErrState(prev => ({...prev, ...errState, isClicked: true}))
    return isValid
  }

  return {
    formElements,
    onSubmit,
  }
}
