import {IFile} from "@fanam-pkg/core-utils"
import {
  API_RECIPIENT,
  API_RECIPIENT_KYC,
  IPayloadRecipient,
  IPayloadUpdateRecipient,
  IRecipient,
  ITransaction,
  apiRecipient,
} from "@custom/utils"
import {useApi} from "./api"

export const useRecipientController = () => {
  const {getRequest, postRequest, putRequest} = useApi()

  const getAllRecipient = async () => {
    const {result} = await getRequest<IRecipient[]>(API_RECIPIENT)
    return result || []
  }

  const createRecipient = async (payload: IPayloadRecipient) => {
    const {kyc, transaction_id} = payload
    delete payload.kyc

    let {result, errorData} = await postRequest<ITransaction>(API_RECIPIENT, payload)
    if (kyc.length && result) {
      const response = await uploadKyc(result.recipient?.recipient_id, transaction_id, kyc)
      result = response.result
      errorData = response.errorData
    }

    return {result, errorData}
  }

  const updateRecipient = async (payload: IPayloadUpdateRecipient) => {
    const {recipient_id, kyc, transaction_id} = payload
    delete payload.recipient_id
    let {result, errorData} = await putRequest<ITransaction>(apiRecipient(recipient_id), payload)

    if (result && kyc.length) {
      const response = await uploadKyc(recipient_id, transaction_id, kyc)
      result = response.result
      errorData = response.errorData
    }

    return {result, errorData}
  }

  const uploadKyc = async <R>(recipientId: string, transactionId: string, kyc: IFile[]) => {
    const formData = new FormData()
    kyc.forEach(({file}) => {
      formData.append("kyc", file)
    })
    formData.append("transaction_id", transactionId)
    formData.append("recipient_id", recipientId)

    return await putRequest<ITransaction>(API_RECIPIENT_KYC, formData)
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
