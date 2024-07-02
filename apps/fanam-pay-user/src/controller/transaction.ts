import {API_TRANSACTION, apiTransaction, IPayloadTransaction, ITransaction} from "@custom/utils"
import {useApi} from "./api"

export const useTransactionController = () => {
  const {getRequest, postRequest, putRequest} = useApi()

  const getTransaction = async () => {
    const {result} = await getRequest(API_TRANSACTION)
    return result
  }

  const createTransaction = async (payload: IPayloadTransaction) => {
    const {result, errorData} = await postRequest<ITransaction>(API_TRANSACTION, payload)
    return {result, errorData}
  }

  const updateTransaction = async (payload: any) => {
    const transactionId = payload.transaction_id
    const {result, errorData} = await putRequest(API_TRANSACTION, transactionId)
    return {result, errorData}
  }

  const getByIdTransaction = async (transaction_id: string) => {
    const {result} = await getRequest(apiTransaction(transaction_id))
    return result
  }

  return {
    getTransaction,
    createTransaction,
    updateTransaction,
    getByIdTransaction,
  }
}
