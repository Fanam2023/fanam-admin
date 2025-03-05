export const ROUTE_BANK = "/banklist"
export const ROUTE_LOGIN = "/auth/login"
export const routeToBankDetail = (client_id: string) => `${ROUTE_BANK}/${client_id}`
