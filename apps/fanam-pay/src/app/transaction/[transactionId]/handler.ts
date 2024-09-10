import {useParams} from "next/navigation"
import {useQuery} from "@tanstack/react-query"
import {useTransactionController} from "controller"
import {QUERY_TRANSACTION} from "utils"

export const useHandler = () => {
  const {transactionId} = useParams()

  const {getTransactionDetails} = useTransactionController()

  const {data: transactionDetail} = useQuery({
    queryKey: [QUERY_TRANSACTION.concat(transactionId as string)],
    queryFn: () => getTransactionDetails(transactionId as string),
    enabled: !!transactionId,
  })

  return {
    transactionDetail,
  }
}
