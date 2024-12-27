import {useRouter} from "next/navigation"
import "@custom/utils"
import {API_GET_CLIENT_TOKEN, API_POPULAR_CORRIDORS, apiGetClientDetails, ICorridors} from "@custom/utils"
import {useSingleton} from "hooks"
import {ROUTE_OAUTH} from "utils"
import {useApi} from "./api"

interface IResponseClient {
  bank_name: string
  client_id: string
  client_secret: string
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
    const {result} = await getRequest<IResponseClient>(apiGetClientDetails(bankName))
    if (result) {
      const {client_id, client_secret, bank_name} = result
      updateBankName(bank_name)
      push(
        `${ROUTE_OAUTH}?grant_type=${"client_credentials"}&redirect_uri=${location.origin.concat(location.pathname)}&client_id=${client_id}&client_secret=${client_secret}&scope=${"read_account+transfer_funds"}&state=${crypto.randomUUID()}`
      )
    }
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
