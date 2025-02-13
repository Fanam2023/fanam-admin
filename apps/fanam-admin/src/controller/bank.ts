import {API_GET_ALL_BANKS, apiBank, apiDeleteBank} from "@custom/utils"
import {IBank, IPayloadBank} from "model"
import {useApi} from "./api"

export const useBankController = () => {
  const {getRequest, postRequest, putRequest, deleteRequest} = useApi()

  const getAllBanks = async () => {
    const {result = []} = await getRequest<IBank[]>(API_GET_ALL_BANKS)
    return result
  }

  const createBank = async (payload: IPayloadBank) => {
    const {result, errorData} = await postRequest<IBank>(API_GET_ALL_BANKS, payload)
    return {result, errorData}
  }

  const getBank = async (client_id: string) => {
    const {result, errorData} = await getRequest<IBank>(apiBank(client_id))
    return {result, errorData}
  }

  const updateBank = async (payload: IPayloadBank) => {
    const clientId = payload.client_id

    const {result, errorData} = await putRequest<IBank>(apiBank(clientId), payload)
    return {result, errorData}
  }

  const removeBank = async (client_id: string) => {
    const {result, errorData} = await deleteRequest<IBank>(apiDeleteBank(client_id))
    return {result, errorData}
  }

  return {
    getAllBanks,
    getBank,
    createBank,
    updateBank,
    removeBank,
  }
}
