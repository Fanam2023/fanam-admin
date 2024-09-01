import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_EMAIL, REG_INDIAN_MOBILE, useCommon, useStorage} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useCallback, useEffect, useState} from "react"
import {ISignUp, IStyle, IUserBase, SESSION_SIGNUP} from "@custom/utils"
import {ROUTE_LOGIN, ROUTE_OTP} from "utils"

const useHandler = (styles: IStyle) => {
  const {isValidInputByRegex} = useCommon()
  const {getStorage, setStorage} = useStorage()
  const {push} = useRouter()
  const [data, setData] = useState<ISignUp>({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    account_type: "",
    newPin: "",
    confirmPin: "",
    country_code: null,
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {first_name, last_name, email, phone_no, account_type, newPin, confirmPin} = data

  const {isClicked} = errData

  const onPhoneNoValidate = useCallback(() => {
    let errText = ""
    if (!phone_no) errText = "Please enter phone number"
    else if (!isValidInputByRegex(phone_no, REG_INDIAN_MOBILE)) {
      errText = "Please enter valid indian phone number"
    }

    return {errPhone: errText, isValid: !errText}
  }, [phone_no])

  useEffect(() => {
    if (isClicked) {
      if (phone_no?.length > 0) {
        setErrData(prev => ({...prev, ...onPhoneNoValidate()}))
      }
    }
  }, [phone_no, isClicked])

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!first_name) errState = {...errState, errFirstName: "Please enter FirstName", isValid: false}

    if (!last_name || last_name.length < 2)
      errState = {...errState, errLastName: "LastName must be longer than 2 characters", isValid: false}

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter PhoneNumber", isValid: false}

    if (!account_type) errState = {...errState, errAccountType: "Please enter AccountType", isValid: false}

    if (!newPin) errState = {...errState, errPin: "Please enter valid pin", isValid: false}

    if (!confirmPin) errState = {...errState, errConfirmPin: "Please enter valid pin", isValid: false}
    else if (confirmPin !== newPin)
      errState = {...errState, errConfirmPin: "Not Match confirm pin and pin", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  useEffect(() => {
    const storedData = getStorage<ISignUp>(SESSION_SIGNUP)
    if (storedData) setData(storedData)
  }, [])

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const {errFirstName, errLastName, errEmail, errPhoneNo, errAccountType, errConfirmPin, errPin} = errData

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.name_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "First Name",
          name: "first_name",
          error: errFirstName,
          value: first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Last Name",
          name: "last_name",
          error: errLastName,
          value: last_name,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.details_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Phone Number",
          name: "phone_no",
          error: errPhoneNo,
          value: phone_no,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Email",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Pin",
          name: "newPin",
          error: errPin,
          value: newPin,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Confirm Pin",
          name: "confirmPin",
          error: errConfirmPin,
          value: confirmPin,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Sender type",
          name: "account_type",
          error: errAccountType,
          value: account_type,
          options: ["Personal", "Business"],
          onChangeValue,
        },
      ],
    },
  ]

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      const payload: IUserBase = {
        first_name,
        last_name,
        email,
        phone_no,
        country_code: "+91",
        account_type,
        newPin,
        confirmPin,
      }
      setStorage(SESSION_SIGNUP, payload)
      push(ROUTE_OTP)
    }
  }

  const routeToLogin = () => push(ROUTE_LOGIN)

  return {
    formElements,
    onSubmit,
    routeToLogin,
  }
}

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errFirstName: "",
  errLastName: "",
  errAccountType: "",
  errEmail: "",
  errPhoneNo: "",
  errPin: "",
  errConfirmPin: "",
}

export default useHandler
