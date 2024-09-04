import {FormSectionProps, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, useStorage} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {ISignUpPin, IStyle, IUserBase, SESSION_SIGNUP, TypeScope} from "@custom/utils"
import {useAuthController} from "controller"
import {ROUTE_HOME, ROUTE_LOGIN} from "utils"

const useHandler = (styles: IStyle) => {
  const {getStorage, setStorage, removeStorage} = useStorage()
  const {push} = useRouter()
  const searchParams = useSearchParams()
  const scope = searchParams.get("scope") as TypeScope
  const [data, setData] = useState<ISignUpPin>({
    newPin: "",
    confirmPin: "",
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)
  const {signUp, registerWebAuth, forgotPin} = useAuthController()
  const {toggleNotify} = useNotifyPopup()

  const {mutate: createUser} = useMutation({
    mutationFn: signUp,
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
          title: errorData?.message || "Something went wrong",
        })
    },
  })

  const {mutate: resetPin} = useMutation({
    mutationFn: forgotPin,
    onSuccess: async ({result, errorData}) => {
      if (result) {
        toggleNotify({
          type: "success",
          title: "PIN resetted Successfully",
        })
        removeStorage(SESSION_SIGNUP)
        push(ROUTE_HOME)
      } else if (errorData?.message)
        toggleNotify({
          type: "error",
          title: errorData?.message || "Something went wrong",
        })
    },
  })

  const {newPin, confirmPin} = data

  const {isClicked} = errData

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!newPin) errState = {...errState, errPin: "Please enter valid pin", isValid: false}

    if (!confirmPin) errState = {...errState, errConfirmPin: "Please enter valid pin", isValid: false}
    else if (confirmPin !== newPin)
      errState = {...errState, errConfirmPin: "Not Match confirm pin and pin", isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

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
      ],
    },
  ]

  const stringToBase64 = (inputString: string) => Buffer.from(inputString).toString("base64")

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      const storedData = getStorage<IUserBase>(SESSION_SIGNUP)
      if (storedData) {
        if (scope === "singup") {
          const payload: IUserBase = {
            ...storedData,
            newPin,
            confirmPin,
          }

          createUser({...payload, newPin: stringToBase64(newPin), confirmPin: stringToBase64(confirmPin)})
        } else if (scope === "reset")
          resetPin({
            phone_no: storedData.phone_no,
            newPin: stringToBase64(newPin),
            confirmPin: stringToBase64(confirmPin),
          })
      } else push(ROUTE_LOGIN)
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
  errPin: "",
  errConfirmPin: "",
}

export default useHandler
