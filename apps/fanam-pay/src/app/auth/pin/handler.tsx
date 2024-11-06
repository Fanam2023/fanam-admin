import {FormSectionProps, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_VALID_NUMBER, useCommon, useStorage} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {IPayloadSignup, ISignupData, ISignUpPin, IStyle, SESSION_SIGNUP, TypeScope} from "@custom/utils"
import {useAuthController} from "controller"
import {ROUTE_HOME, ROUTE_LOGIN} from "utils"

const useHandler = (styles: IStyle) => {
  const {getStorage, setStorage, removeStorage} = useStorage()
  const {push} = useRouter()
  const searchParams = useSearchParams()
  const {isValidInputByRegex} = useCommon()
  const scope = searchParams.get("scope") as TypeScope
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false)
  const [data, setData] = useState<ISignUpPin>({
    newPin: "",
    confirmPin: "",
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)
  const {signUp, forgotPin} = useAuthController()
  const {toggleNotify} = useNotifyPopup()

  const {mutate: createUser} = useMutation({
    mutationFn: signUp,
    retry: false,
    onSuccess: async ({result, errorData}) => {
      if (result) {
        toggleNotify({
          type: "success",
          title: "Successfully signed up",
        })
        removeStorage(SESSION_SIGNUP)
        push(ROUTE_HOME)
      } else if (errorData?.message)
        toggleNotify({
          type: "error",
          title: "User exists",
          description: errorData?.message,
        })
    },
  })

  const {mutate: resetPin} = useMutation({
    mutationFn: forgotPin,
    retry: false,
    onSuccess: async ({result, errorData}) => {
      const message = result ? "PIN changed Successfully" : errorData?.message || "Something went wrong"
      toggleNotify({
        type: result ? "success" : "error",
        title: result ? "PIN changed" : "Unable to change PIN",
        description: message,
      })
      if (result) {
        removeStorage(SESSION_SIGNUP)
        push(ROUTE_HOME)
      }
    },
  })

  const {newPin, confirmPin} = data

  const {isClicked} = errData

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!newPin) errState = {...errState, errPin: "Please enter valid pin", isValid: false}
    else if (newPin.length !== 6) errState = {...errState, errPin: "PIN should contain 6 numbers", isValid: false}

    if (!confirmPin) errState = {...errState, errConfirmPin: "Please enter valid pin", isValid: false}
    else if (confirmPin !== newPin)
      errState = {...errState, errConfirmPin: "Please ensure your PIN and confirmation PIN match", isValid: false}

    setErrData(errState)

    return errState
  }

  const isSequential = (pin: string): boolean => {
    const ascending = "1234567890"
    const descending = "0987654321"
    const isRepeated = pin.split("").every(char => char === pin[0])
    return ascending.includes(pin) || descending.includes(pin) || isRepeated
  }

  const onChangeValue = (value: JSONObject) => {
    const pinValue = (value.newPin || value.confirmPin || "") as string
    const isPinValid = !pinValue || isValidInputByRegex(pinValue, REG_VALID_NUMBER)
    const isPinSequential = pinValue.length === 6 && isSequential(pinValue)
    setData(prev => ({...prev, ...value}))
    if (value.newPin) {
      const shouldDisableConfirmPin = !isPinValid || isPinSequential
      setIsNextDisabled(shouldDisableConfirmPin)
      if (shouldDisableConfirmPin) setData(prev => ({...prev, confirmPin: ""}))
      toggleNotify({
        type: "error",
        title: !isPinValid ? "Only numbers are allowed" : isPinSequential ? "PIN cannot be a continuous sequence" : "",
        description: !isPinValid
          ? "Only numbers are allowed"
          : isPinSequential
            ? "PIN cannot be a continuous sequence"
            : "",
      })
    }
  }

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const {errConfirmPin, errPin} = errData

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.details_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Pin",
          name: "newPin",
          error: errPin,
          value: newPin,
          maxLength: 6,
          type: "password",
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Confirm Pin",
          name: "confirmPin",
          error: errConfirmPin,
          type: "password",
          disabled: isNextDisabled,
          value: confirmPin,
          maxLength: 6,
          onChangeValue,
        },
      ],
    },
  ]

  const stringToBase64 = (inputString: string) => Buffer.from(inputString).toString("base64")

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      const storedData = getStorage<ISignupData>(SESSION_SIGNUP)
      if (storedData) {
        if (scope === "singup") {
          const {account_type, country} = storedData
          const accountType = account_type.key
          const countryId = country?.country_id
          const payload: IPayloadSignup = {
            ...storedData,
            newPin,
            confirmPin,
            account_type: accountType,
            country_id: countryId,
          }

          if (accountType === "Individual") delete payload.business_name

          createUser({...payload, newPin: stringToBase64(newPin), confirmPin: stringToBase64(confirmPin)})
        } else if (scope === "reset")
          resetPin({
            phone_no: storedData.phone_no,
            newPin: stringToBase64(newPin),
            confirmPin: stringToBase64(confirmPin),
            country_id: storedData?.country?.country_id,
          })
      } else push(ROUTE_LOGIN)
    }
  }

  const routeToLogin = () => push(ROUTE_LOGIN)

  return {
    formElements,
    onSubmit,
    routeToLogin,
    scope,
  }
}

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errPin: "",
  errConfirmPin: "",
}

export default useHandler
