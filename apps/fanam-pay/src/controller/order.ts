import {API_CREATE_ORDER, IOrderPayload, IOrderResponse} from "@custom/utils"
import {useApi} from "./api"

export const useOrderController = () => {
  const {postRequest} = useApi()

  const createOrder = async (payload: IOrderPayload) => {
    const {result, errorData} = await postRequest<IOrderResponse>(API_CREATE_ORDER, payload)
    return {result, errorData}
  }

  return {
    createOrder,
  }
}
