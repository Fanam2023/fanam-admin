// export const API_AUTH = "/auth"
export const API_SIGNUP = `/auth/signup`
export const API_LOGIN = `/auth/login`
export const API_FORGOTPIN = `/auth/forgot-pin`
export const API_REFRESH_TOKEN = "/refresh-token"
export const API_LOGOUT = `/auth/logout`
export const API_LOGOUT_ALL_DEVICE = `/auth/logout-all`
export const API_USER_FCM = `/auth/fcm`
export const API_GET_PROFILE = `/user/me`
export const API_SYNC_USER = `/user/sync`
export const API_LOCATION = "/location"
export const apiCountries = (countryId?: number) =>
  countryId ? `${API_LOCATION}/all-countries?country_id=${countryId}` : `${API_LOCATION}/all-countries`
export const apiStates = (countryId: number) => `${API_LOCATION}/countries/${countryId}`
export const apiCities = (stateId: number) => `${API_LOCATION}/states/${stateId}`
export const API_PAYMENT = "/payment"
export const API_FXRATE = `${API_PAYMENT}/fxRate-conversion`
export const API_RECIPIENT = "/recipient"
export const apiRecipientType = (recipientType: string) => `${API_RECIPIENT}?recipient_type=${recipientType}`
export const apiRecipient = (recipient_id: string) => `${API_RECIPIENT}/${recipient_id}`
export const API_BENEFICIARY = "/beneficiary"
export const apiBeneficiary = (beneficiary_id: string) => `${API_BENEFICIARY}/${beneficiary_id}`
export const API_TRANSACTION = "/transaction"
export const apiAllTransaction = (status: string, start_date: string, end_date: string) =>
  `${API_TRANSACTION}?status=${status}&start_date=${start_date}&end_date=${end_date}`
export const apiTransaction = (transaction_id: string) => `${API_TRANSACTION}/${transaction_id}`
export const apiSenderKYC = () => `/file-upload/sender-kyc`
export const API_RECIPIENT_KYC = "/file-upload/recipient-kyc"
export const API_INVOICE = "/file-upload/invoice"
export const API_REGISTER_START = "/passkey/register-start"
export const API_REGISTER_FINISH = "/passkey/register-finish"
export const apiLoginStart = (credentialId: string) => `/passkey/login-start?credentialId=${credentialId}`
export const API_LOGIN_FINISH = "/passkey/login-finish"
export const API_POPULAR_CORRIDORS = "/payment/popularCorridors-visa"
export const API_CREATE_ORDER = "/order"
export const apiPayout = (transactionId: string) => `/payment/send-payout/${transactionId}`
export const apiCancelTransaction = (transactionId: string) => `/order/create_refund/${transactionId}`
export const apiDeleteAttachment = (attachmentId: string) => `/file-upload/${attachmentId}`
export const API_CANCEL_TRANSACTION = `${API_PAYMENT}/cancelPayout`
export const apiCancelPayment = (transactionId: string) => `/transaction/cancel/${transactionId}`

/* KYC Endpoints */
export const API_PAN_VERIFY = `/user/pan-verification`
export const API_KYC_AADHAAR_INITIATE_CAPTCHA = `/user/initiateCaptcha-aadhaar`
export const API_KYC_AADHAAR_REGENERATE_CAPTCHA = `/user/reGenerateCaptcha-aadhaar`
export const API_KYC_AADHAAR_GENERATE_OTP = `/user/generateOtp-aadhaar`
export const API_KYC_AADHAAR_OTP_VERIFICATION = `/user/aadhaarOtp-verification`
export const API_KYC_GST_VERIFICATION = `/user/gst-verification`
export const API_BUSINESS_KYC = `/user/business-kyc`

/*admin api */
export const API_ADMIN_LOGIN = `/auth/sso-admin-login`
export const API_ADMIN_LOGOUT = `/auth/sso-admin-logout`
export const API_GET_ALL_BANKS = `/client`
export const apiBank = (client_id: string) => `${API_GET_ALL_BANKS}/${client_id}`
export const apiDeleteBank = (id: string) => `${API_GET_ALL_BANKS}/${id}`
