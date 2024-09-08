import {
  API_KYC_AADHAAR_GENERATE_OTP,
  API_KYC_AADHAAR_INITIATE_CAPTCHA,
  API_KYC_AADHAAR_OTP_VERIFICATION,
  API_KYC_AADHAAR_REGENERATE_CAPTCHA,
  API_KYC_GST_VERIFICATION,
  API_PAN_VERIFY,
  IPayloadGenerateAadhaarOTP,
  IPayloadPan,
  IPayloadRegenerateCaptcha,
  IPayloadVerifyAadhaarOTP,
  IPayloadVerifyGST,
  IResponsePan,
} from "@custom/utils"
import {useApi} from "./api"

export const useVerificationController = () => {
  const {postRequest} = useApi()

  const verifyPanCard = async (payload: IPayloadPan) => await postRequest<IResponsePan>(API_PAN_VERIFY, payload)

  const generateAadhaarCaptcha = async (payload: IPayloadRegenerateCaptcha) =>
    await postRequest<IResponsePan>(API_KYC_AADHAAR_INITIATE_CAPTCHA, payload)

  const reGenerateAadhaarCaptcha = async (payload: IPayloadRegenerateCaptcha) =>
    await postRequest<IResponsePan>(API_KYC_AADHAAR_REGENERATE_CAPTCHA, payload)

  const generateAadhaarOTP = async (payload: IPayloadGenerateAadhaarOTP) =>
    await postRequest<IResponsePan>(API_KYC_AADHAAR_GENERATE_OTP, payload)

  const verifyAadhaarOTP = async (payload: IPayloadVerifyAadhaarOTP) =>
    await postRequest<IResponsePan>(API_KYC_AADHAAR_OTP_VERIFICATION, payload)

  const verifyGST = async (payload: IPayloadVerifyGST) =>
    await postRequest<IResponsePan>(API_KYC_GST_VERIFICATION, payload)

  return {
    verifyPanCard,
    generateAadhaarCaptcha,
    reGenerateAadhaarCaptcha,
    generateAadhaarOTP,
    verifyAadhaarOTP,
    verifyGST,
  }
}
