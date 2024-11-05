import {IFile} from "@fanam-pkg/core-utils"
import {
  API_RECIPIENT,
  API_RECIPIENT_KYC,
  IFanamApiError,
  IPayloadRecipient,
  IPayloadUpdateRecipient,
  IRecipient,
  ITransaction,
  apiDeleteAttachment,
  apiRecipient,
  apiRecipientType,
} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"
import {useTransactionController} from "./transaction"

export const useRecipientController = () => {
  const {getRequest, deleteRequest, postRequest, putRequest} = useApi()
  const {initiateTransaction} = useTransactionController()
  const {updateTransData} = useSingleton()

  const getAllRecipient = async (recipientType: string) => {
    const {result} = await getRequest<IRecipient[]>(apiRecipientType(recipientType))
    return result || []
  }

  const createRecipient = async (payload: IPayloadRecipient) => {
    const {kyc} = payload
    delete payload.kyc

    let {result, errorData} = await postRequest<IRecipient, IPayloadRecipient, IFanamApiError<null>>(
      API_RECIPIENT,
      payload
    )

    if (result) {
      const {recipient_id} = result
      const {result: transResult, errorData: errTrans} = await initiateTransaction(recipient_id)

      if (transResult) {
        const {transaction_id} = transResult
        updateTransData(transResult)

        if (kyc.length && result) {
          const {result: transRecipientKyc, errorData: errKyc} = await uploadKyc(recipient_id, transaction_id, kyc)

          if (transRecipientKyc) updateTransData(transRecipientKyc)
          else if (errKyc) {
            errorData = {
              ...errKyc,
              result: null,
            }
          }
        }
      } else if (errTrans)
        errorData = {
          ...errTrans,
          result: null,
        }
    }

    return {result, errorData}
  }

  const updateRecipient = async (payload: IPayloadUpdateRecipient) => {
    const {recipient_id, kyc, transaction_id} = payload
    delete payload.recipient_id
    delete payload.kyc
    let {result, errorData} = await putRequest<ITransaction>(apiRecipient(recipient_id), payload)

    if (result && kyc.length) {
      const response = await uploadKyc(recipient_id, transaction_id, kyc)
      result = response.result
      errorData = response.errorData
    }

    return {result, errorData}
  }

  const uploadKyc = async (recipientId: string, transactionId: string, kyc: IFile[]) => {
    const formData = new FormData()
    kyc.forEach(({file}) => {
      formData.append("kyc", file)
    })
    if (transactionId) formData.append("transaction_id", transactionId)

    formData.append("recipient_id", recipientId)
    return await postRequest<ITransaction>(API_RECIPIENT_KYC, formData)
  }

  const getByRecipientId = async (recipient_id: string) => {
    const {result} = await getRequest<IRecipient>(apiRecipient(recipient_id))
    return result
  }

  const removeAttachment = async (attachmentId: string) => {
    const {result, errorData} = await deleteRequest<IRecipient>(apiDeleteAttachment(attachmentId))

    return {result, errorData}
  }

  return {
    getAllRecipient,
    getByRecipientId,
    updateRecipient,
    createRecipient,
    removeAttachment,
  }
}
