import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_VALID_NUMBER, useCommon, useStorage} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {IForgotPinData, SESSION_SIGNUP} from "@custom/utils"
import {useLocationController} from "controller"
import {QUERY_COUNTRIES, routeToOTP} from "utils"

const useHandler = () => {
  const {push} = useRouter()
  const {setStorage} = useStorage()
  const {isValidInputByRegex} = useCommon()
  const {toggleNotify} = useNotifyPopup()
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)
  const [data, setData] = useState<IForgotPinData>({
    phone_no: "",
    country: null,
  })

  const {phone_no, country} = data

  const {isClicked} = errData

  const {getAllCountries} = useLocationController()
  const {data: countries = []} = useQuery({queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries})

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
      isClicked: true,
    }

    if (!country) {
      errState = {
        ...errState,
        errPhoneNo: "Please select country",
        isValid: false,
      }
    } else if (!phone_no) {
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
      setStorage(SESSION_SIGNUP, data)
      push(routeToOTP("reset"))
    }
  }

  return {
    data,
    errData,
    countries,
    onChangeValue,
    onSubmit,
    setData,
  }
}

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errPhoneNo: "",
}

export default useHandler
