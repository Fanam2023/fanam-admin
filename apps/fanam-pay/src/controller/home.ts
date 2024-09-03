import "@custom/utils"
import {API_POPULAR_CORRIDORS} from "@custom/utils"
import {useApi} from "./api"

export const useHomeController = () => {
  const {getRequest} = useApi()

  const popularCorridors = async () => {
    const {result} = await getRequest(API_POPULAR_CORRIDORS)
    return result
  }

  return {
    popularCorridors,
  }
}
