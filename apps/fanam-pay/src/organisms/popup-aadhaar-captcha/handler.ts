import {useEffect, useState} from "react"
import {PropsPopupAadhaarCaptcha} from "props"

const useHandler = ({generateOTP}: PropsPopupAadhaarCaptcha) => {
  const [captcha, setCaptcha] = useState("")
  const [errorText, setErrorText] = useState("")

  useEffect(() => {
    if (errorText) onValidate()
  }, [errorText])

  const onValidate = () => {
    const errText = captcha?.length === 5 ? "" : "Enter Valid Captcha"

    setErrorText(errText)
    return !errText
  }

  const onSubmit = () => {
    const isValid = onValidate()

    if (isValid) generateOTP(captcha)
  }

  const onChangeData = (value: string) => setCaptcha(value)

  return {
    onSubmit,
    captcha,
    onChangeData,
    errorText,
  }
}

export default useHandler
