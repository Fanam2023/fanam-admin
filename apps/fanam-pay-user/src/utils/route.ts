export const ROUTE_INITIATE_TRANSACTION = "/initiate-transaction"
export const ROUTE_SENDER = "/sender-form"
export const ROUTE_INVOICE = "/invoice"
export const ROUTE_RECIPIENTS = "/recipient"
export const ROUTE_ADD_RECIPIENT = `${ROUTE_RECIPIENTS}/form`
export const routeToRecipientDetails = (recipientId: string) => `${ROUTE_RECIPIENTS}/${recipientId}`
export const ROUTE_RECIPIENT_PREVIEW = `${ROUTE_RECIPIENTS}/preview`
export const ROUTE_BENEFICIARIES = "/beneficiary"
export const ROUTE_ADD_BENEFICIARY = `${ROUTE_BENEFICIARIES}/form`
export const routeToBeneficiaryDetails = (beneficiaryId: string) => `${ROUTE_BENEFICIARIES}/${beneficiaryId}`
export const ROUTE_TRANSACTION = "/transaction"
export const ROUTE_TRANSACTION_STATUS = `${ROUTE_TRANSACTION}/status`
