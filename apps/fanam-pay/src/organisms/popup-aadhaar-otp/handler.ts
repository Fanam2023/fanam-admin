import {REG_VALID_NUMBER} from "@fanam-pkg/core-utils"
import {useEffect, useState} from "react"
import {useCommon} from "hooks"
import {PropsPopupAadhaarOTP} from "props"

const useHandler = ({verifyOTP}: PropsPopupAadhaarOTP) => {
  const {isValidInputByRegex} = useCommon()
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""))
  const [errorText, setErrorText] = useState("")

  const otpText = otpValues?.join("")

  useEffect(() => {
    if (errorText) onValidate()
  }, [errorText])

  const onValidate = () => {
    const errText = otpText?.length === 6 && isValidInputByRegex(otpText, REG_VALID_NUMBER) ? "" : "Enter Valid OTP"

    setErrorText(errText)
    return !errText
  }

  const onSubmit = () => {
    const isValid = onValidate()

    if (isValid) verifyOTP(otpText)
  }

  return {
    otpValues,
    setOtpValues,
    errorText,
    onSubmit,
  }
}

export default useHandler
