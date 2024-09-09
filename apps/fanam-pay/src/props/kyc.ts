export interface PropsPopupAadhaarCaptcha {
  captchaCode: string
  regenerateCaptcha: () => void
  generateOTP: (captcha: string) => void
}

export interface PropsPopupAadhaarOTP {
  verifyOTP: (otp: string) => void
}
