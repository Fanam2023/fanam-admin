import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery} from "@fanam-pkg/core-utils"
import {useMutation} from "@tanstack/react-query"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY} from "utils"

export const useHandler = () => {
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const {createBeneficiary} = useBeneficiaryController()

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Beneficiary added Successfully.",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {mutate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  return {
    mutate,
  }
}
