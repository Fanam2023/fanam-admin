import {API_PAN_VERIFY, IPanResponse, IPayLoadPan} from "@custom/utils"
import {useApi} from "./api"

export const useVerificationController = () => {
  const {postRequest} = useApi()

  const verifyPanCard = async (payload: IPayLoadPan) => {
    const {result, errorData} = await postRequest<IPanResponse>(API_PAN_VERIFY, payload)
    return {result, errorData}
  }

  return {
    verifyPanCard,
  }
}
