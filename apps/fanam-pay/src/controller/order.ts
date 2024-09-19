import {API_CREATE_ORDER, apiCancelTransaction, IFanamApiError, IPayloadOrder, ITransaction} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

export const useOrderController = () => {
  const {postRequest, getRequest} = useApi()
  const {transId} = useSingleton()

  const createOrder = async () =>
    await postRequest<ITransaction, IPayloadOrder, IFanamApiError<null>>(API_CREATE_ORDER, {transaction_id: transId})

  const cancelTransaction = async () => await getRequest<ITransaction>(apiCancelTransaction(transId))

  return {
    createOrder,
    cancelTransaction,
  }
}
