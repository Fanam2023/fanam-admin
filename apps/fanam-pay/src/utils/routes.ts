import {TypeScope} from "@custom/utils"

export const ROUTE_INITIATE_TRANSACTION = "/initiate-transaction"
export const ROUTE_SENDER = "/sender-form"
export const ROUTE_INVOICE = "/invoice"
export const ROUTE_RECIPIENTS = "/recipient"
export const ROUTE_ADD_RECIPIENT = `${ROUTE_RECIPIENTS}/form`
export const routeToRecipientDetails = (recipientId: string) => `${ROUTE_ADD_RECIPIENT}?recipientId=${recipientId}`
export const ROUTE_RECIPIENT_PREVIEW = `${ROUTE_RECIPIENTS}/preview`
export const ROUTE_BENEFICIARIES = "/beneficiary"
export const ROUTE_ADD_BENEFICIARY = `${ROUTE_BENEFICIARIES}/form`
export const ROUTE_BENEFICIARY_PREVIEW = `${ROUTE_BENEFICIARIES}/preview`
export const routeToBeneficiaryDetails = (beneficiaryId: string) =>
  `${ROUTE_ADD_BENEFICIARY}?beneficiaryId=${beneficiaryId}`
export const routeToTransactionDetail = (transactionId: string) => `/transaction/${transactionId}`
export const ROUTE_SIGN_UP = "/auth/sign-up"
export const ROUTE_LOGIN = "/auth/login"
export const ROUTE_FORGOT_PIN = "/auth/forgot-password"
export const routeToOTP = (scope: TypeScope) => `/auth/otp?scope=${scope}`
export const ROUTE_HOME = "/"
export const routeToPin = (scope: TypeScope) => `/auth/pin?scope=${scope}`
export const ROUTE_TRANSACTION_PURPOSE = "/transaction-purpose"
export const routeToReviewSend = (transactionId: string) => `/review-send/${transactionId}`
