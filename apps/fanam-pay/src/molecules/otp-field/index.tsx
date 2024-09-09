import {PropsOTPField} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const OTPField = (props: PropsOTPField) => {
  const {otpValues, error} = props
  const {inputRefs, onInputChange, onKeyDown} = useHandler(props)

  const renderInputNumber = (value: string, index: number) => (
    <input
      key={index}
      id={`otp-input-${index}`}
      type="number"
      className={styles.otp_box}
      inputMode="numeric"
      maxLength={1}
      value={value}
      autoComplete="one-time-code"
      onChange={onInputChange.bind(null, index)}
      onKeyDown={onKeyDown.bind(null, index)}
      ref={input => {
        inputRefs.current[index] = input
      }}
    />
  )

  return (
    <>
      <ul className={`flex ${styles.otp_field}`}>{otpValues?.map(renderInputNumber)}</ul>
      {error && <p className="error-text">{error}</p>}
    </>
  )
}
