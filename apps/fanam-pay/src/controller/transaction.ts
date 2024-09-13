import {IFile} from "@fanam-pkg/core-utils"
import {
  API_INVOICE,
  API_TRANSACTION,
  apiAllTransaction,
  apiTransaction,
  IFanamApiError,
  IPayloadMergeRecipient,
  IPayloadTransaction,
  IPayloadTransactionPurpose,
  IResponseOrder,
  ITransaction,
  ITransactionDetails,
} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"
import {useOrderController} from "./order"

export const useTransactionController = () => {
  const {getRequest, postRequest, putRequest} = useApi()
  const {transId, updateTransData, updateTransId} = useSingleton()
  const {createOrder} = useOrderController()

  const getTransaction = async (status: string) => {
    const {result} = await getRequest<ITransactionDetails[]>(apiAllTransaction(status))
    return result || []
  }

  const createTransaction = async (payload: IPayloadTransaction) => {
    const {result, errorData} = await postRequest<ITransaction>(API_TRANSACTION, payload)
    if (result) updateTransData(result)
    return {result, errorData}
  }

  const updateTransaction = async (payload: IPayloadTransaction) => {
    let response: {order: IResponseOrder | null; errorData: IFanamApiError<null> | null} = {
      order: null,
      errorData: null,
    }

    const {result, errorData} = await putRequest<ITransaction, IPayloadTransaction, IFanamApiError<null>>(
      apiTransaction(transId),
      payload
    )
    if (result) {
      updateTransData(result)
      const {result: orderResult, errorData} = await createOrder()
      response.order = orderResult
      response.errorData = errorData
    } else response.errorData = errorData

    return response
  }

  const getTransactionDetails = async (transaction_id: string) => {
    const {result} = await getRequest<ITransaction>(apiTransaction(transaction_id))
    return result
  }

  const uploadInvoice = async (invoices: IFile[]) => {
    const formData = new FormData()

    invoices.forEach(({file}) => formData.append("invoice", file))

    formData.append("transaction_id", transId)

    const {result, errorData} = await putRequest<ITransaction>(API_INVOICE, formData)
    if (result) updateTransData(result)

    return {result, errorData}
  }

  const syncBeneficiary = async (beneficiaryId: string) => {
    const {result, errorData} = await putRequest<ITransaction>(apiTransaction(transId), {
      beneficiary_id: beneficiaryId,
    })
    if (result) updateTransData(result)
    return {result, errorData}
  }

  const initiateTransaction = async (recipientId: string) => {
    const {result, errorData} = await postRequest<ITransaction>(API_TRANSACTION, {recipient_id: recipientId})
    if (result) {
      const {transaction_id} = result
      updateTransId(transaction_id)
      updateTransData(result)
    }
    return {result, errorData}
  }

  const syncRecipientAsBeneficiary = async (payload: IPayloadMergeRecipient) => {
    const {result, errorData} = await putRequest<ITransaction>(apiTransaction(transId), payload)
    if (result) updateTransData(result)
    return {result, errorData}
  }

  const sendingPurpose = async (payload: IPayloadTransactionPurpose) => {
    const {doc} = payload

    if (doc) delete payload.doc

    let {result, errorData} = await putRequest<ITransaction>(apiTransaction(transId), payload)
    if (result) {
      updateTransData(result)

      if (doc?.length) {
        const {result: uploadResult, errorData: uploadErr} = await uploadInvoice(doc)

        if (uploadResult) updateTransData(uploadResult)

        result = uploadResult
        errorData = uploadErr
      }
    }

    return {result, errorData}
  }

  return {
    getTransaction,
    createTransaction,
    updateTransaction,
    getTransactionDetails,
    uploadInvoice,
    syncBeneficiary,
    initiateTransaction,
    syncRecipientAsBeneficiary,
    sendingPurpose,
  }
}
