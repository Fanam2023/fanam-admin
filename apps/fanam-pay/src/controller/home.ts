import {IAttachment} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import "@custom/utils"
import {API_GET_CLIENT_TOKEN, API_POPULAR_CORRIDORS, apiGetClientDetails, ICorridors} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

interface IResponseClient {
  client_id: string
  bank_name: string
  mobile: string
  contact_person_name: string
  email: string
  alternative_mobile: string
  designation: string
  auth_method: string
  accent_color: string
  font_name: string
  font_url: string
  primary_color: string
  secondary_color: string
  background_color: string
  logo: IAttachment
  background_image: any
  index_css_file: string
  manifest_file: string
  logo_variations: any
  onboard_client_id: string
  onboard_client_secret: string
  authorization_url: string
}

interface IPayloadToken {
  bankcode_string: string
  bank_name: string
}
interface IResponseClientToken {
  access_token: string
  refresh_token: string
}

export const useHomeController = () => {
  const {getRequest, postRequest} = useApi()
  const {push} = useRouter()
  const {updateBankName} = useSingleton()

  const popularCorridors = async () => {
    const {result = []} = await getRequest<ICorridors[]>(API_POPULAR_CORRIDORS)
    return result
  }

  const getClientId = async (bankName: string) => {
    const {result, errorData} = await getRequest<IResponseClient>(apiGetClientDetails(bankName))
    if (result) {
      const {onboard_client_secret, onboard_client_id, bank_name} = result
      // updateBankName(bank_name)
      // push(
      //   `${ROUTE_OAUTH}?grant_type=${"client_credentials"}&redirect_uri=${location.origin.concat(location.pathname)}&client_id=${client_id}&client_secret=${client_secret}&scope=${"read_account+transfer_funds"}&state=${crypto.randomUUID()}`
      // )
    }
    return {result, errorData}
  }

  const getClientToken = async (payload: IPayloadToken) => {
    const {result} = await postRequest<IResponseClientToken>(API_GET_CLIENT_TOKEN, payload)
    return result
  }

  return {
    popularCorridors,
    getClientId,
    getClientToken,
  }
}
