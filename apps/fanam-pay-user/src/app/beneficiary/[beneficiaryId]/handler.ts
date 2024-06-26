import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery} from "@fanam-pkg/core-utils"
import {useParams, useRouter} from "next/navigation"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY, ROUTE_BENEFICIARIES} from "utils"

export const useHandler = () => {
  const {beneficiaryId} = useParams()
  const {push} = useRouter()
  const {toggleNotify} = useNotifyPopup()
  const {refreshQuery} = useReactQuery()
  const {getByBeneficiaryId, updateBeneficiary} = useBeneficiaryController()

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Beneficiary Details has been updated.",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {mutate: onUpdate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const {data: beneficiary} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: () => getByBeneficiaryId(beneficiaryId as string),
  })

  const onBack = () => push(ROUTE_BENEFICIARIES)

  return {
    onUpdate,
    beneficiary,
    onBack,
    beneficiaryId,
  }
}
