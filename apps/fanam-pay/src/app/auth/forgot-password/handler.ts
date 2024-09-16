import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_VALID_NUMBER, useCommon, useStorage} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {IPayloadForgotPin, SESSION_SIGNUP} from "@custom/utils"
import {routeToOTP} from "utils"

const useHandler = () => {
  const {push} = useRouter()
  const {setStorage} = useStorage()
  const {isValidInputByRegex} = useCommon()
  const {toggleNotify} = useNotifyPopup()
  const [data, setData] = useState<IPayloadForgotPin>({
    phone_no: "",
    country_code: "",
  })

  const {phone_no, country_code} = data

  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)
  const {isClicked} = errData

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
      isClicked: true,
    }

    if (!phone_no) {
      errState = {
        ...errState,
        errPhoneNo: "Please enter Phone Number",
        isValid: false,
      }
    }

    setErrData(errState)
    return errState
  }

  const onChangeValue = (value: JSONObject) => {
    const phoneNO = (value?.phone_no as string) || ""
    const isValid = phoneNO === "" || isValidInputByRegex(phoneNO, REG_VALID_NUMBER)
    if (isValid) setData(prev => ({...prev, ...value}))
    else toggleNotify({type: "error", title: "Only numbers are allowed"})
  }

  useEffect(() => {
    if (isClicked) {
      setErrData(prev => ({...prev, ...onValidate()}))
    }
  }, [data, isClicked])

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      const payload: IPayloadForgotPin = {
        phone_no,
        country_code: typeof country_code === "object" ? `+${country_code?.phone_code}` : "+91",
      }

      setStorage(SESSION_SIGNUP, payload)
      push(routeToOTP("reset"))
    }
  }

  return {
    data,
    errData,
    onChangeValue,
    onSubmit,
    setData,
  }
}

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errPhoneNo: "",
  errPin: "",
}

export default useHandler
