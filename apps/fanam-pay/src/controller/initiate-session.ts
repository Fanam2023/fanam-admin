import {useCookies} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {API_INITIATE_SESSION, apiSession} from "@custom/utils"
import {useSingleton} from "hooks"
import {COOKIE_BANK_NAME, ROUTE_OAUTH, ROUTE_SAML} from "utils"
import {useApi} from "./api"

interface IPayloadInitiateApi {
  api_key: string
}

interface IResponseInitiateApi {
  web_url: string
  session_id: string
}

interface IResponseClientDetails {
  bank_name: string
  mobile: string
  contact_person_name: string
  email: string
  alternative_mobile: string
  designation: string
  auth_method: string
  onboard_client_id: string
  onboard_client_secret: string
  authorization_url: string
}

export const useInititeSessionController = () => {
  const {push} = useRouter()
  const {setCookie, removeCookie} = useCookies()
  const {postRequest, getRequest} = useApi()
  const {updateBankName} = useSingleton()

  const getClientData = async (session_id: string) => {
    const {result, errorData} = await getRequest<IResponseClientDetails>(apiSession(session_id))
    const {bank_name, onboard_client_id, onboard_client_secret, auth_method} = result || {}
    const path = "http://localhost:3000"
    if (result) {
      if (auth_method === "Saml") {
        push(
          `${ROUTE_SAML}?grant_type=${"client_credentials"}&redirect_uri=${path}&scope=${"read_account+transfer_funds"}&state=${crypto.randomUUID()}`
        )
      } else {
        push(
          `${ROUTE_OAUTH}?grant_type=${"client_credentials"}&redirect_uri=${path}&client_id=${onboard_client_id}&client_secret=${onboard_client_secret}&scope=${"read_account+transfer_funds"}&state=${crypto.randomUUID()}`
        )
      }
      if (bank_name) setCookie(COOKIE_BANK_NAME, bank_name)
      else removeCookie(COOKIE_BANK_NAME)

      updateBankName(bank_name)
    }

    return {result, errorData}
  }

  const initiateSession = async (api_key: IPayloadInitiateApi) => {
    const {result, errorData} = await postRequest<IResponseInitiateApi>(API_INITIATE_SESSION, api_key)
    return {result, errorData}
  }

  return {
    initiateSession,
    getClientData,
  }
}
