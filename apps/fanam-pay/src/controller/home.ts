import "@custom/utils"
import {useApi} from "./api"

export const useHomeController = () => {
  const {getRequest} = useApi()

  const popularCorridors = async () => {
    const {result} = await getRequest()
    return result
  }

  return {
    popularCorridors,
  }
}
