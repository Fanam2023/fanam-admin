import {API_FXRATE, apiPayout, IPayloadFxRate, IResponseFxRate} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

export const usePaymentController = () => {
  const {postRequest, putRequest} = useApi()
  const {transId, transData} = useSingleton()

  const getFxRate = async (payload: IPayloadFxRate) => {
    const {result, errorData} = await postRequest<IResponseFxRate>(API_FXRATE, payload)
    return result
  }

  const sendPayout = async () => {
    const {fx_rate_network = "Master_card"} = transData?.transfer_time || {}
    return await putRequest(apiPayout(transId, fx_rate_network), {})
  }

  return {
    getFxRate,
    sendPayout,
  }
}
