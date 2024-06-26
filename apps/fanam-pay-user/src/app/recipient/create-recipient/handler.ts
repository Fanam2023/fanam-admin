import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery} from "@fanam-pkg/core-utils"
import {useMutation} from "@tanstack/react-query"
import {useRecipientController} from "controller"
import {QUERY_RECIPIENT} from "utils"

export const useHandler = () => {
  const {toggleNotify} = useNotifyPopup()
  const {refreshQuery} = useReactQuery()
  const {createRecipient} = useRecipientController()

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Recipient added successfully",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {mutate} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: createRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Recipient Successfully updated")
      else onFailure(errorData.message)
    },
  })

  return {
    mutate,
  }
}
