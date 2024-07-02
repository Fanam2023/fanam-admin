import {API_RECIPIENT, IPayloadSyncRecipient, IRecipient, apiRecipient} from "@custom/utils"
import {useApi} from "./api"

export const useRecipientController = () => {
  const {getRequest, postRequest, putRequest} = useApi()

  const getAllRecipient = async () => {
    const {result} = await getRequest<IRecipient[]>(API_RECIPIENT)
    return result
  }

  const createRecipient = async (payload: IPayloadSyncRecipient) => {
    const {result, errorData} = await postRequest<IRecipient>(API_RECIPIENT, payload)
    return {result, errorData}
  }

  const updateRecipient = async (payload: IRecipient) => {
    const recipientId = payload.recipient_id
    const {result, errorData} = await putRequest(apiRecipient(recipientId), payload)
    return {result, errorData}
  }

  const getByRecipientId = async (recipient_id: string) => {
    const {result} = await getRequest<IRecipient>(apiRecipient(recipient_id))
    return result
  }

  return {
    getAllRecipient,
    getByRecipientId,
    updateRecipient,
    createRecipient,
  }
}
