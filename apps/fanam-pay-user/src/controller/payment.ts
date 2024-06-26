import {API_FXRATE, ICurrency} from "@custom/utils"
import {useApi} from "./api"

export const usePaymentController = () => {
  const {postRequest} = useApi()

  const getFxRate = async (payload: ICurrency) => {
    const {result, errorData} = await postRequest<ICurrency>(API_FXRATE, payload)
    return {result, errorData}
  }

  return {
    getFxRate,
  }
}
