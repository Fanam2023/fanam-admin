import {
  API_BUSINESS_KYC,
  API_KYC_AADHAAR_GENERATE_OTP,
  API_KYC_AADHAAR_INITIATE_CAPTCHA,
  API_KYC_AADHAAR_OTP_VERIFICATION,
  API_KYC_AADHAAR_REGENERATE_CAPTCHA,
  API_KYC_GST_VERIFICATION,
  API_PAN_VERIFY,
  IPayloadBusinessKYC,
  IPayloadGenerateAadhaarOTP,
  IPayloadPan,
  IPayloadVerifyAadhaarOTP,
  IPayloadVerifyGST,
  IResponseAadhaarCaptcha,
  IResponseAadhaarGenerateOTP,
  IResponseAadhaarVerifyOTP,
  IResponsePan,
} from "@custom/utils"
import {useApi} from "./api"

export const useKYCController = () => {
  const {postRequest} = useApi()

  const verifyPanCard = async (payload: IPayloadPan) => await postRequest<IResponsePan>(API_PAN_VERIFY, payload)

  const generateAadhaarCaptcha = async () =>
    await postRequest<IResponseAadhaarCaptcha>(API_KYC_AADHAAR_INITIATE_CAPTCHA, {})

  const reGenerateAadhaarCaptcha = async () =>
    await postRequest<IResponseAadhaarCaptcha>(API_KYC_AADHAAR_REGENERATE_CAPTCHA, {})

  const generateAadhaarOTP = async (payload: IPayloadGenerateAadhaarOTP) =>
    await postRequest<IResponseAadhaarGenerateOTP>(API_KYC_AADHAAR_GENERATE_OTP, payload)

  const verifyAadhaarOTP = async (payload: IPayloadVerifyAadhaarOTP) =>
    await postRequest<IResponseAadhaarVerifyOTP>(API_KYC_AADHAAR_OTP_VERIFICATION, payload)

  const verifyGST = async (payload: IPayloadVerifyGST) =>
    await postRequest<IResponsePan>(API_KYC_GST_VERIFICATION, payload)

  const verifyBusinessKyc = async (payload: IPayloadBusinessKYC) =>
    await postRequest<IPayloadBusinessKYC>(API_BUSINESS_KYC, payload)

  return {
    verifyPanCard,
    generateAadhaarCaptcha,
    reGenerateAadhaarCaptcha,
    generateAadhaarOTP,
    verifyAadhaarOTP,
    verifyGST,
    verifyBusinessKyc,
  }
}
