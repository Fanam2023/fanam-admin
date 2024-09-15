import {useParams, useRouter} from "next/navigation"
import {useQuery} from "@tanstack/react-query"
import {useTransactionController} from "controller"
import {QUERY_TRANSACTION, ROUTE_HOME} from "utils"

export const useHandler = () => {
  const {transactionId} = useParams()
  const {replace} = useRouter()

  const {getTransactionDetails} = useTransactionController()

  const {data: transactionDetail} = useQuery({
    queryKey: [QUERY_TRANSACTION.concat(transactionId as string)],
    queryFn: () => getTransactionDetails(transactionId as string),
    enabled: !!transactionId,
  })

  const routeHome = () => replace(ROUTE_HOME)

  return {
    transactionDetail,
    routeHome,
  }
}
