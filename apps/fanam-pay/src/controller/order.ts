import {API_CREATE_ORDER, IFanamApiError, IPayloadOrder, IResponseOrder} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

export const useOrderController = () => {
  const {postRequest} = useApi()
  const {transId} = useSingleton()

  const createOrder = async () =>
    await postRequest<IResponseOrder, IPayloadOrder, IFanamApiError<null>>(API_CREATE_ORDER, {transaction_id: transId})

  return {
    createOrder,
  }
}
