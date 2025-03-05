import {useQuery} from "@tanstack/react-query"
import {useInititeSessionController} from "controller"
import {QUERY_GET_CLIENT} from "utils"

const useHandler = (sessionId: string) => {
  const {getClientData} = useInititeSessionController()

  const {data} = useQuery({
    queryKey: [QUERY_GET_CLIENT],
    queryFn: () => getClientData(sessionId as string),
    enabled: !!sessionId,
  })
  return {data}
}

export default useHandler
