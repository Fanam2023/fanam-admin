import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {ILogin, IPayloadLogin} from "@custom/utils"
import {useAuthController} from "controller"
import {ROUTE_SIGN_UP} from "utils"

const useHandler = () => {
  const {push, replace} = useRouter()
  const {toggleNotify} = useNotifyPopup()
  const {login} = useAuthController()
  const [data, setData] = useState<ILogin>({
    phone_no: "",
    pin: "",
  })

  const {phone_no, pin} = data

  const {mutate: createUser, data: logInRes} = useMutation({mutationFn: login})

  useEffect(() => {
    if (logInRes) {
      const {result, errorData} = logInRes

      if (result) replace(`route to home screen`)
      else
        toggleNotify({title: "Login Error", description: errorData?.message || "Something went wrong", type: "error"})
    }
  }, [logInRes])

  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)
  const {isClicked} = errData

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
      isClicked: true,
    }

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter PhoneNumber", isValid: false}
    if (!pin) errState = {...errState, errPin: "Please enter valid PinNumber", isValid: false}

    setErrData(errState)
    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onSubmit = () => {
    const {isValid} = onValidate()
    const {phone_no, pin} = data

    if (isValid) {
      const payload: IPayloadLogin = {
        phone_no,
        pin,
      }
      createUser(payload)
    }
  }

  const routeToSignUp = () => push(ROUTE_SIGN_UP)
  return {
    data,
    errData,
    onChangeValue,
    onSubmit,
    routeToSignUp,
  }
}

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errPhoneNo: "",
  errPin: "",
}

export default useHandler
