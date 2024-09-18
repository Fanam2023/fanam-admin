import {API_CREATE_ORDER, IFanamApiError, IPayloadOrder, ITransaction} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

export const useOrderController = () => {
  const {postRequest} = useApi()
  const {transId} = useSingleton()

  const createOrder = async () =>
    await postRequest<ITransaction, IPayloadOrder, IFanamApiError<null>>(API_CREATE_ORDER, {transaction_id: transId})

  return {
    createOrder,
  }
}
