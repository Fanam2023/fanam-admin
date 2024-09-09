export const API_AUTH = "/auth"
export const API_SIGNUP = `${API_AUTH}/signup`
export const API_LOGIN = `${API_AUTH}/login`
export const API_FORGOTPIN = `${API_AUTH}/forgot-pin`
export const API_REFRESH_TOKEN = "/refresh-token"
export const API_LOGOUT = `${API_AUTH}/logOut`
export const API_USER_FCM = `${API_AUTH}/fcm`
export const API_USER = "/user"
export const API_GET_PROFILE = `${API_USER}/me`
export const API_SYNC_USER = `${API_USER}/sync`
export const API_LOCATION = "/location"
export const API_COUNTRIES = `${API_LOCATION}/all-countries`
export const apiStates = (countryId: number) => `${API_LOCATION}/countries/${countryId}`
export const apiCities = (stateId: number) => `${API_LOCATION}/states/${stateId}`
export const API_PAYMENT = "/payment"
export const API_FXRATE = `${API_PAYMENT}/fx-rate`
export const API_RECIPIENT = "/recipient"
export const apiRecipient = (recipient_id: string) => `${API_RECIPIENT}/${recipient_id}`
export const API_BENEFICIARY = "/beneficiary"
export const apiBeneficiary = (beneficiary_id: string) => `${API_BENEFICIARY}/${beneficiary_id}`
export const API_TRANSACTION = "/transaction"
export const apiTransaction = (transaction_id: string) => `${API_TRANSACTION}/${transaction_id}`
export const apiSenderKYC = (kycId: string) => `/file-upload/sender-kyc/${kycId}`
export const API_RECIPIENT_KYC = "/file-upload/recipient-kyc"
export const API_INVOICE = "/file-upload/invoice"
export const API_SENDING_PURPOSE = "/sending-purpose"
export const API_REGISTER_START = "/passkey/register-start"
export const API_REGISTER_FINISH = "/passkey/register-finish"
export const apiLoginStart = (credentialId: string) => `/passkey/login-start?credentialId=${credentialId}`
export const API_LOGIN_FINISH = "/passkey/login-finish"
export const API_POPULAR_CORRIDORS = "/payment/popularCorridors-visa"
export const API_CREATE_ORDER = "/order"

/* KYC Endpoints */
export const API_PAN_VERIFY = `${API_USER}/pan-verification`
export const API_KYC_AADHAAR_INITIATE_CAPTCHA = `${API_USER}/initiateCaptcha-aadhaar`
export const API_KYC_AADHAAR_REGENERATE_CAPTCHA = `${API_USER}/reGenerateCaptcha-aadhaar`
export const API_KYC_AADHAAR_GENERATE_OTP = `${API_USER}/generateOtp-aadhaar`
export const API_KYC_AADHAAR_OTP_VERIFICATION = `${API_USER}/aadhaarOtp-verification`
export const API_KYC_GST_VERIFICATION = `${API_USER}/gst-verification`
