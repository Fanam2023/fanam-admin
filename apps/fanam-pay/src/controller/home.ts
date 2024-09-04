import "@custom/utils"
import {API_POPULAR_CORRIDORS, ICorridors} from "@custom/utils"
import {useApi} from "./api"

export const useHomeController = () => {
  const {getRequest} = useApi()

  const popularCorridors = async () => {
    const {result = []} = await getRequest<ICorridors[]>(API_POPULAR_CORRIDORS)
    return result
  }

  return {
    popularCorridors,
  }
}
