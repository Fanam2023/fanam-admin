import {REG_VALID_NUMBER, useCommon} from "@fanam-pkg/core-utils"
import {ChangeEvent, KeyboardEvent, useCallback, useRef, useState} from "react"

const useHandler = () => {
  const {isValidInputByRegex} = useCommon()
  const [otpValues, setOtpValues] = useState(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null))
  const isSuccess = false

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && index > 0 && otpValues[index] === "") {
      const prevInput = inputRefs.current[index - 1]
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

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

  return {
    otpValues,
    inputRefs,
    isSuccess,
    onKeyDown,
    onInputChange,
  }
}

export default useHandler
