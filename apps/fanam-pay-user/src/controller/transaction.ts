import {IFile} from "@fanam-pkg/core-utils"
import {
  API_INVOICE,
  API_TRANSACTION,
  apiTransaction,
  IPayloadMergeRecipient,
  IPayloadTransaction,
  ITransaction,
} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

export const useTransactionController = () => {
  const {getRequest, postRequest, putRequest} = useApi()
  const {transId, updateTransData} = useSingleton()

  const getTransaction = async () => {
    const {result} = await getRequest(API_TRANSACTION)
    return result
  }

  const createTransaction = async (payload: IPayloadTransaction) => {
    const {result, errorData} = await postRequest<ITransaction>(API_TRANSACTION, payload)
    if (result) updateTransData(result)
    return {result, errorData}
  }

  const updateTransaction = async (payload: IPayloadTransaction) => {
    const {result, errorData} = await putRequest<ITransaction>(apiTransaction(transId), payload)
    if (result) updateTransData(result)
    return {result, errorData}
  }

  const getByIdTransaction = async (transaction_id: string) => {
    const {result} = await getRequest<ITransaction>(apiTransaction(transaction_id))
    return result
  }

  const uploadInvoice = async (invoices: IFile[]) => {
    const formData = new FormData()

    invoices.forEach(({file}) => formData.append("invoice", file))

    formData.append("transaction_id", transId)

    const {result, errorData} = await putRequest(API_INVOICE, formData)

    return {result, errorData}
  }

  const syncBeneficiary = async (beneficiaryId: string) => {
    const {result, errorData} = await putRequest<ITransaction>(apiTransaction(transId), {beneficiary_id: beneficiaryId})
    if (result) updateTransData(result)
    return {result, errorData}
  }

  const syncRecipient = async (recipientId: string) => {
    const {result, errorData} = await putRequest<ITransaction>(apiTransaction(transId), {recipient_id: recipientId})
    if (result) updateTransData(result)
    return {result, errorData}
  }

  const syncRecipientAsBeneficiary = async (payload: IPayloadMergeRecipient) => {
    const {result, errorData} = await putRequest<ITransaction>(apiTransaction(transId), payload)
    if (result) updateTransData(result)
    return {result, errorData}
  }

  return {
    getTransaction,
    createTransaction,
    updateTransaction,
    getByIdTransaction,
    uploadInvoice,
    syncBeneficiary,
    syncRecipient,
    syncRecipientAsBeneficiary,
  }
}
