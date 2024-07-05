import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_EMAIL, useCommon} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {IPayloadLogin} from "@custom/utils"
import {useAuthController} from "controller"
import {useSingleton} from "hooks"
import {ROUTE_SENDER} from "utils"

const DEFAULT_ERR_STATE = {
  errEmail: "",
  isClicked: false,
  isValid: false,
}

export const useHandler = () => {
  const [data, setData] = useState<IPayloadLogin>({email: ""})
  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)
  const {login} = useAuthController()
  const {replace} = useRouter()
  const {toggleNotify} = useNotifyPopup()
  const {isValidInputByRegex} = useCommon()
  const {singOutUser} = useSingleton()

  const {isClicked} = errState
  const {email} = data

  const {mutate: signIn, data: signInRes} = useMutation({mutationFn: login})

  useEffect(() => {
    if (signInRes) {
      const {result, errorData} = signInRes

      if (result) replace(ROUTE_SENDER)
      else
        toggleNotify({title: "Login Error", description: errorData?.message || "Something went wrong", type: "error"})
    }
  }, [signInRes])

  useEffect(() => {
    singOutUser()
  }, [])

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter valid email address", isValid: false}

    setErrState(errState)

    return errState
  }

  const onLogin = () => {
    const {isValid} = onValidate()

    if (isValid) signIn(data)
  }

  const onChangeValue = (value: JSONObject) => setData({...data, ...value})

  return {onLogin, onChangeValue, data, errState}
}
