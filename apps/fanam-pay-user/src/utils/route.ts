export const ROUTE_HOME = "/home-page"
export const ROUTE_ATTACHMENT = "/add-attachment"
export const ROUTE_RECEPIENTS = "/manage-recipient"
export const ROUTE_BENEFICIARIES = "/beneficiary"
export const ROUTE_RECIPIENTS = "/recipient"
export const ROUTE_ADD_RECIPIENT = `${ROUTE_RECIPIENTS}/create-recipient`
export const ROUTE_ADD_BENEFICIARY = `${ROUTE_BENEFICIARIES}/create-beneficiary`
export const routeToBeneficiaryDetails = (beneficiaryId: string) => `${ROUTE_BENEFICIARIES}/${beneficiaryId}`
export const routeToRecipientDetails = (recipientId: string) => `${ROUTE_RECIPIENTS}/${recipientId}`
export const ROUTE_REVIEW = "/review-recipient"
export const ROUTE_PAYMENT_OPTIONS = "/payment-options"
export const ROUTE_PAYMENT_STATUS = "/payment-status"
