import {REG_VALID_NUMBER, useCommon} from "@fanam-pkg/core-utils"
import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef} from "react"
import {PropsOTPField} from "props"

const useHandler = ({otpValues, onChangeInputs}: PropsOTPField) => {
  const {isValidInputByRegex} = useCommon()
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const isSuccess = false

  useEffect(() => {
    /* Handling the paste event */
    window.addEventListener("paste", event => {
      event.preventDefault()
      const e = event as any /* Temporarily making it any due to typescript error while generating the build */
      onPaste(e.clipboardData?.getData("text") || "") //eslint-disable-line
    })

    return () => {
      window.removeEventListener("paste", () => {})
      window.removeEventListener("DOMContentLoaded", () => {})
    }
  }, [])

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && index > 0 && otpValues[index] === "") {
      const prevInput = inputRefs.current[index - 1]
      if (prevInput) prevInput.focus()
    }
  }

  const onInputChange = useCallback(
    (index: number, event: ChangeEvent<HTMLInputElement>) => {
      const inputElement = event.target as HTMLInputElement
      const {value} = inputElement

      if ((isValidInputByRegex(value, REG_VALID_NUMBER) && value.length === 1) || value === "") {
        const newOtpValues = [...otpValues]
        newOtpValues[index] = value
        onChangeInputs(newOtpValues)

        if (index < otpValues.length - 1 && value !== "") inputRefs.current[index + 1]?.focus()
      }
    },
    [otpValues]
  )

  const onPaste = (value: string) => {
    if (isValidInputByRegex(value, REG_VALID_NUMBER) && value.length === 6) onChangeInputs(value.split(""))
  }

  return {
    otpValues,
    inputRefs,
    isSuccess,
    onKeyDown,
    onInputChange,
  }
}

export default useHandler
