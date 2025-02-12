import {API_GET_ALL_BANKS} from "@custom/utils"
import {IBank} from "model"
import {useApi} from "./api"

export const useBankController = () => {
  const {getRequest} = useApi()

  const getAllBanks = async () => {
    const {result = []} = await getRequest<IBank[]>(API_GET_ALL_BANKS)
    return result
  }

  return {
    getAllBanks,
  }
}
