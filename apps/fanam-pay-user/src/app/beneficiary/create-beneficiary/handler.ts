import {useReactQuery} from "@fanam-pkg/core-utils"
import {useMutation} from "@tanstack/react-query"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY} from "utils"

export const useHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const {createBeneficiary} = useBeneficiaryController()
  const {refreshQuery} = useReactQuery()

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
