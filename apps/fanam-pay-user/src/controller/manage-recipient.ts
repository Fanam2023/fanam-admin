import {API_RECIPIENT, IRecipient, apiRecipient} from "@custom/utils"
import {useApi} from "./api"

export const useRecipientController = () => {
  const {getRequest, postRequest, putRequest, deleteRequest} = useApi()

  const getAllRecipient = async () => {
    const {result} = await getRequest<IRecipient[]>(API_RECIPIENT)
    return result
  }

  const createRecipient = async (user: IRecipient) => {
    const {result, errorData} = await postRequest(API_RECIPIENT, user)
    return {result, errorData}
  }

  const deleteRecipient = async (recipient_id: string) => {
    const {result, errorData} = await deleteRequest(apiRecipient(recipient_id))
    return {result, errorData}
  }

  const updateRecipient = async (payload: any) => {
    const recipientId = payload.id
    const {result, errorData} = await putRequest(apiRecipient(recipientId), payload)
    return {result, errorData}
  }

  const getByRecipientId = async (recipient_id: string) => {
    const {result} = await getRequest(apiRecipient(recipient_id))
    return {result}
  }

  return {
    getAllRecipient,
    getByRecipientId,
    deleteRecipient,
    updateRecipient,
    createRecipient,
  }
}
