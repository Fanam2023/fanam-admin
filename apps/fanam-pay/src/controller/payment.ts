import {API_FXRATE, IPayloadFxRate, IResponseFxRate} from "@custom/utils"
import {useApi} from "./api"

export const usePaymentController = () => {
  const {postRequest} = useApi()

  const getFxRate = async (payload: IPayloadFxRate) => {
    const {result, errorData} = await postRequest<IResponseFxRate>(API_FXRATE, payload)
    return result
  }

  return {
    getFxRate,
  }
}
