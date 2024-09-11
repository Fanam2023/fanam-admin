import {REG_VALID_NUMBER, useCommon, useFirebase, useStorage} from "@fanam-pkg/core-utils"
import {useRouter, useSearchParams} from "next/navigation"
import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef, useState} from "react"
import {IBaseSignUp, SESSION_SIGNUP, TypeScope} from "@custom/utils"
import {routeToPin} from "utils"

const useHandler = () => {
  const {isValidInputByRegex} = useCommon()
  const {push} = useRouter()
  const searchParams = useSearchParams()
  const {getStorage} = useStorage()
  const [otpValues, setOtpValues] = useState(Array(6).fill(""))
  const [timer, setTimer] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const [errState, setErrState] = useState({errOtp: "", isClicked: false, isValid: false})
  const {isClicked, errOtp} = errState
  const [storedData, setStoredData] = useState<IBaseSignUp | null>(null)
  const {phone_no, country_code} = storedData || {}
  const scope = searchParams.get("scope")

  const countryCode = typeof country_code === "string" ? country_code : `+${country_code?.phone_code}`

  const {sendOtp, verifyOTP} = useFirebase(
    () => push(routeToPin(scope as TypeScope)),
    data => setErrState({...errState, errOtp: data || ""})
  )

  useEffect(() => {
    inputRefs.current[0]?.focus()

    const onComplete = () => inputRefs.current[0]?.focus()

    if (phone_no?.length === 10) sendOtp(countryCode, phone_no, onComplete, onComplete)
  }, [phone_no])

  useEffect(() => {
    const storedData = getStorage<IBaseSignUp>(SESSION_SIGNUP)
    if (storedData) setStoredData(storedData)
  }, [])

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [otpValues, isClicked])

  useEffect(() => {
    if (timer) {
      const interval = setInterval(() => setTimer(timer - 1), 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [timer])

  const onValidate = useCallback(() => {
    const otpText = otpValues.join("")
    let errText = ""
    if (otpText.length !== 6) errText = "Please enter valid 6 digit OTP"
    return {errOtp: errText, isValid: !errText}
  }, [otpValues])

  const onInputChange = useCallback(
    (index: number, event: ChangeEvent<HTMLInputElement>) => {
      const inputElement = event.target as HTMLInputElement
      const {value} = inputElement

      if ((isValidInputByRegex(value, REG_VALID_NUMBER) && value.length === 1) || value === "") {
        const newOtpValues = [...otpValues]
        newOtpValues[index] = value
        setOtpValues(newOtpValues)

        if (index < otpValues.length - 1 && value !== "") {
          inputRefs.current[index + 1]?.focus()
        }
      }
    },
    [otpValues]
  )

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && index > 0 && otpValues[index] === "") {
      const prevInput = inputRefs.current[index - 1]
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const onVerify = () => {
    setErrState({...errState, isClicked: true})
    const otpText = otpValues.join("")
    if (otpText.length === 6) {
      verifyOTP(otpValues.join(""))
    }
  }

  const onResendOTP = () => {
    if (!timer) {
      setTimer(60)
    }
  }

  const resetOTP = () => setOtpValues(Array(6).fill(""))

  const onResend = () => {
    onResendOTP()
    resetOTP()
    sendOtp(countryCode, phone_no, () => {
      console.log("SENT FIREBASE OTP Again Successfully >>>>>>>>>>")
    })
  }

  const onPaste = (value: string) => {
    if (isValidInputByRegex(value, REG_VALID_NUMBER) && value.length === 6) {
      setOtpValues(value.split(""))
    }
  }

  return {
    errOtp,
    timer,
    otpValues,
    inputRefs,
    phone_no,
    countryCode,
    onKeyDown,
    onInputChange,
    onResend,
    onPaste,
    onVerify,
  }
}

export default useHandler
