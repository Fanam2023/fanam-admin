import {API_FXRATE, ICurrency} from "@custom/utils"
import {useApi} from "./api"

export const useFxController = () => {
  const {postRequest} = useApi()

  const createCurrency = async (payload: ICurrency) => {
    const {result, errorData} = await postRequest<ICurrency>(API_FXRATE, payload)
    return {result, errorData}
  }

  return {
    createCurrency,
  }
}
