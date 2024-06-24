export const ROUTE_HOME = "/home-page"
export const ROUTE_ATTACHMENT = "/add-attachment"
export const ROUTE_RECEPIENTS = "/manage-recipient"
export const ROUTE_ADD_RECEPIENT = "/recipient-detail"
export const ROUTE_BENEFICIARIES = "/beneficiary"
export const ROUTE_ADD_BENEFICIARY = `${ROUTE_BENEFICIARIES}/create-beneficiary`
export const routeToBeneficiaryDetails = (beneficiaryId: string) => `${ROUTE_BENEFICIARIES}/${beneficiaryId}`
export const ROUTE_REVIEW = "/review-recipient"
export const ROUTE_PAYMENT_OPTIONS = "/payment-options"
export const ROUTE_PAYMENT_STATUS = "/payment-status"
