export const API_AUTH = "/auth"
export const API_LOGIN = `${API_AUTH}/login`
export const API_REFRESH_TOKEN = "/refresh-token"
export const API_LOGOUT = `${API_AUTH}/logOut`
export const API_USER_FCM = `${API_AUTH}/fcm`
export const API_USER = `${API_AUTH}/me`
export const API_LOCATION = "/location"
export const API_COUNTRIES = `${API_LOCATION}/all-countries`
export const apiCountries = (country_id: string) => `${API_LOCATION}/countries/${country_id}`
export const API_PAYMENT = "/payment"
export const API_FXRATE = `${API_PAYMENT}/fx-rate`
