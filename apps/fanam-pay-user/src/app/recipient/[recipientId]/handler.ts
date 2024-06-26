import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery} from "@fanam-pkg/core-utils"
import {useParams, useRouter} from "next/navigation"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useRecipientController} from "controller"
import {QUERY_RECIPIENT} from "utils"

export const useHandler = () => {
  const {recipientId} = useParams()
  const {push} = useRouter()
  const {toggleNotify} = useNotifyPopup()
  const {getByRecipientId, updateRecipient} = useRecipientController()
  const {refreshQuery} = useReactQuery()

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Recipient updated Successfully",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {mutate: onUpdate} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: updateRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Recipient Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const {data: recipient} = useQuery({
    queryKey: [QUERY_RECIPIENT],
    queryFn: () => getByRecipientId(recipientId as string),
    enabled: !!recipientId,
  })

  return {
    onUpdate,
    recipient,
    recipientId,
  }
}
