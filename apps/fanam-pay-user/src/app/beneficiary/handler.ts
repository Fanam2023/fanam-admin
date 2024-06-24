import {useReactQuery} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {IBeneficiary} from "@custom/utils"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY, ROUTE_ADD_BENEFICIARY} from "utils"

export const useHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const {push} = useRouter()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentBeneficiary, setCurrentBeneficiary] = useState(null)
  const {getAllBeneficiary, createBeneficiary, updateBeneficiary} = useBeneficiaryController()
  const {refreshQuery} = useReactQuery()

  const {data: beneficiaries} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: getAllBeneficiary,
  })

  const {mutate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully created")
      else onFailure(errorData.message)
    },
  })

  const {mutate: updateApi} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const onNav = () => push(ROUTE_ADD_BENEFICIARY)

  const filteredBeneficiaries = beneficiaries?.filter(
    beneficiary =>
      beneficiary.beneficiary_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onChangeSearch = (value: string) => {
    setSearchTerm(value)
  }

  const onEditBeneficiary = (beneficiary: IBeneficiary) => {
    setCurrentBeneficiary(beneficiary)
    setIsSliderVisible(true)
  }

  return {
    onNav,
    isSliderVisible,
    setIsSliderVisible,
    mutate,
    beneficiaries: filteredBeneficiaries,
    onChangeSearch,
    currentBeneficiary,
    onEditBeneficiary,
    updateApi,
  }
}
