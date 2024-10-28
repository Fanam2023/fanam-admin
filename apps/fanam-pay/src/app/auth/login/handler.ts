import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, REG_VALID_NUMBER} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {IBaseLogin, IPayloadLogin} from "@custom/utils"
import {useAuthController, useLocationController} from "controller"
import {useCommon} from "hooks"
import {QUERY_COUNTRIES, ROUTE_FORGOT_PIN, ROUTE_HOME, ROUTE_SIGN_UP} from "utils"

const useHandler = () => {
  const {push, replace} = useRouter()
  const {isValidInputByRegex, getNationalNumber} = useCommon()
  const {toggleNotify} = useNotifyPopup()
  const {login, loginWebAuth} = useAuthController()
  const {getAllCountries} = useLocationController()
  const [data, setData] = useState<IBaseLogin>({
    phone_no: "",
    pin: "",
    country: null,
  })

  const {phone_no, pin, country} = data
  const nationalNumberLength = country ? getNationalNumber(country.iso2)?.length : 0
  const {data: countries = []} = useQuery({queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries})

  const stringToBase64 = (inputString: string) => Buffer.from(inputString).toString("base64")
  const {mutate: loginWithCredential} = useMutation({
    mutationFn: login,
    retry: false,
    onSuccess: ({result, errorData}) => {
      if (result) replace(ROUTE_HOME)
      else
        toggleNotify({title: "Login Error", description: errorData?.message || "Something went wrong", type: "error"})
    },
  })

  const executeWebAuthn = async () => {
    const {result} = await loginWebAuth()
    if (result) replace(ROUTE_HOME)
  }
  useEffect(() => {
    if (country) {
      setData(prev => ({...prev, phone_no: ""}))
    }
  }, [country])

  useEffect(() => {
    executeWebAuthn()
  }, [])

  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)
  const {isClicked} = errData

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
    } else if (!phone_no || phone_no.length !== nationalNumberLength) {
      errState = {
        ...errState,
        errPhoneNo: `Please enter a valid phone number with ${nationalNumberLength} digits`,
        isValid: false,
      }
    }

    if (!pin) errState = {...errState, errPin: "Please enter valid PinNumber", isValid: false}
    else if (pin.length !== 6) errState = {...errState, errPin: "PIN should contain 6 numbers", isValid: false}

    setErrData(errState)
    return errState
  }

  const onChangeValue = (value: JSONObject) => {
    const pinValue = (value?.phone_no as string) || (value?.pin as string) || ""
    const isValid = pinValue === "" || isValidInputByRegex(pinValue, REG_VALID_NUMBER)
    if (isValid && pinValue.length <= nationalNumberLength) setData(prev => ({...prev, ...value}))
    // else toggleNotify({type: "error", title: "Only numbers are allowed"})
  }

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onSubmit = () => {
    const {isValid} = onValidate()
    const {phone_no, pin} = data
    const pinBase64 = stringToBase64(pin)

    if (isValid) {
      const payload: IPayloadLogin = {
        phone_no,
        pin: pinBase64,
      }
      loginWithCredential(payload)
    }
  }

  const routeToSignUp = () => push(ROUTE_SIGN_UP)
  const routeTOForgotPin = () => push(ROUTE_FORGOT_PIN)
  return {
    data,
    errData,
    onChangeValue,
    onSubmit,
    routeToSignUp,
    routeTOForgotPin,
    countries,
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
