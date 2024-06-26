export const API_AUTH = "/auth"
export const API_LOGIN = `${API_AUTH}/login`
export const API_REFRESH_TOKEN = "/refresh-token"
export const API_LOGOUT = `${API_AUTH}/logOut`
export const API_USER_FCM = `${API_AUTH}/fcm`
export const API_USER = `${API_AUTH}/me`
export const API_RECIPIENT = "/recipient"
export const apiRecipient = (recipient_id: string) => `${API_RECIPIENT}/${recipient_id}`
export const API_BENEFICIARY = "/beneficiary"
export const apiBeneficiary = (beneficiary_id: string) => `${API_BENEFICIARY}/${beneficiary_id}`
export const API_TRANSACTION = "/transaction"
export const apiTransaction = (transaction_id: string) => `${API_TRANSACTION}/${transaction_id}`
