import {useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY} from "utils"

export const useHandler = (
  onSuccess: (message: string) => void,
  onFailure: (message: string) => void,
  beneficiaryId: string
) => {
  const {push} = useRouter()
  const {getByBeneficiaryId, updateBeneficiary} = useBeneficiaryController()
  const {refreshQuery} = useReactQuery()

  const {mutate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const {data: beneficiaryDetails} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: () => getByBeneficiaryId(beneficiaryId),
  })

  return {
    mutate,
    beneficiaryDetails,
  }
}
