import {API_FXRATE, apiPayout, IPayloadFxRate, IResponseFxRate} from "@custom/utils"
import {useApi} from "./api"

export const usePaymentController = () => {
  const {postRequest, putRequest} = useApi()

  const getFxRate = async (payload: IPayloadFxRate) => {
    const {result} = await postRequest<IResponseFxRate>(API_FXRATE, payload)
    return result
  }

  const sendPayout = async (transactionId: string) => await putRequest(apiPayout(transactionId), {})

  return {
    getFxRate,
    sendPayout,
  }
}
